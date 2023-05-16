import React, { useState } from 'react';
import './Onelocationrecord.css'

function Onelocationrecord(){
    return(
        <>
        <div className='location_container'>
            <div>
                <p className='textforprofile'>location: </p>
                        
                <p className='textforprofile'>star: </p>
            </div>
            <div>
                <div className='small_button_container'>
                    <button>remove</button>
                </div>
            </div>
        </div>
        <hr/>
        </>
    )
   }
   
   export default Onelocationrecord;