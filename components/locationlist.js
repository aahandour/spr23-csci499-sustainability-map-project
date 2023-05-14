import React from 'react';
import Navbarnew from "../navbar2"
import './locationlist.css'
import Record from './onelocationrecord'



const Location = () =>{
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