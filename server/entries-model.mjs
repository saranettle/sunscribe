// Models for the Entries

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
        console.log('Successfully connected to the Entry database.');
    }
});


// SCHEMA: Define the collection's schema.
const entrySchema = mongoose.Schema({
	text:               { type: String, required: true },
	author:             { type: String, required: true },
    create_time:        { type: Date, required: true, default: Date.now },
    write_time:         { type: String }
});

// Compile the model from the schema 

export const entries = mongoose.model("Entries", entrySchema);

// Create an entry model
const createEntry = async (text, author, write_time) => {
    const entry = new entries({ 
        text: text, 
        author: author,
        write_time: write_time
    });
    return entry.save();
}

// Retrieve an entry by author
const retrieveEntryByAuthor = async (author) => {
    try {
        const entry = await entries.find({ author }); 
        return entry;
    } catch (error) {
        console.error("Error retrieving entries by author:", error);
        throw error;
    }
};

// DELETE entries model based on _id  *****************************************
const deleteEntryById = async (_id) => {
    const result = await entries.deleteOne({_id: _id});
    return result.deletedCount;
};

// EXPORT the variables for use in the controller file.
export { createEntry, retrieveEntryByAuthor, deleteEntryById }