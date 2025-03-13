// Controllers for the Users and Entries
import 'dotenv/config';
import express from 'express';
import * as zmq from "zeromq";
import * as users from './users-model.mjs';
import { entries, createEntry, retrieveEntryByAuthor, deleteEntryById } from './entries-model.mjs';


const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.

// timer microservice socket
const timer_socket = new zmq.Request();
timer_socket.connect("tcp://127.0.0.1:5555");
console.log("Connected to Timer-Service at tcp://localhost:5555")

// email microservice socket
const email_socket = new zmq.Request();
email_socket.connect("tcp://127.0.0.1:5556");
console.log("Connected to Email-Service at tcp://localhost:5556")

// random prompt microservice socket
const prompt_socket = new zmq.Request();
prompt_socket.connect("tcp://127.0.0.1:5557");
console.log("Connected to Writing-Prompt-Service at tcp://localhost:5557")

// word count microservice socket
const wordcount_socket = new zmq.Request();
wordcount_socket.connect("tcp://127.0.0.1:5558");
console.log("Connected to Word-Count-Service at tcp://localhost:5558");

// ***********************************************************************************
// ***********************************************************************************
//********************************* User Controllers *********************************

// CREATE controller for Users ******************************************
app.post ('/users', (req,res) => { 
    users.createUser(
        req.body.username, 
        req.body.email, 
        req.body.password
        )
        .then(user => {
            console.log(`Success! User created.`);
            res.status(201).json(user);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Woops! Unable to add user to the database.' });
        });
});

// GET controller for Users ************************************
app.get('/users/:username', async (req, res) => {
    try {
        console.log(`Fetching user: ${req.params.username}`); // Debugging log
        const user = await users.getUserByUsername(req.params.username); // Use the function

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Woops! Something went wrong.' });
    }
});

// ************************************************************************************
// ************************************************************************************
//********************************* Entry Controllers *********************************

// CREATE controller for Entries ******************************************
app.post ('/entries', (req,res) => { 
    createEntry(
        req.body.text, 
        req.body.author, 
        req.body.write_time
        )
        .then(entry => {
            console.log(`Success! Entry added.`);
            res.status(201).json(entry);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Woops! Unable to add entry to the database.' });
        });
});

// RETRIEVE entries by author ******************************************
app.get('/entries/:author', (req, res) => {
    retrieveEntryByAuthor(req.params.author)
    .then(entry => { 
        if (entry !== null) {
            res.json(entry);
        } else {
            res.status(404).json({ Error: 'The user has created no journal entries.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Woops! Unable to retrieve entries.' });
    });

});

// DELETE entries Controller ******************************
app.delete('/entries/:_id', (req, res) => {
    deleteEntryById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, the ${deletedCount} entry was deleted.`);
                res.status(200).send({ Success: 'The entry was removed from Entry Database.' });
            } else {
                res.status(404).json({ Error: 'Woops! The ID that you provided does not match any entries. Please try again.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Woops! There was an error while you attempted to delete that entry.' });
        });
});


// ************************************************************************************
// ************************************************************************************
//******************************** Timer Microservice *********************************

app.post("/send-start", async (req, res) => {
    try {
        const { message } = req.body;
        console.log('Received from Sunscribe App to start timer:', message); // confirming message is received

        // Send message to the Timer-Service socket
        await timer_socket.send(message);
        console.log("Sending:", message);

        const [response] = await timer_socket.receive();
        console.log("Timer-Service Response:", response.toString()); 
      
    } catch (error) {
        console.error("Error sending message to Timer-Service:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
});

app.post("/get-writing-time", async (req, res) => {
    try {
        const { message } = req.body;
        console.log('Sending message to Timer-Service:', message);

        await timer_socket.send('stop');

        // Receive response - time in sec (in a string)
        const [response] = await timer_socket.receive();
        console.log("Received from Timer-Service:", response.toString());

        res.json({ success: true, response: response.toString() });
    } catch (error) {
        console.error("Error receiving response from Timer-Service:", error);
        res.status(500).json({ error: "Timer-Service failure" });
    }
});

// ************************************************************************************
// ************************************************************************************
//******************************** Email Microservice *********************************

app.post("/test-email", async (req, res) => {
    try {
        const { email } = req.body;
        console.log('Received email from Sunscribe App:', req.body); // confirming message is received
        console.log('Sending test email to user now.')

        // Send message to the Email-Service socket
        await email_socket.send(email);

        const [response] = await email_socket.receive();
        console.log("Email-Service Response:", response.toString()); 
      
    } catch (error) {
        console.error("Error sending message to Email-Service:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
});

// ************************************************************************************
// ************************************************************************************
//**************************** Writing Prompt Microservice *****************************

app.get("/get-prompt", async (req, res) => {
    try {
        
        console.log('Received message to generate a random writing prompt.');

        await prompt_socket.send('start');

        // Receive response - writing prompt
        const [response] = await prompt_socket.receive();
        console.log("Received from Writing-Prompt-Service:", response.toString());

        res.json({ success: true, response: response.toString() });
    } catch (error) {
        console.error("Error receiving response from Writing-Prompt-Service:", error);
        res.status(500).json({ error: "Writing-Prompt-Service failure" });
    }
});

// *************************************************************************************
// *************************************************************************************
// ***************************** Word Count Microservice *******************************

app.get("/get-word-count/:author", async (req, res) => {
    try {
        const { author } = req.params;
        const userEntries = await entries.find({ author });

        if (!userEntries.length) {
            return res.json({ success: true, wordCount: 0 });
        }

        const allText = userEntries.map(entry => entry.text).join(" "); // Concatenate all entries

        await wordcount_socket.send(allText);
        const [response] = await wordcount_socket.receive();
        
        res.json({ success: true, wordCount: response.toString() });
    } catch (error) {
        console.error("Error retrieving word count:", error);
        res.status(500).json({ error: "Failed to get word count" });
    }
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});