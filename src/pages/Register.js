import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register = (props) =>{
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [name, setName]=useState('');
  let [registers, setRegister]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }
  const navigate = useNavigate()

  function determineLogin(){
    {

      name === ''|| password === '' || email === '' ? registers = 'false' : registers = 'true';
      registers === 'false' ?  registers = 'false' : email === '132@gmail.com' ? registers = 'false' : registers = 'true'  
    }
  }

  function handleClick(){
    {
      determineLogin();
      registers === 'true' ? navigate('/login'): navigate('/')
    }
    // navigate('/H')
  }
  return (
    <div className="form-container">
      <h3>Register</h3>
      <div className="form-for-resigeter">
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} type="name" placeholder="full name" id="name" name="name" />
          <label htmlFor="email">email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
          <label htmlFor="password">password</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
          <button onClick={handleClick}>Register</button>
        </form>
        <button className="link-button" onClick={()=>props.onFormSwitch('login')}>Already have an account? Login here.</button>
      </div>
    </div>
  );
}
export default Register;