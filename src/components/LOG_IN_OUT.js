import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import '../App.css';
import LoginButton from "../LoginButton";
import LogoutButton from '../logoutButton';

const LOG_IN_OUT = ({isAuthenticated}) => {
    if(isAuthenticated){
      return (
        <LogoutButton/>
      )
    }
    else if(!isAuthenticated){
      return <LoginButton/>
    }
  }

  export default LOG_IN_OUT;