const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
const otm = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
const upt = L.layerGroup();
const baseLayers = {
    'OpenStreetMap': osm,
    'openTopoMap': otm
};
const overlays = {
    'UPT dan Kantor Pusat': upt
};
// Initialize map
const map = L.map('map', {
    center: [0.5, 125],
    zoom: 5,
    layers: [otm, upt]
});
// Add base layers and overlays to the map
const layerControl = L.control.layers(baseLayers, overlays).addTo(map);

fetch(
    "https://raw.githubusercontent.com/ardian28/GeoJson-Indonesia-38-Provinsi/refs/heads/main/Provinsi/38%20Provinsi%20Indonesia%20-%20Provinsi.json"
)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    L.geoJSON(data).addTo(map);
    L.control.scale().addTo(map);
    L.geoJSON(data, {
        style: function (feature) {
            return {
                color: "#3388ff",
                weight: 2,
                fillColor: "#3388ff",
                fillOpacity: 0.2,
            };
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                click: function () {
                    layer
                        .bindPopup("<b>" + feature.properties.PROVINSI + "</b>")
                        .openPopup();
                },
            });
        },
    }).addTo(map);
});