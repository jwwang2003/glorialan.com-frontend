"use client"

import Map, {NavigationControl} from 'react-map-gl/maplibre'

// https://api.maptiler.com/maps/f42c54f4-4980-45d3-8c56-9b5507cdb0e3/?key=7xjMkfdVRW7qr2HNUzWN#-0.2/0.00000/-38.87277

interface MapParam {
  map_id: string,
  map_key: string,
}

export default function MapRoot({ map_id, map_key }: MapParam) {
  // const map_api = `https://api.maptiler.com/maps/f42c54f4-4980-45d3-8c56-9b5507cdb0e3/style.json?key=7xjMkfdVRW7qr2HNUzWN`

  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 27.5,
        zoom: 1
      }}
      style={{ zIndex: 0 }}
      mapStyle={`https://api.maptiler.com/maps/${map_id}/style.json?key=${map_key}`}

      scrollZoom={false}
    >
      <NavigationControl />
    </Map>
  );
}