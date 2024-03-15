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

app.listen(3000, () => {    console.log('listening on 3000')  });

app.get('/', (req, res) => {  res.send('hello world')});
