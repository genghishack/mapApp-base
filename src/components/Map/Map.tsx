import React from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import Config from '../../config';
import {LatLngExpression} from "leaflet";
import Markers from './Markers';

interface IMapProps {
  viewport: any;
  markers?: [any];
  onMarkerClick: Function;
  setMap: Function;
}

const mapConf = Config.mapbox;
const { username, accessToken, keys } = mapConf;

const tileUrl = `https://api.mapbox.com/styles/v1/${username}/${keys.bright}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`

const Map = (props: IMapProps) => {
  const {
    viewport,
    markers,
    onMarkerClick,
    setMap,
  } = props;

  // console.log({markers});

  const { latitude, longitude, zoom } = viewport;

  return (
      <MapContainer
          center={[latitude, longitude]}
          zoom={10}
          zoomSnap={0.1}
          scrollWheelZoom={true}
          style={{ width: '100%', height: 'calc(100vh - 70px)' }}
      >
        <TileLayer
            url={tileUrl}
        />
        <Markers markers={markers} onMarkerClick={onMarkerClick} setMap={setMap}/>
      </MapContainer>
  );
}

export default Map;
