// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import * as mapboxgl from 'mapbox-gl'
import './node_modules/mapbox-gl/dist/mapbox-gl.css'
import './node_modules/mapbox-gl-compare/dist/mapbox-gl-compare.css'
import Compare from 'mapbox-gl-compare'
mapboxgl.accessToken = 'pk.eyJ1IjoiNTcxNTc0MDg1IiwiYSI6ImNqc3pqMnZ5dzBlYnUzeW96a2owMDdiNW0ifQ.gnXhMxktw1ZjVSi3sKgJHg';


/**滑动对比 */
var beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [0, 0],
    zoom: 0
});
var afterMap = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [0, 0],
    zoom: 0
});
mapboxgl.Compare = Compare
var map = new mapboxgl.Compare(beforeMap, afterMap, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
});

/** beforeMap加个色带 */
beforeMap.on('load', function () {

    var width = 64; // The image will be 64 pixels square
    var bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
    var data = new Uint8Array(width * width * bytesPerPixel);

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            var offset = (y * width + x) * bytesPerPixel;
            data[offset + 0] = y / width * 255; // red
            data[offset + 1] = x / width * 255; // green
            data[offset + 2] = 128;             // blue
            data[offset + 3] = 255;             // alpha
        }
    }

    beforeMap.addImage('gradient', { width: width, height: width, data: data });

    beforeMap.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [0, 0]
                    }
                }]
            }
        },
        "layout": {
            "icon-image": "gradient"
        }
    });
});

/**切换图层 */
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    beforeMap.setStyle('mapbox://styles/mapbox/' + layerId);
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}



