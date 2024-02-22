const express = require('express');
const connectToMongo = require('./db'); // Import the database connection setup function
const port = 3001;
const books = require('./books');

const app = express();

app.use(express.json());

// Connect to MongoDB when the application starts
connectToMongo()
    .then(() => {
        console.log('Connected to MongoDB');
        app.use('/api/v1/books', books);

        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit the application if MongoDB connection fails
    });
