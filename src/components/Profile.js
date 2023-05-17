import React, { useState } from 'react';
import { getUser, getLocationReviews, postLocationReview, deleteReview} from '../backendwrappers';
import { useAuth0 } from '@auth0/auth0-react'

import "./Profile.css"
import "../App.css"
import userpicture from '../images/user.png'
import Location from "./locationlist"
import Menu from "../Menu";
import LOG_IN_OUT from "./LOG_IN_OUT";
import MenuButton from "../MenuButton";





const Profile = () =>{
    const { isAuthenticated, loginWithRedirect, user, getIdTokenClaims} = useAuth0()

    // const get_user=user;
    // const get_username=get_user.nickname;
    // console.log(isAuthenticated) 
    console.log(user)
    // console.log(user.sub) 
    // console.log(user.nickname) 

    // let user_data =getUser(user.sub, getIdTokenClaims);
    // console.log(user_data);
    // setFullname(user_data.nickname);

    let [fullname,setFullname ] = useState(user.nickname);
    let [email,setEmail ] = useState(user.email);
    let [password,setPassword ] = useState('*********');
    let [updatepassword,setUpdatepassword ] = useState('');
    let [birthofdate,setBirthofdate ] = useState('Unkown');
    let [age,setAge ] = useState('Unkown');
    let [sex,setSex ] = useState('Unkown');
    
    let [showMenu, setShowMenu] = useState(false);

    // const { isAuthenticated, loginWithRedirect, user, getIdTokenClaims} = useAuth0()

    // let user_data =getUser(user.sub, getIdTokenClaims);
    // console.log(user_data);
    // setFullname(user_data.nickname);
    // let user_data = getUser(user.sub,getIdTokenClaims);
    // console.log(user_data);
    // setFullname(user_data.username)

    // const {isAuthenticated, getIdTokenClaims} = useAuth0()
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
                <h3>My Profile</h3>
                <hr />
                <div className='rowforprofile'>
                    <img src={userpicture}/>
                    <div className='firstcolumntextforprofile' >
                        <p className='textforprofile'>Display Name: {fullname}</p>
                        
                        <p className='textforprofile'>Email: {email}</p>
                        
                        {/*<p className='textforprofile'>password: {password}</p>*/}
                    </div>
                    <div className='firstcolumntextforprofile' >
                        <p className='textforprofile'>Date of Birth: {birthofdate}</p>
                        
                        {/*<p className='textforprofile'>age: {age}</p>*/}
                        
                        {/*<p className='textforprofile'>sex: {sex}</p>*/}
                    </div>
                    <div className='modify_information_button'>
                        <p></p>
                        <button>Modify Information</button>
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
