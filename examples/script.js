/*
 * @Descripttion: 
 * @version: 0.x
 * @Author: zhai
 * @Date: 2021-06-11 10:21:19
 * @LastEditors: zhai
 * @LastEditTime: 2021-06-24 09:31:40
 */
// initialize the map on the "map" div with a given center and zoom
var map = new L.Map('map', {
    zoom: 6,
    minZoom: 3,
});

// create a new tile layer
var tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    layer = new L.TileLayer(tileUrl, {
        attribution: 'Maps © <a href=\"www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',
        maxZoom: 18
    });

// add the layer to the map
map.addLayer(layer);

var londonParisRomeBerlinBucarest = [
    [51.507222, -0.1275],
    [48.8567, 2.3508],
    [41.9, 12.5],
    [52.516667, 13.383333],
    [44.4166, 26.1]
];

map.fitBounds(londonParisRomeBerlinBucarest);


//========================================================================

var path = L.polyline([], {
    color: 'red'
}).addTo(map);


var carIcon = L.icon({
    iconUrl: "./car.png",
    iconSize: [24, 48],
});

var marker1 = L.Marker.movingMarker(londonParisRomeBerlinBucarest,
    [3000, 9000, 9000, 4000], {
        loop: false,
        icon: carIcon,
        rotate: true,
        autostart: true
    }, (p) => {
        path.addLatLng(p)
    }, () => {
        path.setLatLngs([]);
    }).addTo(map);

map.on('click', (e) => {
    marker1.moveTo(e.latlng, 5000);
});

// marker1.on('end', function () {
//     marker1.bindPopup('<b>Welcome to Bucarest !</b>', {
//             closeOnClick: false
//         })
//         .openPopup();
// });