import geoViewport from "@mapbox/geo-viewport";
import { continentalBbox } from '../constants';
var AKBbox = [-190, 51.214183, -129, 71.365162];
var getViewport = function (bbox, w, h) {
    return geoViewport.viewport(bbox, [w, h], 0, // minZoon
    20, // maxZoon
    256, // 512 for mapbox tiles, 256 for other (but not really, apparently)
    true // allowFloat
    );
};
export var continentalViewport = (function (width, height) {
    if (width === void 0) { width = window.innerWidth; }
    if (height === void 0) { height = window.innerHeight; }
    // Determine an appropriate center and zoom for the continental US
    var continental = getViewport(continentalBbox, width / 2, height / 2);
    return {
        longitude: continental.center[0],
        latitude: continental.center[1],
        zoom: continental.zoom,
        bearing: 0,
        pitch: 0
    };
});
