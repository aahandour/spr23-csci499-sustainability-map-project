import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
//import HomeAfterLogin from "./components/HomeAfterLogin"


const Login = (props) =>{
  let [email, setEmail]=useState('');
  let [password, setPassword]=useState('');
  let [logins, setLogins]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  const navigate = useNavigate()

  function determineLogin(){
    {
      email === '123@gmail.com'&& password === '123' ? logins = 'true' : logins = 'false' 
    }
  }

  function handleClick(){
    {
      determineLogin();
      logins === 'true' ? navigate('/H'):navigate('/')
    }
    // navigate('/H')
  }

  return (
    <div className="form-container">
      <h3>Login</h3>
      <div className="form-for-login">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
          <label htmlFor="password">password</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
          <button onClick={handleClick}>Log In</button>
        </form>
        <button className="link-button" onClick={()=>props.onFormSwitch('register')}>Don't have an account? Register here.</button>
      </div>
    </div>
  );
}
export default Login;