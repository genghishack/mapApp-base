import React, {useEffect, useRef, useState} from 'react';
import {continentalViewport} from '../../libs/mapLib';
import Map from '../Map';

import './ResourceMap.scss';

interface IResourceMap {
  resources: any;
}

const ResourceMap = (props: IResourceMap) => {
  const {
    resources,
  } = props;

  const mapWindowRef = useRef(null);

  const [viewport, setViewport] = useState(continentalViewport());

  useEffect(() => {
    //@ts-ignore
    const width = mapWindowRef.current ? mapWindowRef.current.offsetWidth : 0;
    //@ts-ignore
    const height = mapWindowRef.current ? mapWindowRef.current.offsetHeight : 0
    setViewport(continentalViewport(width, height));
  }, []);

  return (
    <div className="ResourceMap" ref={mapWindowRef}>
      <Map
        viewport={viewport}
        markers={resources}
      />
    </div>
  );
}

export default ResourceMap;
