import React from 'react';
import Greet from './Welcome'
import Map from "../App2"
import Navbarnew from "../navbar2"
const HomeAfterLogin = () =>{
  return (
    <div>
      <div>
      <Navbarnew/>
      <Greet />
      <Map />
      </div>
    </div>
  );
}
export default HomeAfterLogin;