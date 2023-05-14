import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'

import "./Profile.css"
import "../App.css"
import userpicture from '../images/user.png'
import Location from "./locationlist"
import Menu from "../Menu";
import LOG_IN_OUT from "./LOG_IN_OUT";
import MenuButton from "../MenuButton";



const Profile = () =>{
    let [fullname,setFullname ] = useState('jose');
    let [email,setEmail ] = useState('123@gmail.com');
    let [password,setPassword ] = useState('*********');
    let [updatepassword,setUpdatepassword ] = useState('');
    let [birthofdate,setBirthofdate ] = useState('Unkown');
    let [age,setAge ] = useState('Unkown');
    let [sex,setSex ] = useState('Unkown');
    
    let [showMenu, setShowMenu] = useState(false);

    const {isAuthenticated, getIdTokenClaims} = useAuth0()
    return (
        <div> 
            <div className = "navbar">
                <LOG_IN_OUT isAuthenticated={isAuthenticated}/>
                <p>Nearby Clothing Store Sustainability Map</p>
                {/* I intended for the menu to hold the navigation for different user things like "profile" or "favorites" */}
                <MenuButton showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>
            <Menu showMenu={showMenu} isAuthenticated={isAuthenticated}/>
        <div className='Profilepage'>
            <div>
            <div>
                <h3>Your Profile</h3>
                <hr />
                <div className='rowforprofile'>
                    <img src={userpicture}/>
                    <div className='firstcolumntextforprofile' >
                        <p className='textforprofile'>full name: {fullname}</p>
                        
                        <p className='textforprofile'>email: {email}</p>
                        
                        <p className='textforprofile'>password: {password}</p>
                    </div>
                    <div className='firstcolumntextforprofile' >
                        <p className='textforprofile'>birth of date: {birthofdate}</p>
                        
                        <p className='textforprofile'>age: {age}</p>
                        
                        <p className='textforprofile'>sex: {sex}</p>
                    </div>
                    <div className='modify_information_button'>
                        <p></p>
                        <button>Modify information</button>
                    </div>
                </div>
                <hr/>
                <Location/>
                <hr/>
                {/* <div className='profileStyle'>
                    <div className='profileform'>
                        <label>full name</label>
                        
                    </div>
                    <div>
                        <label >phone</label>
                    </div>
                    <div>
                        <label >email</label>
                    </div>
                    <div>
                        <label >password</label>
                    </div>
                    <div>
                        <label >history of comment</label>
                    </div>
                    <div>
                        <label >history of address</label>
                    </div>

                </div> */}
            </div>
            </div>
        </div>
      </div>
    );
  }
  export default Profile;