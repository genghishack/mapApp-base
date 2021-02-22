import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {continentalViewport} from '../../libs/mapLib';
import Map from '../Map';

import './ResourceMap.scss';

interface IResourceMapProps {
  resources?: any;
}

const ResourceMap = (props: IResourceMapProps) => {
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

const mapStateToProps = state => {
  return {
    resources: state.resources,
  };
};

export default connect(mapStateToProps)(ResourceMap);
