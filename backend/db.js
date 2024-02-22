const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://10.0.1.4:27017'; 

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongo() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongo();
