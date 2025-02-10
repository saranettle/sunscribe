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
        res.status(500).json({ Error: 'The entry database failed to connect to the application.' });
    } else  {
        console.log('Successfully connected to the entry database.');
    }
});



// SCHEMA: Define the collection's schema.
const entrySchema = mongoose.Schema({
	text:              { type: String, required: true },
	author:           { type: String, required: true },
});

// Compile the model from the schema 

const entries = mongoose.model('Entries', entrySchema);


const createEntry = async (text, author) => {
    const entry = new entries({ 
        text: text, 
        author: author
    });
    return entry.save();
}




// EXPORT the variables for use in the controller file.
export { createEntry }