// Models for Users

// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: 'The User Database failed to connect to the application.' });
    } else  {
        console.log('Successfully connected.');
    }
});


// SCHEMA: Define the collection's schema.
const userSchema = mongoose.Schema({
	username:              { type: String, required: true, index: { unique: true } },
	email:                 { type: String, required: true, index: { unique: true } },
	password:              { type: String, required: true }
});

// Compile the model from the schema 
// by defining the collection name "ferments".
const users = mongoose.model('Users', userSchema);


// CREATE model *****************************************
const createUser = async (username, email, password) => {
    const user = new users({ 
        username: username, 
        email: email, 
        password: password 
    });
    return user.save();
}

/*
// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.

I am not including this because I don't know if I need it

const retrieveFerments = async () => {
    const query = ferments.find();
    return query.exec();
}*/

// RETRIEVE by ID
const retrieveUserByID = async (_id) => {
    const query = users.findById({_id: _id});
    return query.exec();
}

/*
// DELETE model based on _id  *****************************************

I am not including this because I don't know if I need it

const deleteFermentById = async (_id) => {
    const result = await ferments.deleteOne({_id: _id});
    return result.deletedCount;
};

// UPDATE model *****************************************************
const updateFerment = async (_id, name, fermentLength, startDate) => {
    const result = await ferments.replaceOne({_id: _id }, {
        name: name,
        fermentLength: fermentLength,
        startDate: startDate
    });
    return { 
        _id: _id, 
        name: name,
        fermentLength: fermentLength,
        startDate: startDate 
    }
} */

// EXPORT the variables for use in the controller file.
export { createUser, retrieveUserByID } 