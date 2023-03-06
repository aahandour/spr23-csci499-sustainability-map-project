import React, { useState, useEffect } from 'react';
import './App.css';

import { GoogleMap, useLoadScript, MarkerF, Autocomplete } from "@react-google-maps/api";

let center = {lat: 40.761545, lng: -73.975038}//(default center, 5th Ave 55th St area)
let reviews = [{name: "Vivienne Westwood New York", stars: 3, place_id: "ChIJp7KTAPtYwokRDJKEQqB_y44"}, {name: "ya", stars: 3, place_id: "agrgrae"}];
//these ideally should be saved in MongoDB, and loaded in by calling the backend upon starting the app.

function App() {

  let [map, setMap] = useState(/**@type google.maps.Map*/(null));
  let [userInput, setUserInput] = useState('');
  let [markers, setMarkers] = useState([]);
  //let [markers, setMarkers] = useState(/**@type google.maps.Marker*/([]));
  let [userLocation, setUserLocation] = useState(/**@type google.maps.LatLng*/(null));

  //let [reviews, setReviews] = useState([]);
  //these ideally should be saved in MongoDB, and loaded in by calling the backend upon starting the app.

  useEffect(() => {
    
    searchLocation();

  }, [userLocation]) //calls searchLocation only once userLocation is updated

  useEffect(() => {
    
    //searchLocation();
    /*for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].position.lat == markers[markers.length-1].position.lat && reviews[i].position.lng == markers[markers.length-1].position.lng) {
        markers[markers.length-1]

        let infoText;*/
        /*if (markers[markers.length-1].stars == null) {
          infoText =
            '<div>' +
            "<p><a>Submit Sustainability Data</a></p>" +
            "</div>";
        }
        else {*/
        /*  infoText ='<div><p>';
          for (let i = 0; i < markers[markers.length-1].stars; i++) {
            infoText += "☆";
          }
          infoText += "<p><a>View Detailed Reviews</a></p></div>";
        }
          const infowindow = new window.google.maps.InfoWindow({
            content: infoText,
            ariaLabel: markers[markers.length-1].name,
          });
          markers[markers.length-1].addListener("click", () => {
            infowindow.open({
              anchor: markers[markers.length-1],
              map,
            });
          });*/
      //}
    //}
    /*for (let i = 0; i < reviews.length; i++) {
      if (markers[markers.length-1].place_id == reviews[i].place_id) {
        console.log("true");
      }
      else {
        console.log("false");
      }
    }*/

    //if (markers.length > 0) {console.log(markers[0].place_id)}
    //else {console.log("empty")};
    //console.log(reviews[0].place_id);

    for (let i = 0; i < reviews.length; i++) {
      if (markers.length!= 0 && markers[(markers.length)-1].place_id == reviews[i].place_id) {
        console.log("match");

        
      }
    }
    //console.log(markers[markers.length-1].position.lat);
    //console.log(markers[markers.length-1].position.lng);
    //console.log(markers);

  }, [markers]) //adds infowindow data to a newly added marker


  /*START NEARBY CLOTHING STORES LOCATOR**************************************************************************************************/
  let searchLocation = async () => {

    if (markers.length != 0) {setMarkers([]);} //remove markers placed from previous search

    const request = { //location is a LatLng object not literal
      location: userLocation,
      radius: '20', //70 is better for demonstration but uses more requests..
      type: ['clothing_store'],
    };
    
    var service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(request, function(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let locationResults = [];

        for (var i = 0; i < results.length; i++) {

          //**INFOWINDOWS**//
          /*const marker = new window.google.maps.Marker({
            position: results[i].geometry.location,
            map,
            title: results[i].name,
          });*/


          /*const infoText =
            '<div>' +
            "<p><a>Submit Sustainability Data</a></p>" +
            "</div>";
          const infowindow = new window.google.maps.InfoWindow({
            content: infoText,
            ariaLabel: results[i].name,
          });
          marker.addListener("click", () => {
            infowindow.open({
              anchor: marker,
              map,
            });
          });*/

          //**INFOWINDOWS**//

          locationResults.push(results[i]/*marker*/); //push marker objects instead?
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
            {markers.map(e => <MarkerF position={e.geometry.location}></MarkerF>)}
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