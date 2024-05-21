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

async function connectToDatabase() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');

    db = client.db(dbName);
    console.log('Found my-db');

    collection = db.collection(colName);
    console.log('Found messages');
  } catch (error) {
    process.exit(1);
  }
}

connectToDatabase().then(() => {
  app.listen(3000, () => {    console.log('listening on 3000')  });
})

app.get('/getDocuments', async (req, res) => {
  try {

    const numDaysAgo = parseInt(req.query.numDaysAgo) || 0; // Get numDaysAgo from query parameter, default to 1 if not provided

    let query = {};

    if (!isNaN(numDaysAgo) && numDaysAgo > 0) {
      
      const myDate = new Date(new Date() - numDaysAgo * 24 * 60 * 60 * 1000); // Date object for days ago

      query = {datetime: { $gte: myDate } }// Filter documents by date

    }

    console.log(query)
    
    const documents = await collection.find(query).toArray();
    
    res.json(documents);


  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).send('Internal Server Error');

  }
});


app.get('/cmua', (req, res) => {  res.sendFile(__dirname + '/app/assets/cmua.png')});

app.get('/favicon.ico', (req, res) => {  res.sendFile(__dirname + '/app/assets/favicon.ico')});

app.get('/script', (req, res) => {  res.sendFile(__dirname + '/app/script.js')});

app.get('/style', (req, res) => {  res.sendFile(__dirname + '/app/style.css')});

app.get('/', (req, res) => {  res.sendFile(__dirname + '/app/map-site.html')});

app.get('/about', (req, res) => {  res.sendFile(__dirname + '/app/about.html')});

