import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Config from '../config';

interface IMapProps {
  viewport: any;
  markers?: [any];
}

const mapConf = Config.mapbox;
const { username, accessToken, keys } = mapConf;

const tileUrl = `https://api.mapbox.com/styles/v1/${username}/${keys.bright}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`

const Map = (props: IMapProps) => {
  const {
    viewport,
    markers,
  } = props;

  // console.log({markers});

  const { latitude, longitude, zoom } = viewport;

  return (
      <MapContainer
          center={[latitude, longitude]}
          zoom={zoom}
          zoomSnap={0.1}
          scrollWheelZoom={true}
          style={{ width: '100%', height: 'calc(100vh - 70px)' }}
      >
        <TileLayer
            url={tileUrl}
        />
        {markers && markers.map((marker) => (
          <Marker key={marker.id} position={marker.latlng}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
  );
}

export default Map;
