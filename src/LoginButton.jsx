import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'

/*
const [insert name] = ({}) => {

}

export default [insert name];
*/

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()
    return (
        <div className='login-button'>
            <button onClick={() => loginWithRedirect()}>Login or sign up</button>
        </div>
    )
}

export default LoginButton;