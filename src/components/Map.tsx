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

  return (
      <MapContainer
          center={[38.0, -96.0]}
          zoom={5}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '900px' }}
      >
        <TileLayer
            url={`https://api.mapbox.com/styles/v1/genghishack/cjft3tbmb7qyr2sqclts2rz62/tiles/256/{z}/{x}/{y}@2x?access_token=${mapConf.accessToken}`}
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
