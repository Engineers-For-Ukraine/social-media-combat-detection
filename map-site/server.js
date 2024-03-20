const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

// Connection info
const uri = 'mongodb://localhost:27017';
const dbName = 'test';
const colName = 'messages';

const client = new MongoClient(uri);

// Connect the client to the server
client.connect();
console.log('Connected successfully to MongoDB');

// Connect to the specific database and collection
const db = client.db(dbName);
const collection = db.collection(colName);

app.get('/getDocuments', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(colName);
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {    console.log('listening on 3000')  });

app.get('/icon', (req, res) => {  res.sendFile(__dirname + '/icon.jpg')});

app.get('/', (req, res) => {  res.sendFile(__dirname + '/map-site.html')});