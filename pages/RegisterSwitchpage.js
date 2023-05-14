import React, { useState } from 'react';
import  Login  from "./Login"
import  Register  from "./Register"
import Navbar from "../navbar"
const RegisterSwitchpage = () =>{
    const [currentForm, setCurrentForm]=useState('register');
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
export default RegisterSwitchpage;