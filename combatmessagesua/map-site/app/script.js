// function get messages from database

async function getDocuments(numDaysAgo, layerGroup) {

  // get the docs from the database and make them readable

  var query = '/getDocuments?numDaysAgo=' + numDaysAgo

  const response = await fetch(query);
  const documents = await response.json();

  var markers = [];

  documents.forEach(doc => {

    // map each message

    var marker = L.marker(doc.location);

    var contents = doc.datetime.replace('T', ' ').replace('Z', ' ').concat('\n\n', doc.message) //this makes the datetime object legible

    marker.bindPopup(contents, {

      maxHeight:150, // this makes each marker open as a scrollable tooltip of fixed size

    }); // this automatically opens whichever marker is opened last

    marker.addTo(layerGroup);

  });

}

// initialize the map
        
var map = L.map('map').setView([48, 35], 6); // change lat, long, zoom in setView

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// add layers to map for filtering by date

var oneDay = L.layerGroup();
var sevenDays = L.layerGroup();
var thirtyDays = L.layerGroup();

var overlays = {
  "past day": oneDay,
  "past week": sevenDays,
  "past month": thirtyDays,
          };

L.control.layers(overlays,null,{collapsed:false}).addTo(map);

// fill layers with messages

// create 'loading...' marker
var loading_marker =  L.marker([48, 35]).bindPopup('loading...').openPopup().addTo(map)
getDocuments(1, oneDay)
oneDay.addTo(map)
map.removeLayer(loading_marker)

getDocuments(7, sevenDays)
getDocuments(30, thirtyDays)