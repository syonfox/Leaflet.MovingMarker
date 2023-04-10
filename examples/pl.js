var pl = {
    "type": "FeatureCollection",
    "name": "PL_61408-2",
    "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:EPSG::4269"}},
    "features": [
        {
            "type": "Feature", "properties": {
                "OBJECTID": 48326386,
                "LICENCE_NO": "61408",
                "IS_NEB": "N",
                "LINE_NO": "2",
                "LIC_LI_NO": "61408-2",
                "PLLICSEGID": "347051",
                "COMP_NAME": "Secure Energy Services Inc.",
                "BA_CODE": "A267",
                "PL_SPEC_ID": "1",
                "SEG_LENGTH": "12.18",
                "SEG_STATUS": "Operating",
                "FROM_FAC": "Pipeline",
                "FROM_LOC": "09-10-060-22W5",
                "TO_FAC": "Pipeline",
                "TO_LOC": "16-10-060-21W5",
                "H2S_R_VOLM": null,
                "H2S_R_LEVL": null,
                "H2S_CONT": "1",
                "PIPTECHSTD": null,
                "OUT_DIAMET": "114.3",
                "WALL_THICK": "4",
                "PIPE_TYPE": "Z245.1",
                "PIPE_GRADE": "3592",
                "PIP_MATERL": "Steel",
                "PIPE_MAOP": "9930",
                "BIDIRE_IND": null,
                "HDD_IND": "Y",
                "LINER_GRD": null,
                "LINER_TYPE": null,
                "EXT_COAT": "POLYE",
                "PIPE_ENVIR": "Creek Crossing",
                "CLASS_LOC": "Class 1",
                "STRESSLEVL": "40",
                "JOINTMETHD": "Welded",
                "INT_COAT": "Uncoated",
                "FLD_CTR_NM": "Grande Prairie",
                "SUBSTANCE1": "Condensate",
                "SUBSTANCE2": "Crude Oil",
                "SUBSTANCE3": null,
                "ORIG_LICNO": "61408",
                "ORIGPSPPID": "1",
                "ORIGLIN_NO": "2",
                "LICAPPDATE": "2020\/12\/19",
                "ORG_ISSUED": "2019\/12\/19",
                "PERMT_APPR": "2019\/12\/19",
                "PERMT_EXPI": "2020\/12\/19",
                "LAST_OCCYR": "2019",
                "TEMPSURFPL": null,
                "GEOM_SRCE": "ROW centre line",
                "SHAPE_LEN": "20785.3059338303"
            }, "geometry": {
                "type": "MultiLineString",
                "coordinates": [
                    [
                        [-117.206069534845369, 54.174852188420161],
                        [-117.202311930520906, 54.175860658412368],
                        [-117.201084428499257, 54.175650450225959],
                        [-117.190584043601064, 54.173847854039259],
                        [-117.190518808843422, 54.173633647341873],
                        [-117.189735130267664, 54.173715790607439],
                        [-117.188676192617493, 54.174635616622552],
                        [-117.188433585507042, 54.175352928410575],
                        [-117.178353708281534, 54.178253470169253],
                        [-117.174478122820943, 54.17937115845114],
                        [-117.170664088126983, 54.17915829050601],
                        [-117.170288323741929, 54.179010152607944],
                        [-117.1688234158553, 54.178432616933463],
                        [-117.164253347340122, 54.180158317446995],
                        [-117.160746672118947, 54.181482255139869],
                        [-117.160529463076486, 54.181435743281718],
                        [-117.159469463617654, 54.181208754212172],
                        [-117.159253752066775, 54.181162560104546],
                        [-117.158762282876523, 54.180208140726009],
                        [-117.155471250035916, 54.177749353643321],
                        [-117.150391360647532, 54.176817655561386],
                        [-117.149930595873712, 54.176592234763696],
                        [-117.146155314501087, 54.175898533723505],
                        [-117.13449076509697, 54.17499809501895],
                        [-117.134381416770708, 54.175476575581982],
                        [-117.134679562223596, 54.175958060712382],
                        [-117.13455343606276, 54.176015557048032],
                        [-117.134608040157318, 54.176104388766262],
                        [-117.133190219262914, 54.176747305215784],
                        [-117.132051909169178, 54.177481186074843],
                        [-117.127853054173798, 54.177513149807986],
                        [-117.122040408109868, 54.177555765977409],
                        [-117.11853467971298, 54.17654384932812],
                        [-117.114676429940729, 54.174464233690195],
                        [-117.114420177421096, 54.174263806242443], [-117.111002954639275, 54.172419662938765], [-117.11138269676438, 54.172178803463055], [-117.109865338044912, 54.171355311086366], [-117.109526964236977, 54.171569927115854], [-117.107998310101152, 54.170751197846485], [-117.103400204267615, 54.168285688884332], [-117.095792550891147, 54.173527735069449], [-117.096149821659438, 54.173706535288204], [-117.094585043571087, 54.174782693357933], [-117.094510521131738, 54.174833943815308], [-117.093972657550324, 54.174565034894073], [-117.091591871417435, 54.176194612030983], [-117.091067018136272, 54.176212465381944], [-117.089828084154291, 54.175547130517209], [-117.089525410294044, 54.17556715407094], [-117.085388738479281, 54.177803002090222], [-117.085374407655564, 54.177999862482466], [-117.084916615406968, 54.178246411935753], [-117.081351860509386, 54.180166094025203], [-117.069012278373251, 54.179416019185069], [-117.0648461561902, 54.179168901017889], [-117.059020881609982, 54.178819066033064], [-117.056712828472413, 54.178082391393232], [-117.051483997511596, 54.178063830131265]
                    ]
                ]
            }
        }
    ]
}


// initialize the map on the "map" div with a given center and zoom
var map = new L.Map('map', {
    zoom: 12,
    minZoom: 3,
});
map.setView([55.86606, -112.96692], 8); //ab canada

// create a new tile layer
var tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    layer = new L.TileLayer(tileUrl,
        {
            attribution: 'Maps © <a href=\"www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',
            maxZoom: 18
        });

// add the layer to the map
map.addLayer(layer);

function extractBestLinestring(geojson) {
    // Parse GeoJSON data
    if(typeof geojson == "string") geojson = JSON.parse(geojson);

    const data = geojson;

    // Check if data is a FeatureCollection or MultiLineString
    if (data.type === 'FeatureCollection') {
        // If FeatureCollection, loop through features to find the best linestring
        let bestLinestring = null;
        let bestLength = 0;


        for (const feature of data.features) {
            if (feature.geometry.type === 'LineString') {
                const linestring = feature.geometry.coordinates;
                const length = getLinestringLength(linestring);
                if (length > bestLength) {
                    bestLinestring = linestring;
                    bestLength = length;
                }
            }
        }
        return bestLinestring;
    } else if (data.type === 'MultiLineString') {
        // If MultiLineString, loop through linestrings to find the best one
        let bestLinestring = null;
        let bestLength = 0;
        for (const linestring of data.coordinates) {
            const length = getLinestringLength(linestring);
            if (length > bestLength) {
                bestLinestring = linestring;
                bestLength = length;
            }
        }
        return bestLinestring;
    } else {
        // If not a FeatureCollection or MultiLineString, return null
        return null;
    }
}

// Helper function to calculate the length of a linestring
function getLinestringLength(linestring) {
    let length = 0;
    for (let i = 0; i < linestring.length - 1; i++) {
        const p1 = linestring[i];
        const p2 = linestring[i + 1];
        length += distance(p1[1], p1[0], p2[1], p2[0]); // Uses the haversine formula to calculate distance
    }
    return length;
}

// Helper function to calculate the distance between two points using the haversine formula
function distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

// Helper function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

//End of librar begin demo iplementation
let cool = pl.features[0]
lcool = L.geoJson(cool);
lcool.addTo(map);

L.LatLn
map.panInsideBounds(lcool.getBounds())
lcool2 = L.geoJson(cool);
let l = lcool2.getLayers()[0]
let ll = cool.geometry.coordinates[0].map(l=>{return new L.LatLng(l[1], l[0])})


// createMovingMarker(map, ll, 500)
// Call the function with velocity as a single number

let content = `
<span>
Running: Pig 42 @ 0.7m/s<br>
PL: 61408-2 <br>
Time:  <b class="pig_elapsed"></b> ms
 </span><br>
 <span><button name="stop" class="btn">Stop</button> <button class="btn" name="start">Start</button> </span>
`
let dom;

function initDom(marker) {
    // if(!dom) {
    dom = marker._popup._container
    // if(!dom )
    dom.time = dom.querySelector(".pig_elapsed")

    // keep us up to date
    marker.on("popupopen", function (event) {
        initDom(marker);
        //this will be fired only for this specific popup of marker1 .
    });

    // todo: add your cool ui functionality here

    dom.start = dom.querySelector("button[name='start']");
    dom.start.addEventListener("click", (e) => {
        marker.resume()
    })


    dom.stop = dom.querySelector("button[name='stop']");
    dom.stop.addEventListener("click", (e) => {
        marker.pause()
    })

    // ).innerText = Math.round()
    // }
}

// map.panTo(cool.lcool)

marker = L.Marker.createMovingMarker(map,
    ll, //the L.LatLng array
    20, // vel or array of durations
    {
        autostart: true,
        debug: false,
        center: "delta", // false,"lock","pan", true
        zoompause: false,
        rotate: true,
        smoothrotate: false,
        rotationOrigin: "center",
        rotationOffset: 180,
        // rotationEasing: "ease-in-out",
        // rotationExp: "4",
        // todo finish implementing


    }, //moving optioins
    content, // popup content
    function (movingMarker, elapsedTime, latLon, popup, event) {
        if (!dom) initDom(movingMarker);
        // console.log("Time elapsed: " + elapsedTime);
        dom.time.innerText = Math.round(elapsedTime)
        // popup.setContent("Moved" + Math.round(elapsedTime)) ;
        // map.setView(latLon)
    },
    function (movingMarker, marker, popup) {
        console.log("Stationary point reached.");
    },
    function (movingMarker) {
        console.log("Moving marker reached the end point.");
    });


var marker;



