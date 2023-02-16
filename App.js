import React, { useState } from 'react';
import './App.css';

import { GoogleMap, useLoadScript, MarkerF, Autocomplete } from "@react-google-maps/api";

/*References: 
  -> https://www.npmjs.com/package/@react-google-maps/api
  -> https://www.youtube.com/watch?v=iP3DnhCUIsE&t=1521s
  -> https://developers.google.com/maps/documentation/places/web-service/supported_types
  -> https://developers.google.com/maps/documentation/javascript/places#place_search_requests
  -> https://developers.google.com/maps/documentation/javascript/places#place_search_fields
  -> https://developers.google.com/maps/documentation/places/web-service/details (PlacesDetailsResponse, #Place and #Geometry)
  -> https://developers.google.com/maps/documentation/javascript/reference/places-service#LocationBias
  -> https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions
  -> https://developers.google.com/maps/documentation/javascript/examples/circle-simple
  (Errors)
  -> https://stackoverflow.com/questions/50548632/react-google-maps-google-is-not-defined-error
  -> https://stackoverflow.com/questions/72112491/marker-not-showing-react-google-maps-api-on-localhost-next-js
  -> https://stackoverflow.com/questions/48378337/create-react-app-not-picking-up-env-files
*/
//maybe save up to 5 recent searches, and keep the data to avoid more api calls?

const center = {lat: 40.761545, lng: -73.975038}//(for testing, 5th Ave 55th St area)

function App() {

  let [map, setMap] = useState(/**@type google.maps.Map*/(null));
  let [userInput, setUserInput] = useState(''); //this has a flaw where you could technically search for incomplete places(?)
  let [markers, setMarkers] = useState([]);

  let [userLocation, setUserLocation] = useState([]);


  let searchLocation = async () => {

    /*Circle*/
    //let searchRadius = new window.google.maps.Circle({center: center, radius: 20, map: map});
    /**/

    //findPlaceFromQuery returns only one result
    if (markers.length != 0) {setMarkers([]);} //remove markers placed from previous search

    const request = {
      //query: "clothing store"/*'Museum of Contemporary Art Australia'*/,
      /*fields: ["name", "geometry"],
      locationBias: searchRadius,*/
      location: center,
      radius: '70',
      type: ['clothing_store'],
    };
    
    var service = new window.google.maps.places.PlacesService(map);

    /*service.findPlaceFromQuery(request, function(results, status) {*/
    service.nearbySearch(request, function(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let locationResults = [];

        for (var i = 0; i < results.length; i++) {
          /*createMarker(results[i]);*/
          locationResults.push(results[i]);
        }
        setMarkers(locationResults);
        //map.setCenter(results[0].geometry.location);
        console.log("second function called");
      }
    });
  }

  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  //const googleMapsRef = React.useRef<GoogleMap | null>(null);

  if (!isLoaded) return <div>loading...</div>;

  return (
    <div>
      <Autocomplete><input type="text" onChange={ e => setUserInput(e.target.value)}></input></Autocomplete>

      <button onClick={ searchLocation }>Search</button>
      <div className = "map">
          <GoogleMap 
          zoom={19} 
          center={center} 
          mapContainerClassName="map-container" 
          options={{disableDefaultUI: true, clickableIcons: false}}
          onLoad={(map) => setMap(map)} /*onLoad function returns map object, set map to state variable to access it*/
          >
            {/*<MarkerF position={center}></MarkerF>*/}
            {markers.map(e => <MarkerF position={e.geometry.location}></MarkerF>)}
          </GoogleMap>
        </div>
    </div>
  );
}

export default App;
