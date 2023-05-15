import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
      domain='dev-ubcl3tm5kmtrgusg.us.auth0.com'
      clientId='d8ovIRGjor0rNrMrNsG3M73SA3wYgBQp'
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      useRefreshTokens={true}
      cacheLocation='localstorage'>
      <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

