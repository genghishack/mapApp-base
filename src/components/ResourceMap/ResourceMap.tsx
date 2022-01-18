import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";

import {continentalViewport, markerViewport} from '../../libs/mapLib';
import {useResourceContext} from "../../context/ResourceContext";
import Map from '../Map';

import './ResourceMap.scss';

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

  useEffect(() => {
    //@ts-ignore
    const width = mapWindowRef.current ? mapWindowRef.current.offsetWidth : 0;
    //@ts-ignore
    const height = mapWindowRef.current ? mapWindowRef.current.offsetHeight : 0
    setViewport(continentalViewport(width, height));
  }, []);

  const handleMarkerClick = (evt: MouseEvent, marker: any) => {
    setDisplayedResource(marker);
    setViewport(markerViewport(marker.lat, marker.lng));
  }

  return (
    <div className="ResourceMap" ref={mapWindowRef}>
      <Map
        viewport={viewport}
        markers={resources}
        onMarkerClick={handleMarkerClick}
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
