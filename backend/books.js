const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb'); // Import ObjectId from MongoDB driver
const connectToMongo = require('./db'); // Import the database connection setup function

// Connect to MongoDB
let db;
console.log('Connecting to MongoDB...');

connectToMongo()
    .then(client => {
        db = client.db('your-database-name'); // Replace 'your-database-name' with your actual database name
    })
    .catch(error => {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit the application if MongoDB connection fails
    });

// Get all the books
router.get('/', async (req, res) => {
    try {
        const booksCollection = db.collection('books'); // Replace 'books' with your actual collection name
        const books = await booksCollection.find({}).toArray();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

// Get a specific book
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const booksCollection = db.collection('books'); // Replace 'books' with your actual collection name
        const book = await booksCollection.findOne({ _id: ObjectId(id) });
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Failed to fetch book' });
    }
});

// Add a new book
router.post('/', async (req, res) => {
    const body = req.body;
    try {
        const booksCollection = db.collection('books'); // Replace 'books' with your actual collection name
        await booksCollection.insertOne(body);
        res.json({ message: 'The book has been added' });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Failed to add book' });
    }
});

// Update a book
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const booksCollection = db.collection('books'); // Replace 'books' with your actual collection name
        await booksCollection.updateOne({ _id: ObjectId(id) }, { $set: body });
        res.json({ message: `The book with ID ${id} has been updated` });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Failed to update book' });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const booksCollection = db.collection('books'); // Replace 'books' with your actual collection name
        await booksCollection.deleteOne({ _id: ObjectId(id) });
        res.json({ message: `Book with id #${id} has been deleted` });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Failed to delete book' });
    }
});

module.exports = router;
