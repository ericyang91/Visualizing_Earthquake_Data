// Creating the map object
var myMap = L.map("map", {
    center: [48, 30],
    zoom: 3
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Load the GeoJSON data.
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";


// Get the data with d3.

d3.json(geoData).then(function(data) {
    for (let i=0; i<data.features.length; i++){
      let coordinates = data.features[i].geometry.coordinates.slice(0,2)
      let depth = data.features[i].geometry.coordinates.slice(2)
      console.log(depth)
      let color = ''
      if (depth < 0) {color = '#ffffd9'}
      else if (depth < 5) {color = '#edf8b1'}
      else if (depth < 10) {color = '#c7e9b4'}
      else if (depth <15) {color = '#7fcdbb'}
      else if (depth <20) {color = '#41b6c4'}
      else if (depth < 25) {color = '#1d91c0'}
      else if (depth <30) {color = '#225ea8'}
      else {color = '#0c2c84'}
      L.circle(coordinates, {
        fillOpacity: 0.75,
        fillColor: color,
        color: color,
        radius: (data.features[i].properties.mag) * 500
      }).bindPopup(`<h1>${data.features[i].properties.place}</h1> <hr> <h3>Magnitude: ${data.features[i].properties.mag}</h3>`).addTo(myMap);
    }    
});


const legend = L.control({position: 'bottomright'});
  legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend')
    let grades = [0, 5, 10, 15, 20, 25, 30]
    let colors = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84']
    let legendInfo = '<h1>Color Code Based on Depth</h1>'
    div.innerHTML = legendInfo;

    for (let i=0; i < grades.length; i++) {
      console.log(colors[i])
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
      grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
         
      return div;
  };
  legend.addTo(myMap)