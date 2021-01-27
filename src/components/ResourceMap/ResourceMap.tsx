import React, {useCallback, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Map as TMap} from 'mapbox-gl';
import {continentalViewport} from '../../utils/MapHelpers';
import Map from '../Map';

import './ResourceMap.scss';

interface IResourceMapProps {
  selectedResource: string;
  setResource: Function;
  setInfoTrayExpanded: Function;
  resources?: any;
}

const ResourceMap = (props: IResourceMapProps) => {
  const {
    selectedResource,
    setResource,
    setInfoTrayExpanded,
    resources,
  } = props;

  const mapWindowRef = useRef(null);

  const layerIds = ['districts_hover'];

  const [map, setMap] = useState<TMap | null>(null);
  const [mapFullyLoaded, setMapFullyLoaded] = useState(false);
  const [viewport, setViewport] = useState(continentalViewport());

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  useEffect(() => {
    //@ts-ignore
    const width = mapWindowRef.current ? mapWindowRef.current.offsetWidth : 0;
    //@ts-ignore
    const height = mapWindowRef.current ? mapWindowRef.current.offsetHeight : 0
    setViewport(continentalViewport(width, height));
  }, [map]);

  const addLayers = useCallback(() => {
  }, [map]);

  const onMapFullLoad = useCallback(() => {
  }, [map]);

  useEffect(() => {
    if (mapFullyLoaded) {
      addLayers();
      onMapFullLoad();
    }
  }, [
    mapFullyLoaded,
    addLayers,
    onMapFullLoad,
  ]);

  const handleMapClick = (evt) => {
    if (map) {
      const features = map.queryRenderedFeatures(evt.point);
      let resource;

      const rFilteredResources = features.filter(feature => {
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

  return (
    <div className="ResourceMap" ref={mapWindowRef}>
      <Map
        map={map}
        setMap={setMap}
        setMapFullyLoaded={setMapFullyLoaded}
        viewport={viewport}
        setViewport={setViewport}
        handleMapClick={handleMapClick}
        markers={resources}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    resources: state.resources,
  };
};

export default connect(mapStateToProps)(ResourceMap);
