import React, { useState }  from 'react';
import {getLocationReviews, postLocationReview, onLogin, deleteReview, favoriteLocation, getUserFavoriteLocations} from '../backendwrappers';
import { useAuth0 } from '@auth0/auth0-react'

import './locationlist.css'
import Record from './onelocationrecord'
import {Onelocationrecord} from './onelocationrecord2'


const Location = () =>{
  const { isAuthenticated, loginWithRedirect, user, getIdTokenClaims} = useAuth0()
  let [store,setStore ] = useState([]);
  // let [storeid,setStoreid ] = useState([]);

  async function handlecheck(){
    const id = await getIdTokenClaims();
    console.log(id.__raw)
    let store_data= await getUserFavoriteLocations(user.sub,id.__raw);
    let favorite=[]
    let favoriteid=[]
    // console.log(store_data.favorites)
    console.log(store_data.favorites)
    for(let i=0; i<store_data.favorites.length; i++)
    {
      // favorite.push(store_data.favorites[i].name)
      // favoriteid.push(store_data.favorites[i]._id)
      favorite.push(store_data.favorites[i])
    }
    console.log(favorite)
    console.log(favorite[0])
    console.log(favorite[0]._id)
    // console.log(favoriteid)
    setStore(favorite)
    // setStoreid(favoriteid)
    // console.log(favorite[0][1])
  }
  if(store.length>0)
  {
    return (
      <div>
        <div className='textpart'>
            <h3>Your favourite location of clothing store</h3>
            <button onClick={handlecheck}>check store list</button>
            <hr />
        </div>
        {
          store.map(e=>Onelocationrecord(e))
        }
        
      </div>
    );
  }
  else{
    return (
      <div>
        <div className='textpart'>
            <h3>Your favourite location of clothing store</h3>
            <button onClick={handlecheck}>check store list</button>
            <hr />
        </div>
        <div>
          <Record/>
        </div>
        <div>
          <Record/>
        </div>
        <div>
          <Record/>
        </div>
        <div>
          <Record/>
        </div>
        <div>
          <Record/>
        </div>
      </div>
    );
    }
  }
  export default Location;