import React, { useState, useEffect } from 'react';
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
  -> https://stackoverflow.com/questions/20916221/getting-latitude-and-longitude-from-google-places-search-api-using-javascript
  -> https://stackoverflow.com/questions/8437897/push-new-latlng-in-google-maps
*/
//maybe save up to 5 recent searches, and keep the data to avoid more api calls?

let center = {lat: 40.761545, lng: -73.975038}//(for testing, 5th Ave 55th St area)
//var testLoc = 

function App() {

  let [map, setMap] = useState(/**@type google.maps.Map*/(null));
  let [userInput, setUserInput] = useState(''); //this has a flaw where you could technically search for incomplete places(?)
  let [markers, setMarkers] = useState([]);

  //let [status, setStatus] = useState(0); //for forcing updates

  let [userLocation, setUserLocation] = useState(/**@type google.maps.LatLng*/(null)); //not updating!! I think the issue is the method here

  /*let [userLat, setUserLat] = useState(40.761545); //place.geometry.location.lat()
  let [userLng, setUserLng] = useState(-73.975038); //place.geometry.location.lng()*/

  //let [userLocation, setUserLocation] = useState(/**@type google.maps.LatLng*/(null)); //not updating!! I think the issue is the method here

  //useEffect(() => {
    /*center = map.getCenter();*/
    //call function once map.center changes
    //searchLocation();

  //}, [map.center])


  useEffect(() => {
    /*center = map.getCenter();*/
    //call function once map.center changes

    //console.log(map.getCenter());
    //map.setCenter(map.getCenter());
    
    searchLocation();

  }, [userLocation]) //calls searchLocation only once userLocation is updated


  /*START NEARBY CLOTHING STORES LOCATOR*********************************/
  let searchLocation = async () => {

    //buggy
    //await userInputToCoordinates(); //POINT OF INTEREST
    if (markers.length != 0) {setMarkers([]);} //remove markers placed from previous search

    /*console.log(userLat);
    console.log(userLng);
    var userCoordinates = new window.google.maps.LatLng(userLat, userLng);*/
    //buggy
    //console.log(userLocation);

    //findPlaceFromQuery returns only one result

    const request = { //location is a LatLng object not literal
      location: userLocation, /*doesn't update in time for search??*/
      radius: '70',
      type: ['clothing_store'],
    };
    
    var service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(request, function(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let locationResults = [];

        for (var i = 0; i < results.length; i++) {
          locationResults.push(results[i]);
        }
        setMarkers(locationResults);
        //map.setCenter(results[0].geometry.location);
        console.log("searchLocation called");
      }
    });
  }
  /*END NEARBY CLOTHING STORES LOCATOR*********************************/



  /*START USER INPUT TO COORDINATES*********************************/
  async function userInputToCoordinates() {

    const request = {
      query: userInput,
      fields: ["name", "geometry"],
    };

    var service = new window.google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let locationResults = [];

        for (var i = 0; i < results.length; i++) {
          locationResults.push(results[i]); //returns only one
        }
        /*setMarkers(locationResults);*/

        //setUserLocation(results[0].geometry.location); //POINT OF INTEREST //LatLng object
        /*setUserLat(locationResults[0].geometry.location.lat());
        setUserLng(locationResults[0].geometry.location.lng());*/

        //console.log(results[0].geometry.location.lat());
        //console.log(results[0].geometry.location.lng());
        map.setCenter(results[0].geometry.location);

        let userCoordinates = new window.google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        console.log("userInputToCoordinates called");
        setUserLocation(userCoordinates);

        //console.log(userCoordinates.lat()); //works...
        //console.log(userCoordinates.lng());

        //center = userCoordinates;
        
        //console.log(locationResults[0].geometry.location)
      }
    });

    /*await searchLocation();*/

  }
  /*END USER INPUT TO COORDINATES*********************************/



  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  //const googleMapsRef = React.useRef<GoogleMap | null>(null);

  if (!isLoaded) return <div>loading...</div>;

  return (
    <div>
      <Autocomplete><input type="text" onChange={ e => setUserInput(e.target.value)}></input></Autocomplete>

      <button onClick={ /*searchLocation*/ userInputToCoordinates }>Search</button>

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
