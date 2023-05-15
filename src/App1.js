import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import './App.css';

import UserReviewsPage from "./userReviewsPage";
import LoginButton from "./LoginButton";
import LogoutButton from './logoutButton';
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import Welcome from "./components/WelcomeHome"

import { GoogleMap, useLoadScript, MarkerF, Autocomplete } from "@react-google-maps/api";
import { getLocationReviews, onLogin, postLocationReview } from './backendwrappers';

/* 
  Default center set to 5th Ave 55th St Area
*/
let center = {lat: 40.761545, lng: -73.975038}

function App() {

  let [showMenu, setShowMenu] = useState(false);

  let [map, setMap] = useState(/**@type google.maps.Map*/(null));
  let [userInput, setUserInput] = useState('');
  let [markers, setMarkers] = useState(/**@type google.maps.Marker*/([]));
  let [userLocation, setUserLocation] = useState(/**@type google.maps.LatLng*/(null));

  /* Holds information relating to last clicked place marker */
  let [targetStoreId, setTargetStoreId] = useState('');
  let [targetStoreName, setTargetStoreName] = useState('');

  /* Passed to user reviews component */
  let [toggleUserReviews, setToggleUserReviews] = useState(false);
  let [avgStars, setAvgStars] = useState(0);
  let [reviewInput, setReviewInput] = useState('');
  const [reviews, setReviews] = useState([]);

  const {isAuthenticated, getIdTokenClaims} = useAuth0()

  const LOG_IN_OUT = () => {
    if(isAuthenticated){
      return (
        <LogoutButton/>
      )
    }
    else if(!isAuthenticated){
      return <LoginButton/>
    }
  }

  useEffect(() => {
    if(isAuthenticated){
      const id_token = getIdTokenClaims().then(response => {
        onLogin(response.__raw)
        console.log(response)
      })
    }
  }, [isAuthenticated])


  /*
    Referenced: https://stackoverflow.com/questions/11378450/google-map-api-v3-how-to-add-custom-data-to-markers
  */
  useEffect(() => {

    setReviews([])
    console.log(targetStoreId);

    getLocationReviews(targetStoreId, targetStoreName)
    .then((response) => {
      console.log(response)
      setReviews(response)
    })
    .catch((error) => console.log(error))

    if (targetStoreId != '') {
      if (toggleUserReviews == false) {
        setToggleUserReviews(true);
      }
    }

  }, [targetStoreId])


  /* 
    Clears previous markers.

    Referenced: //https://developers.google.com/maps/documentation/javascript/reference/marker#Marker.setMap
  */
  useEffect(() => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);

    searchLocation();

  }, [userLocation]) /* (Calls searchLocation only once userLocation is updated) */


  //////////////NEARBY SEARCH//////////////////
  /* 
    Uses Maps Javascript API's Nearby Search service from the Places library to connect user-entered location to a place object.
  */
 /* Referenced: https://developers.google.com/maps/documentation/javascript/places#place_search_requests */
  let searchLocation = async () => {

    /* Request object to be passed to service

      location -> LatLng (not literal)
      radius -> in meters
      type -> string matching place types defined in documentation

    */
    const request = {
      location: userLocation,
      radius: '40',
      type: ['clothing_store'],
    };
    
    var service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(request, function(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let locationResults = [];
        let tempInfoWindows = [];

        for (var i = 0; i < results.length; i++) {

          const marker = new window.google.maps.Marker({
            position: results[i].geometry.location,
            map,
            pid: results[i].place_id, /* Stores place_id value from places result object */
            placeName: results[i].name, /* Stores name value from places result object */
          });

          marker.addListener("click", () => {

            setTargetStoreId(marker.pid);
            setTargetStoreName(marker.placeName);
          });

          locationResults.push(marker);
        }
        setMarkers(locationResults);
        console.log("searchLocation called");
      }
    });
  }
  /////////////////////////////////////


  //////////////FIND PLACE FROM QUERY//////////////////
  /* 
    Uses Maps Javascript API's Find Place from Query service from the Places library to return
    an array of clothing store place objects within a radius centered at the user location.
  */
  /* Referenced: https://developers.google.com/maps/documentation/javascript/places#place_search_requests */
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

        map.setCenter(results[0].geometry.location);

        let userCoordinates = new window.google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        console.log("userInputToCoordinates called");
        setUserLocation(userCoordinates);
      }
    });
  }
  /////////////////////////////////////


  //////////////GEOLOCATION//////////////////
  /*
    Referenced: https://developers.google.com/maps/documentation/javascript/geolocation
  */
  async function autoDetectUserLocation() {
  
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
            map.setCenter(pos);
            console.log("autoDetectUserLocation called");
            
            /* set pos to userLocation, automatically calls searchLocation because of useEffect */
            setUserLocation(pos);

          }
        );
      } else {
        // HTML5 geolocation fails
        alert("Browser doesn't support Geolocation");
      }
  }


  /*
    Referenced: https://www.youtube.com/watch?v=iP3DnhCUIsE&t=1521s
  */
  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  if (!isLoaded) return <div>loading...</div>;

  return (
    <div className = "container">

      <div className = "navbar">
        <LOG_IN_OUT/>
        <p>Nearby Clothing Store Sustainability Map</p>
        {/* I intended for the menu to hold the navigation for different user things like "profile" or "favorites" */}
        <MenuButton showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>

      <Menu showMenu={showMenu} isAuthenticated={isAuthenticated}/>

      <Welcome isAuthenticated={isAuthenticated}/>

      <div className = "search">
        <Autocomplete><input type="text" onChange={ input => setUserInput(input.target.value)}></input></Autocomplete>

        <button className = "search-button" onClick={ userInputToCoordinates }>Search</button>
        <button className = "geolocation-button" onClick={ autoDetectUserLocation }>Use Current Location</button>
      </div>

      <div className = "map">
          <GoogleMap 
          zoom={19} 
          center={center} 
          mapContainerClassName="map-container" 
          options={{disableDefaultUI: true, clickableIcons: false}}
          onLoad={(map) => setMap(map)} /* (onLoad function returns map object, set map to state variable to access it) */
          >
          </GoogleMap>
      </div>

      <UserReviewsPage targetStoreName={targetStoreName} setTargetStoreName={setTargetStoreName} reviewInput={reviewInput} setReviewInput={setReviewInput} avgStars={avgStars} setAvgStars={setAvgStars} targetStoreId={targetStoreId} reviews={reviews} setReviews={setReviews} toggleUserReviews={toggleUserReviews} setToggleUserReviews={setToggleUserReviews}/>

    </div>
  );
}

export default App;

/*
Misc. References: 
  -> https://www.npmjs.com/package/@react-google-maps/api
  -> https://developers.google.com/maps/documentation/places/web-service/supported_types
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