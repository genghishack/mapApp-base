import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";

import {continentalViewport, markerViewport} from '../../libs/mapLib';
import {useResourceContext} from "../../context/ResourceContext";
import Map from '../Map/Map';

import './ResourceMap.scss';
import {useMap} from "react-leaflet";

interface IResourceMap {
  dispatch: Function;
  resources?: any;
  categories?: any;
}

const ResourceMap = (props: IResourceMap) => {
  const {resources, categories, dispatch} = props;
  const {displayedResource, setDisplayedResource} = useResourceContext()

  const mapWindowRef = useRef(null);

  const [viewport, setViewport] = useState(continentalViewport());

  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    //@ts-ignore
    const width = mapWindowRef.current ? mapWindowRef.current.offsetWidth : 0;
    //@ts-ignore
    const height = mapWindowRef.current ? mapWindowRef.current.offsetHeight : 0
    setViewport(continentalViewport(width, height));
  }, []);

  useEffect(() => {
    if (map) {
      map.setView([displayedResource.lat, displayedResource.lng], 10);
    }
  }, [displayedResource]);

  const handleMarkerClick = (evt: MouseEvent, marker: any) => {
    setDisplayedResource(marker);
    // setViewport(markerViewport(marker.lat, marker.lng));
  }

  return (
    <div className="ResourceMap" ref={mapWindowRef}>
      <Map
        viewport={viewport}
        markers={resources}
        onMarkerClick={handleMarkerClick}
        setMap={setMap}
      />
    </div>
  );
}

function mapStateToProps(state: { errors: any; resources: any; categories: any}) {
  return {
    resources: state.resources,
    categories: state.categories,
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(ResourceMap);
