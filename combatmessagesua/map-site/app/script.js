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

var layerControl = L.control.layers().addTo(map)

var oneDay = L.layerGroup().addTo(map);
getDocuments(1, oneDay)
layerControl.addBaseLayer(oneDay, "past 24 hours");

var threeDays = L.layerGroup().addTo(map);
getDocuments(3, threeDays)
layerControl.addBaseLayer(threeDays, "past 3 days");

var sevenDays = L.layerGroup().addTo(map);
getDocuments(7, sevenDays)
layerControl.addBaseLayer(sevenDays, "past week");

var thirtyDays = L.layerGroup().addTo(map);
getDocuments(30, thirtyDays)
layerControl.addBaseLayer(thirtyDays, "past month");

var threesixtyfiveDays = L.layerGroup().addTo(map);
getDocuments(365, threesixtyfiveDays)
layerControl.addBaseLayer(threesixtyfiveDays, "past year");

var allMessages = L.layerGroup().addTo(map);
getDocuments(0, allMessages)
layerControl.addBaseLayer(allMessages, "all time");

oneDay.addTo(map)