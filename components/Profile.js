import React, { useState } from 'react';
import Greet from './Welcome'
import Map from "../App2"
import Navbarnew from "../navbar2"
import "./Profile.css"
import userpicture from '../images/user.png'
import Location from "./locationlist"

const Profile = () =>{
    let [fullname,setFullname ] = useState('jose');
    let [email,setEmail ] = useState('123@gmail.com');
    let [password,setPassword ] = useState('*********');
    let [updatepassword,setUpdatepassword ] = useState('');
    let [birthofdate,setBirthofdate ] = useState('Unkown');
    let [age,setAge ] = useState('Unkown');
    let [sex,setSex ] = useState('Unkown');

    return (
      <div className='Profilepage'>
        <div>
        <Navbarnew />
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
    );
  }
  export default Profile;