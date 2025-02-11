// Controllers for the Users and Entries
import 'dotenv/config';
import express from 'express';
import * as users from './users-model.mjs';
import * as entries from './entries-model.mjs'

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


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


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});