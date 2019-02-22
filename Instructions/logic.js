// Creating map object
// try{
var map = L.map("map", {
    center: [33.00, -95.00],
    zoom: 4,
  });
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoibWFjYXJsc29uNTMiLCJhIjoiY2pwcHBkYmZxMGFuOTQzbnZ0OWxjOHVvdyJ9.LQFKmr2ZXQHvFUJ0T0MQeg").addTo(map);
  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  // Grabbing our GeoJSON data
  d3.json(link, function(feature, data) {
    var features = data["features"];
    for (var i = 0; i < features.length; i++) {
      var geometry = features[i]["geometry"]["coordinates"];
      var magnitude = features[i]["properties"]["mag"];
      var title = features[i]["properties"]["title"];
      var coords = {
        longitude: geometry["0"],
        latitude: geometry["1"]
      }
      function styleinfo(style) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColor(magnitude),
          color: "#000000",
          stroke: true,
          weight: 0.5
        };
      }
      L.geoJSON(features, {
        style: styleinfo
      }
    ).addTo(map);
  // }});
      //   var city = cities[i];
       // Giving each feature a pop-up with information pertinent to it
      var latlng = L.latLng(coords.latitude, coords.longitude);
      var circle = L.circle(latlng, {
        fillColor: getColor(magnitude),
        fill: getColor(magnitude),
        // stroke: "none",
        // fillOpacity: 0.5,
        // weight: 1.5,
        radius: magnitude * 25000
      }).addTo(map);
      L.circle(latlng)
        .bindPopup("<h1>" + title + "</h1> <hr> <h3>Magnitude: " + magnitude + "</h3><h3>Latitude: " + coords.latitude + "</h3><h3>Longitude: " + coords.longitude + "</h3>")
        .addTo(map);
    
 
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend'),
           grades = [0,1,2,3,4,5],
           labels = [];
        div.innerHTML = '<h3>Earthquakes</h3>'
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i +1] ? '&ndash;' + grades[i+1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(map);
  }});
  // }
  //Create color range for the circle diameter 
  // try {
  var colors = ["green", "olive", "yellow", "orange", "red", "maroon"];
  // var color;
  function getColor(magnitude) {
    switch (true){
      case magnitude <= 1:
       return "green"
      case magnitude > 1 && magnitude <= 2:
        return "olive"
      case magnitude > 2 && magnitude <= 3:
        return "yellow"
      case magnitude > 3 && magnitude <= 4:
        return "orange"
      case magnitude > 4 && magnitude <= 5:
        return "red"
      case magnitude > 5:
        return "maroon"
    }
  }
// }catch(e){
//   console.log(e)
// };
// }catch(e){
//   console.log(e)
// };
