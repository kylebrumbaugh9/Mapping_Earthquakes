// Add console.log to check to see if our code is working.
console.log("working");
// Create the map object with center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);



// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   // pointToLayer: function(feature, latlng) {
//   //   console.log(feature);
//   //   return L.marker(latlng)
//   //   .bindPopup("<h2>" + feature.properties.city + "</h2>");
//   // }
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>" + "Airport Code: " + feature.properties.faa + "</h2> <hr> <h4>Airport Name: " + feature.properties.name + "</h4>");
//   }
// //"<h3>" + features.properties.DISTRICT + "</h3> <hr> <h4>DISTRICT: " + features.properties.DISTRICT + "</h4>"
// }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    //id: 'mapbox/dark-v10',
    id: 'mapbox/streets-v11',
    //id: 'mapbox/light-v10',
    //id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
})
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/kylebrumbaugh9/Mapping_Earthquakes/main/torontoNeighborhoods.json";


// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    color: "blue",
    weight: 1,
    fillColor: "yellow",
    fillOpacity: 0.2,
    onEachFeature: function(feature, layer){
      layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>")
    }

  }).addTo(map);
});

