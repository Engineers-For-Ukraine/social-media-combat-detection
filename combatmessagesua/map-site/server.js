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

let db, collection;

// Connect the client to the server and store the connection
async function connectToDatabase() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected successfully to MongoDB');

    db = client.db(dbName);
    collection = db.collection(colName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  }
}

// Call the function to connect to the database
connectToDatabase();

app.get('/getDocuments', async (req, res) => {
  try {

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(colName);

    const numDaysAgo = parseInt(req.query.numDaysAgo) || 0; // Get numDaysAgo from query parameter, default to 1 if not provided

    let query = {};

    if (!isNaN(numDaysAgo) && numDaysAgo > 0) {
      
      const myDate = new Date(new Date() - numDaysAgo * 24 * 60 * 60 * 1000); // Date object for days ago

      query = {datetime: { $gte: myDate } }// Filter documents by date

    }
    
    const documents = await collection.find(query).toArray();
    
    res.json(documents);

  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).send('Internal Server Error');

  }
});

app.listen(3000, () => {    console.log('listening on 3000')  });

app.get('/cmua', (req, res) => {  res.sendFile(__dirname + '/app/assets/cmua.png')});

app.get('/favicon.ico', (req, res) => {  res.sendFile(__dirname + '/app/assets/favicon.ico')});

app.get('/script', (req, res) => {  res.sendFile(__dirname + '/app/script.js')});

app.get('/style', (req, res) => {  res.sendFile(__dirname + '/app/style.css')});

app.get('/', (req, res) => {  res.sendFile(__dirname + '/app/map-site.html')});

app.get('/about', (req, res) => {  res.sendFile(__dirname + '/app/about.html')});

