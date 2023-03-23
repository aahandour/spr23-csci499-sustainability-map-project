import React, { useState, useEffect } from 'react';
import './App.css';

import { GoogleMap, useLoadScript, MarkerF, Autocomplete } from "@react-google-maps/api";

let center = {lat: 40.761545, lng: -73.975038}//(default center, 5th Ave 55th St area)
let reviews = [{name: "Vivienne Westwood New York", stars: 3, place_id: "ChIJp7KTAPtYwokRDJKEQqB_y44"}];
//these ideally should be saved in MongoDB, and loaded in by calling the backend upon starting the app.

//*take in reviews, display associated reviews when toggled, on map display average star rating (take the average)

function App() {

  let [map, setMap] = useState(/**@type google.maps.Map*/(null));
  let [userInput, setUserInput] = useState('');
  //let [markers, setMarkers] = useState([]);
  let [markers, setMarkers] = useState(/**@type google.maps.Marker*/([]));
  let [userLocation, setUserLocation] = useState(/**@type google.maps.LatLng*/(null));

  //let [reviews, setReviews] = useState([]);
  //these ideally should be saved in MongoDB, and loaded in by calling the backend upon starting the app.

  useEffect(() => {
    //https://developers.google.com/maps/documentation/javascript/reference/marker#Marker.setMap
    for (let i = 0; i < markers.length; i++) { //clear previous markers
      markers[i].setMap(null);
    }
    setMarkers([]);

    searchLocation();

  }, [userLocation]) //calls searchLocation only once userLocation is updated

  /*START NEARBY CLOTHING STORES LOCATOR**************************************************************************************************/
  let searchLocation = async () => {

    const request = { //location is a LatLng object not literal
      location: userLocation,
      radius: '20', //70 is better for demonstration but uses more requests..
      type: ['clothing_store'],
    };
    
    var service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(request, function(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let locationResults = [];

        for (var i = 0; i < results.length; i++) {//search for each result within the reviews, display associated data (if it exists).

          //**INFOWINDOWS**//
          //(It's kind of a minor issue in terms of just demonstrating the main functions, but I need to add a method to remove markers placed from previous searches)
          let match = false;
          for (let j = 0; j < reviews.length; j++) {
            if (results[i].place_id == reviews[j].place_id) {
              console.log("match");
              match = true;

              let star_string = "";
              for (let k = 0; k < reviews[j].stars; k++) {
                star_string += "★";
              }

              const marker = new window.google.maps.Marker({
                position: results[i].geometry.location,
                map,
                title: results[i].name,
              });

              const infoText = '<div>' + "<p>" + star_string + "</p>" + "</div>";
              //add some link or component to allow users to view & submit detailed reviews here (in infoText)

              const infowindow = new window.google.maps.InfoWindow({
                content: infoText,
              });
              marker.addListener("click", () => {
                infowindow.open({
                  anchor: marker,
                  map,
                });
              });

              locationResults.push(marker);//*
            }
          }

          if (match == false) {
            const marker = new window.google.maps.Marker({
              position: results[i].geometry.location,
              map,
              title: results[i].name,
            });

            const infoText = '<div>' + "<p>" + "No Review Data" + "</p>" + "</div>";
            //add some link or component to allow users to view & submit detailed reviews here (in infoText)

            const infowindow = new window.google.maps.InfoWindow({
              content: infoText,
            });
            marker.addListener("click", () => {
              infowindow.open({
                anchor: marker,
                map,
              });
            });

            locationResults.push(marker);//*
          }

          //**INFOWINDOWS**//

          //locationResults.push(/*results[i]*/marker); //push marker objects instead?
        }
        //setMarkers(locationResults);
        setMarkers(locationResults);
        //map.setCenter(results[0].geometry.location);
        console.log("searchLocation called");
      }
    });
  }
  /*END NEARBY CLOTHING STORES LOCATOR**************************************************************************************************/



  /*START USER INPUT TO COORDINATES**************************************************************************************************/
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
          locationResults.push(results[i]); //findPlaceFromQuery returns only one
        }
        /*setMarkers(locationResults);*/
        map.setCenter(results[0].geometry.location);

        let userCoordinates = new window.google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        console.log("userInputToCoordinates called");
        setUserLocation(userCoordinates);
      }
    });
  }
  /*END USER INPUT TO COORDINATES**************************************************************************************************/



  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

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
            {/*markers.map(e => <MarkerF position={e.geometry.location}></MarkerF>)*/}
          </GoogleMap>
        </div>
    </div>
  );
}

export default App;
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
  -> https://stackoverflow.com/questions/54545979/google-maps-latlng-vs-google-maps-latlngliteral
  -> https://stackoverflow.com/questions/68048432/how-can-i-pass-the-value-of-setstate-on-googlemap-api-function-initialcenter
  -> https://stackoverflow.com/questions/9810624/how-to-get-coordinates-of-the-center-of-the-viewed-area-in-google-maps-using-goo
  -> https://blog.logrocket.com/useeffect-hook-complete-guide/
  -> https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLng
  -> https://developers.google.com/maps/documentation/places/web-service/details#Geometry
  -> https://developers.google.com/maps/documentation/javascript/infowindows
  -> https://stackoverflow.com/questions/50548632/react-google-maps-google-is-not-defined-error
  -> https://stackoverflow.com/questions/72112491/marker-not-showing-react-google-maps-api-on-localhost-next-js
  -> https://stackoverflow.com/questions/48378337/create-react-app-not-picking-up-env-files
  -> https://stackoverflow.com/questions/20916221/getting-latitude-and-longitude-from-google-places-search-api-using-javascript
  -> https://stackoverflow.com/questions/8437897/push-new-latlng-in-google-maps
*/