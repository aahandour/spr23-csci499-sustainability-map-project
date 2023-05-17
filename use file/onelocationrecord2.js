import React, { useState } from 'react';
import './Onelocationrecord.css'
import { useAuth0 } from "@auth0/auth0-react"
import {getLocationReviews, postLocationReview,  deleteUserFavoriteLocation} from '../backendwrappers'


function Onelocationrecord(prop){
    const { isAuthenticated, loginWithRedirect, user, getIdTokenClaims} = useAuth0()

    async function Removestore(place_id){
        const id = await getIdTokenClaims();
        console.log(id.__raw);
        
        deleteUserFavoriteLocation(user.sub, place_id, id.__raw)
        .then(() => {
            console.log('success remove')
        })
        .catch((error) => console.log(error))
        // console.log(prop)
    }


    console.log(prop)

    return(
        <>
        <div className='location_container'>
            <div>
                <p className='textforprofile'>location: {prop.name} </p>
                        
                <p className='textforprofile'>star: </p>
            </div>
            <div>
                <div className='small_button_container'>
                    <button onClick={() => Removestore(prop._id)}>remove</button>
                </div>
            </div>
        </div>
        <hr/>
        </>
    )
   }
   
   export {Onelocationrecord};