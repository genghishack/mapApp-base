import React from 'react';
import {Marker, useMap} from "react-leaflet";
import {LatLngExpression} from "leaflet";

interface IMarkers {
  markers: any;
  onMarkerClick: Function;
  setMap: Function;
}

const Markers = (props: IMarkers) => {
  const {markers, onMarkerClick, setMap} = props;
  const map = useMap()
  setMap(map);

  return (
    <>
      {markers.map((marker) => {
        if (marker.lat) {
          const latlng: LatLngExpression = [marker.lat, marker.lng];
          return (
            <Marker
              key={marker.id}
              position={latlng}
              eventHandlers={{
                click: (e) => {
                  onMarkerClick(e, marker);
                }
              }}
            >
              {/*<Popup>{marker.name_json.first} {marker.name_json.last}</Popup>*/}
            </Marker>
          )
        } else {
          return null;
        }
      })}
    </>
  );
}

export default Markers;
