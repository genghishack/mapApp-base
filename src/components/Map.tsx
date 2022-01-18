import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Config from '../config';
import {LatLngExpression} from "leaflet";

interface IMapProps {
  viewport: any;
  markers?: [any];
  onMarkerClick: Function;
}

const mapConf = Config.mapbox;
const { username, accessToken, keys } = mapConf;

const tileUrl = `https://api.mapbox.com/styles/v1/${username}/${keys.bright}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`

const Map = (props: IMapProps) => {
  const {
    viewport,
    markers,
    onMarkerClick,
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
        {markers && markers.map((marker) => {
          if (marker.lat) {
            const latlng: LatLngExpression = [marker.lat, marker.lng];
            return (
              <Marker
                key={marker.id}
                position={latlng}
                eventHandlers={{
                  click: (e) => onMarkerClick(e, marker)
                }}
              >
                {/*<Popup>{marker.name_json.first} {marker.name_json.last}</Popup>*/}
              </Marker>
            )
          } else {
            return null;
          }
        })}
      </MapContainer>
  );
}

export default Map;
