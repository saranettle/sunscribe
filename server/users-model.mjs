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
db.once("open", () => {
    console.log('Successfully connected to the User database.');
});

db.on("error", (err) => {
    console.error('Database connection error:', err);
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

// Retrieve model *****************************************
const getUserByUsername = async (username) => {
    return await users.findOne({ username: username });
};


// EXPORT the variables for use in the controller file.
export { createUser, getUserByUsername }