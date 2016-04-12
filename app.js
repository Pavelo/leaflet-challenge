// Map init
var sfmap = L.map('mapid').setView([37.7777,-122.4407], 12);
var districtsLayer = L.geoJson(null, { onEachFeature: bindDistrictsPopup })
                      .addTo(sfmap);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(sfmap);

// AJAX call to obtain GeoJSON layer
$.getJSON({
  url: "https://gist.githubusercontent.com/TonsOfFun/2a4c7e2ef0c9a667767f/raw/6f420531510045cb9f8029a1592f57a23bf2b53b/gistfile1.json",
  success: ajaxSuccess
});

// JSON binding to layer
function ajaxSuccess(response) {
    districtsLayer.addData(response);
}

function bindDistrictsPopup(feature, layer) {
    // bind the neighborho property to a CSS popup, if existing
    if (feature.properties && feature.properties.neighborho) {
        layer.bindPopup( distrPopDecorator( feature.properties.neighborho));
    }
}

function distrPopDecorator(districtName) {
    return '<table>'
    + '<tr>'
    + '<td>neighborho</td>'
    + '<td>' + districtName + '</td>'
    + '</tr></table>';
}
