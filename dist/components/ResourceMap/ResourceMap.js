import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { continentalViewport } from '../../utils/MapHelpers';
import Map from '../Map';
import './ResourceMap.scss';
var ResourceMap = function (props) {
    var setResource = props.setResource, setInfoTrayExpanded = props.setInfoTrayExpanded;
    var mapWindowRef = useRef(null);
    var layerIds = ['districts_hover'];
    var _a = useState(null), map = _a[0], setMap = _a[1];
    var _b = useState(false), mapFullyLoaded = _b[0], setMapFullyLoaded = _b[1];
    var _c = useState(continentalViewport()), viewport = _c[0], setViewport = _c[1];
    var usePrevious = function (value) {
        var ref = useRef();
        useEffect(function () {
            ref.current = value;
        });
        return ref.current;
    };
    useEffect(function () {
        //@ts-ignore
        var width = mapWindowRef.current ? mapWindowRef.current.offsetWidth : 0;
        //@ts-ignore
        var height = mapWindowRef.current ? mapWindowRef.current.offsetHeight : 0;
        setViewport(continentalViewport(width, height));
    }, [map]);
    var addLayers = useCallback(function () {
    }, [map]);
    var onMapFullLoad = useCallback(function () {
    }, [map]);
    useEffect(function () {
        if (mapFullyLoaded) {
            addLayers();
            onMapFullLoad();
        }
    }, [
        mapFullyLoaded,
        addLayers,
        onMapFullLoad,
    ]);
    var handleMapClick = function (evt) {
        if (map) {
            var features = map.queryRenderedFeatures(evt.point);
            var resource = void 0;
            var rFilteredResources = features.filter(function (feature) {
                return layerIds.indexOf(feature.layer.id) !== -1;
            });
            if (rFilteredResources.length) {
                resource = rFilteredResources[0];
                setResource(resource);
                setInfoTrayExpanded(true);
                return;
            }
            setResource({});
            setInfoTrayExpanded(false);
        }
    };
    return (React.createElement("div", { className: "ResourceMap", ref: mapWindowRef },
        React.createElement(Map, { map: map, setMap: setMap, setMapFullyLoaded: setMapFullyLoaded, viewport: viewport, setViewport: setViewport, handleMapClick: handleMapClick })));
};
var mapStateToProps = function (state) {
    return {};
};
export default connect(mapStateToProps)(ResourceMap);
