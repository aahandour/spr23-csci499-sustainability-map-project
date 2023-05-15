import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbarstyles.css'

const Menu = ({showMenu,isAuthenticated}) => {
    if(!isAuthenticated){
        return (null);
    }
    if (showMenu == false) {
        return (null);
    }
    else {
        return (
            <div className = "menu">
                {/* <p>test</p> */}
                {/* <button>home</button>
                <button>profile</button>
                <button>favorite stores</button> */}
                <ul id="navbar">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">profile</Link>
                    </li>
                    <li>
                        <Link to="/favorite_stores">favorite</Link>
                    </li>
                </ul>

            </div>
        );
    }
}

export default Menu;