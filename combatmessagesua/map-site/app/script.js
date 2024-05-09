// initialize the map
        
var map = L.map('map').setView([48, 35], 6); // change lat, long, zoom in setView

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// get messages from database

async function getDocuments() {

    // get the docs from the database and make them readable

    const response = await fetch('/getDocuments');
    const documents = await response.json();

    documents.forEach(doc => {

      // map each message

      var marker = L.marker(doc.location).addTo(map);

      var contents = doc.datetime.replace('T', ' ').replace('Z', ' ').concat('\n\n', doc.message) //this makes the datetime object legible

      marker.bindPopup(contents, {

        maxHeight:150, // this makes each marker open as a scrollable tooltip of fixed size

      }).openPopup(); // this automatically opens whichever marker is opened last

    });
  }

getDocuments();