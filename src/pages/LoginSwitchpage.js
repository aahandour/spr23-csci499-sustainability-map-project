import React, { useState } from 'react';
import "./form-for-switch.css"
import  Login  from "./Login"
import  Register  from "./Register"
import Navbar from "../navbar"
const LoginSwitchpage = () =>{
    const [currentForm, setCurrentForm]=useState('login');
    const toggleForm = (formName) => {
      setCurrentForm(formName)
    }
    return (
        <div>
            <Navbar/>
            <div className="form-for-switch">
                {
                    currentForm === 'login' ? <Login onFormSwitch={toggleForm}/>:<Register onFormSwitch={toggleForm}/>
                }
            </div>
        </div>
    );
}
export default LoginSwitchpage;