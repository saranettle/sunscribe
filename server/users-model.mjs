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
        console.log('Successfully connected to the User database.');
    }
});


// SCHEMA: Define the collection's schema.
const userSchema = mongoose.Schema({
	username:              { type: String, required: true, unique: true },
	email:                 { type: String, required: true, unique: true },
	password:              { type: String, required: true }
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
export { createUser, updateUser }