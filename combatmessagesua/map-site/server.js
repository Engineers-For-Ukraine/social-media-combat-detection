const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

// Connection info
const uri = 'mongodb://mongo:27017';
const dbName = 'my-db';
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
    const weekAgoDate = new Date(new Date() - 3 * 24 * 60 * 60 * 1000); // Date object for 3 days ago
    const documents = await collection.find({
      datetime: { $gte: weekAgoDate } // Filter documents dated within the past week
    }).toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {    console.log('listening on 3000')  });

app.get('/cmua', (req, res) => {  res.sendFile(__dirname + '/app/cmua.png')});

app.get('/', (req, res) => {  res.sendFile(__dirname + '/app/map-site.html')});