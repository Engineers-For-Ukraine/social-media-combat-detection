// function get messages from database

async function getDocuments(numDaysAgo) {

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

    markers.append(marker);

  });

  return markers;

}

// initialize the map
        
var map = L.map('map').setView([48, 35], 6); // change lat, long, zoom in setView

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var layerControl = L.control.layers().addTo(map)

var oneDay = getDocuments(1);
layerControl.addBaseLayer(oneDay, "past 24 hours");

var threeDays = getDocuments(3);
layerControl.addBaseLayer(threeDays, "past 3 days");

var sevenDays = getDocuments(7);
layerControl.addBaseLayer(sevenDays, "past week");

var thirtyDays = getDocuments(30);
layerControl.addBaseLayer(thirtyDays, "past month");

var allMessages = getDocuments();
layerControl.addBaseLayer(allMessags, "all time");
