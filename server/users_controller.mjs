// Controllers for the User Collection

import 'dotenv/config';
import express from 'express';
import * as users from './users_model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/login', (req,res) => { 
    users.createUser(
        req.body.username, 
        req.body.email, 
        req.body.password
        )
        .then(user => {
            console.log(`"${user.username}" was successfully added to the database.`);
            res.status(201).json(ferment);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Woops! Unable to add to the database.' });
        });
});

/*
// RETRIEVE controller ****************************************************
app.get('/ferments', (req, res) => {
    ferments.retrieveFerments()
        .then(ferments => { 
            if (ferments !== null) {
                console.log(`Thank you for your request. Here is our entire collection of ferments.`);
                res.json(ferments);
            } else {
                res.status(404).json({ Error: 'So sorry, the requested database doesn\'t exist!' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'There was an issue with retrieving Sara\'s Fermentation Database.' });
        });
});


// RETRIEVE by ID controller
app.get('/ferments/:_id', (req, res) => {
    ferments.retrieveFermentByID(req.params._id)
    .then(ferment => { 
        if (ferment !== null) {
            console.log(`You requested "${ferment.name}" by ID - here is the requested ferment:`);
            res.json(ferment);
        } else {
            res.status(404).json({ Error: 'The ID that you provided does not match any of our current ferments. Please try again.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'There was a problem with retrieving the requested ferment.' });
    });

});


// UPDATE controller ************************************
app.put('/ferments/:_id', (req, res) => {
    ferments.updateFerment(
        req.params._id, 
        req.body.name, 
        req.body.fermentLength, 
        req.body.startDate
    )
    .then(ferment => {
        console.log(`Thank you for your request! You successfully updated "${ferment.name}".`);
        res.json(ferment);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Woops! There was an issue while you attempted to make that change.' });
    });
});


// DELETE Controller ******************************
app.delete('/ferments/:_id', (req, res) => {
    ferments.deleteFermentById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, the ${deletedCount} ferment was deleted.`);
                res.status(200).send({ Success: 'The ferment was removed from Sara\'s Fermentation Database.' });
            } else {
                res.status(404).json({ Error: 'Woops! The ID that you provided does not match any of our current ferments. Please try again.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Woops! There was an error while you attempted to delete that ferment.' });
        });
});
*/

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});