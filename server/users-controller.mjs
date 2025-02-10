// Controllers for the Users

import 'dotenv/config';
import express from 'express';
import * as users from './users-model.mjs';
import * as entries from './entries-model.mjs'

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
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

// RETRIEVE controller ****************************************************
app.get('/users', (req, res) => {
    users.retrieveUsers()
        .then(users => { 
            if (users !== null) {
                console.log(`Thank you for your request. Here is our entire collection of users.`);
                res.json(users);
            } else {
                res.status(404).json({ Error: 'So sorry, the requested database doesn\'t exist!' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'There was an issue with retrieving User Database.' });
        });
});


// RETRIEVE by ID controller
app.get('/users/:_id', (req, res) => {
    users.retrieveUserByID(req.params._id)
    .then(user => { 
        if (user !== null) {
            console.log(`You requested "${user.username}" by ID - here is the requested user:`);
            res.json(user);
        } else {
            res.status(404).json({ Error: 'The ID that you provided does not match any of our current users. Please try again.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'There was a problem with retrieving the requested user.' });
    });

});


// UPDATE controller ************************************
app.put('/users/:_id', (req, res) => {
    users.updateUser(
        req.params._id, 
        req.body.username, 
        req.body.email, 
        req.body.password
    )
    .then(user => {
        console.log(`Thank you for your request! You successfully updated "${user.username}".`);
        res.json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Woops! There was an issue while you attempted to make that change.' });
    });
});


// DELETE Controller ******************************
app.delete('/users/:_id', (req, res) => {
    users.deleteUserById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, the ${deletedCount} user was deleted.`);
                res.status(200).send({ Success: 'The user was removed from User Database.' });
            } else {
                res.status(404).json({ Error: 'Woops! The ID that you provided does not match any of our current users. Please try again.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Woops! There was an error while you attempted to delete that user.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});