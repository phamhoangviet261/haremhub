import React, {useState} from 'react';
// import Map, {ScaleControl, NavigationControl, AttributionControl} from 'react-map-gl';

function MyMap() {
    const [longitude, setLongitude] = useState(108.182503)
    const [latitude, setLatitude] = useState(12.515564)
    const [zoom, setZoom] =useState(7)
  return (
//     <Map
//     initialViewState={{
//       longitude: longitude,
//       latitude: latitude,
//       zoom: zoom
//     }}
//     style={{width: '60vw', height: '60vh', color: 'white'}}
//     mapStyle="mapbox://styles/mapbox/streets-v9"
//     mapboxAccessToken="pk.eyJ1Ijoic2hpcm92diIsImEiOiJja3psZ3Q0bnk1MjlwMm9wNGJ4bDh3Ym9tIn0.5JWFdwaVYiINGqhK8W-4Lw"
//     attributionControl={false}
//   >
//       <NavigationControl />
//       <ScaleControl />
//       <AttributionControl customAttribution="Map design by me" />
//   </Map>
    <>map</>
  )
}

export default MyMap