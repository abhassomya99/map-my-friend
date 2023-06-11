$(document).ready(function () {
  //Importing the layer
  let layer = new L.TileLayer(
    //"https://tiles.cozeva.com/styles/osm-bright/{z}/{x}/{y}.png",
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'Tiles by <a href="http://openstreetmap.org">openstreetmap.org</a>',
    }
  );

  //Creating and adding layer to map
  var map = L.map("map_parent", {
    layers: [layer],
    renderer: L.canvas({ padding: 0.5 }),
  }).setView([19.07609, 88.877426], 5);
  map.addLayer(layer);

  //Making the marker icon
  var source = { icon: "img/download.jpg" };
  var userIcon = L.icon({
    iconUrl: source.icon,
    iconSize: [38, 38], // size of the icon
    //shadowUrl: "img/download.jpg",
    // shadowSize: [50, 64], // size of the shadow
    // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62], // the same for the shadow
    // popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  //To pin the location on map
  const pinOnMapCallback = (position) => {
    source = {
      ...source,
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    var source_marker = L.marker([source.lat, source.long], {
      icon: userIcon,
    }).addTo(map);

    //Recenter the map on Source marker
    $(source_marker._icon)
      .addClass("custom-marker")
      .on("click", function () {
        map.setView([source.lat, source.long], 16);
      });

    // var source_marker = L.marker([source.lat, source.long]).addTo(map); // Normal source marker

    //For testing static Destination
    let dest = {
      lat: 22.584,
      long: 88.4909,
    };
    var dest_marker = L.marker([dest.lat, dest.long]).addTo(map);

    //Routing
    let route = L.Routing.control({
      waypoints: [
        L.latLng(source.lat, source.long),
        L.latLng(dest.lat, dest.long),
      ],
    }).addTo(map);
  };
  navigator.geolocation.getCurrentPosition(pinOnMapCallback);
});
