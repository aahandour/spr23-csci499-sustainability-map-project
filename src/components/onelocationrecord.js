import React, { useState } from 'react';
import './Onelocationrecord.css'
import { useAuth0 } from '@auth0/auth0-react';
import { getLocationReviews, postLocationReview, deleteUserFavoriteLocation } from '../backendwrappers';

function Onelocationrecord(prop){
    const { isAuthenticated, loginWWithRedirect, user, getIdTokenClaims } = useAuth0()

    async function RemoveStore(place_id) {
        const id = await getIdTokenClaims()
        deleteUserFavoriteLocation(user.sub, place_id, id.__raw)
        .then(() => {
            console.log('Removed successfully')
        })
        .catch(err => console.log(err))
    }
    return(
        <>
        <div className='location_container'>
            <div>
                <p className='textforprofile'>Store Name: {prop.name}</p>
                        
                {/*<p className='textforprofile'>Rating: </p>*/}
            </div>
            <div>
                <div className='small_button_container'>
                    <button onClick={() => RemoveStore(prop.place_id)}>Remove</button>
                </div>
            </div>
        </div>
        <hr/>
        </>
    )
   }
   
   export {Onelocationrecord};
