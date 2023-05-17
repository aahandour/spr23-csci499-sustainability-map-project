import React, { useState }  from 'react';
import {getUserFavoriteLocations} from '../backendwrappers';
import { useAuth0 } from '@auth0/auth0-react'

import './locationlist.css'
import Record from './onelocationrecord'
import {Onelocationrecord} from './onelocationrecord'


const Location = () =>{
  const { isAuthenticated, loginWithRedirect, user, getIdTokenClaims} = useAuth0()
  const [store, setStore] = useState([]);

  async function handlecheck(){
    const id = await getIdTokenClaims();
    await getUserFavoriteLocations(user.sub,id.__raw)
    .then((res) => {
      setStore(res.favorites)
    });

  }
  if(store)
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
}

export default Location;