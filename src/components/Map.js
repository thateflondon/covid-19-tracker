import React from "react";
import "../style/Map.css";
//import "leaflet/dist/leaflet.css";
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function ChangeMapView({ coords, zoom }) {
  const map = useMap();
  map.setView([coords.lat, coords.lng], zoom);

  return null;
}

function Map({ center, zoom }) {
  return (
    <div className="map">
      {/*<h1>The map goes here !</h1>*/}
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeMapView coords={center} zoom={zoom} />
      </LeafletMap>
    </div>
  );
}

export default Map;
