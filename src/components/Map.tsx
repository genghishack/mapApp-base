import React from 'react';
import ReactMapGl, { NavigationControl, ViewportChangeHandler } from 'react-map-gl';
import { Map as TMap } from 'mapbox-gl';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Config from '../config';

interface IMapProps {
  map: TMap | null;
  setMap: Function;
  setMapFullyLoaded: Function;
  viewport: any;
  setViewport: ViewportChangeHandler;
  handleMapClick: Function;
  handleMouseMove?: Function;
}

const mapConf = Config.mapbox;
const { username, accessToken, keys } = mapConf;

const tileUrl = `https://api.mapbox.com/styles/v1/${username}/${keys.bright}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`

const Map = (props: IMapProps) => {
  const { map, setMap, setMapFullyLoaded, viewport, setViewport, handleMapClick, handleMouseMove } = props;

  const onMapLoad = () => {
    if (map) {
      if (!map.loaded() || !map.isStyleLoaded() || !map.areTilesLoaded()) {
        setTimeout(onMapLoad, 100);
      } else {
        setMapFullyLoaded(true);
      }
    }
  };

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
        <Marker position={[39.988239, -105.081343]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
  );
}

export default Map;
