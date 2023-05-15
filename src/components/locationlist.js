import React, { useState }  from 'react';
import { getUser, getLocationReviews, postLocationReview, deleteReview} from '../backendwrappers';
import { useAuth0 } from '@auth0/auth0-react'

import './locationlist.css'
import Record from './onelocationrecord'



const Location = () =>{
  const { isAuthenticated, loginWithRedirect, user, getIdTokenClaims} = useAuth0()

    return (
      <div>
        <div className='textpart'>
            <h3>Your favourite location of clothing store</h3>
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
  export default Location;