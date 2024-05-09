const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

// local test connections
//const uri = 'mongodb://localhost:27017'; // for local testing
//const dbName = 'test'; // for local testing

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

    const numDaysAgo = 3; // adjust this date to change time window

    const myDate = new Date(new Date() - numDaysAgo * 24 * 60 * 60 * 1000); // Date object for days ago
    const documents = await collection.find({
      datetime: { $gte: myDate } // Filter documents dated within the past week
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

app.get('/favicon.ico', (req, res) => {  res.sendFile(__dirname + '/app/favicon.ico')});

app.get('/script', (req, res) => {  res.sendFile(__dirname + '/app/script.js')});

app.get('/style', (req, res) => {  res.sendFile(__dirname + '/app/style.css')});

app.get('/', (req, res) => {  res.sendFile(__dirname + '/app/map-site.html')});

