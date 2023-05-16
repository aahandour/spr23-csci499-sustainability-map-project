import React, { useState }  from 'react';
import {getLocationReviews, postLocationReview, onLogin, deleteReview, favoriteLocation, getUserFavoriteLocations} from '../backendwrappers';
import { useAuth0 } from '@auth0/auth0-react'

import './locationlist.css'
import Record from './onelocationrecord'
import {Onelocationrecord} from './onelocationrecord2'


const Location = () =>{
  const { isAuthenticated, loginWithRedirect, user, getIdTokenClaims} = useAuth0()
  let [store,setStore ] = useState([]);

  async function handlecheck(){
    const id = await getIdTokenClaims();
    let store_data= await getUserFavoriteLocations(user.sub,id.__raw);
    let favorite=[]
    // console.log(store_data.favorites)
    console.log(store_data.favorites)
    for(let i=0; i<store_data.favorites.length; i++)
    {
      favorite.push(store_data.favorites[i].name)
    }
    console.log(favorite)
    setStore(favorite)
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