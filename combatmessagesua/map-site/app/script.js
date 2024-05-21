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
var day_loading_popup =  L.popup().setLatLng([48, 35]).setContent('loading...').openOn(oneDay);
oneDay.addTo(map)
getDocuments(1, oneDay).then(() => oneDay.removeLayer(day_loading_popup));

var week_loading_popup =  L.popup().setLatLng([48, 35]).setContent('loading...').openOn(sevenDays);
getDocuments(7, sevenDays).then(() => sevenDays.removeLayer(week_loading_popup));

var month_loading_popup =  L.popup().setLatLng([48, 35]).setContent('loading...').openOn(thirtyDays);
getDocuments(30, thirtyDays).then(() => thirtyDays.removeLayer(month_loading_popup));