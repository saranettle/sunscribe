// Models for the Users

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
        res.status(500).json({ Error: 'The user database failed to connect to the application.' });
    } else  {
        console.log('Successfully connected to the user database.');
    }
});

// SCHEMA: Define the collection's schema.
const userSchema = mongoose.Schema({
	username:              { type: String, required: true },
	email:     { type: String, required: true },
	password:         { type: String, required: true }
});



// Compile the model from the schema 
// by defining the collection username "users".
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



// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrieveUsers = async () => {
    const query = users.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveUserByID = async (_id) => {
    const query = users.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteUserById = async (_id) => {
    const result = await users.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateUser = async (_id, username, email, password) => {
    const result = await users.replaceOne({_id: _id }, {
        username: username,
        email: email,
        password: password
    });
    return { 
        _id: _id, 
        username: username,
        email: email,
        password: password 
    }
}

// EXPORT the variables for use in the controller file.
export { createUser, retrieveUsers, retrieveUserByID, updateUser, deleteUserById }