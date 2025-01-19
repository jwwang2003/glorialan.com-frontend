"use client"

import { useState, MouseEvent } from 'react';
import Map, { NavigationControl, Marker, MapEvent } from 'react-map-gl/maplibre';

interface MapParam {
  map_id: string;
  map_key: string;
}

interface MarkerData {
  longitude: number;
  latitude: number;
  label: string;
}

export default function MapRoot({ map_id, map_key }: MapParam) {
  // Some example coordinates for popular places
  const [markers, setMarkers] = useState<MarkerData[]>([
    { longitude: 2.2945, latitude: 48.8584, label: 'Eiffel Tower' },
    { longitude: -74.0445, latitude: 40.6892, label: 'Statue of Liberty' },
    { longitude: 31.1342, latitude: 29.9792, label: 'Pyramids of Giza' },
    { longitude: 78.0421, latitude: 27.1751, label: 'Taj Mahal' },
    { longitude: 8.9824, latitude: 79.5199, label: 'Panama City' }
  ]);

  // Handler for dynamically placing a new marker where the user clicks
  const handleMapClick = (event: MapEvent<MouseEvent>) => {
    const { lngLat } = event;
    // Append a new marker with a generic label
    setMarkers((prev) => [
      ...prev,
      {
        longitude: lngLat[0],
        latitude: lngLat[1],
        label: 'New Place',
      }
    ]);
  };

  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 27.5,
        zoom: 1,
      }}
      style={{ width: '100%', height: '100%', zIndex: 0 }}
      mapStyle={`https://api.maptiler.com/maps/${map_id}/style.json?key=${map_key}`}
      scrollZoom={false}
      onClick={handleMapClick}
    >
      <NavigationControl />

      {markers.map((marker, idx) => (
        <Marker
          key={idx}
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
        >
          {/* You could replace this with a custom pin icon, etc. */}
          <div style={{ color: 'red' }}>📍 {marker.label}</div>
        </Marker>
      ))}
    </Map>
  );
}
