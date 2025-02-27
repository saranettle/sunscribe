// Controllers for the Users and Entries
import 'dotenv/config';
import express from 'express';
import * as zmq from "zeromq";
import * as users from './users-model.mjs';
import * as entries from './entries-model.mjs'

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.

const socket = new zmq.Request();
socket.connect("tcp://localhost:5555");
console.log("Connected to Timer-Service at tcp://localhost:5555")

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
    entries.createEntry(
        req.body.text, 
        req.body.author, 
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
    entries.retrieveEntryByAuthor(req.params.author)
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
    entries.deleteEntryById(req.params._id)
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




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});