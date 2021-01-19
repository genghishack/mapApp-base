var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import ReactMapGl, { NavigationControl } from 'react-map-gl';
import Config from '../config';
var mapConf = Config.mapbox;
var Map = function (props) {
    var map = props.map, setMap = props.setMap, setMapFullyLoaded = props.setMapFullyLoaded, viewport = props.viewport, setViewport = props.setViewport, handleMapClick = props.handleMapClick, handleMouseMove = props.handleMouseMove;
    var onMapLoad = function () {
        if (map) {
            if (!map.loaded() || !map.isStyleLoaded() || !map.areTilesLoaded()) {
                setTimeout(onMapLoad, 100);
            }
            else {
                setMapFullyLoaded(true);
            }
        }
    };
    return (React.createElement(ReactMapGl, __assign({ ref: function (mapRef) {
            setMap(mapRef === null || mapRef === void 0 ? void 0 : mapRef.getMap);
        } }, viewport, { width: "100%", height: "100%", mapStyle: mapConf.style, mapboxApiAccessToken: mapConf.accessToken, onViewportChange: setViewport, onLoad: onMapLoad, onMouseMove: handleMouseMove, onClick: handleMapClick }),
        React.createElement("div", { style: { position: 'absolute', right: 10, top: 10 } },
            React.createElement(NavigationControl, { onViewportChange: setViewport }))));
};
export default Map;
