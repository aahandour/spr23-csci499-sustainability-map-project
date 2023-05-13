import React, { useState, useEffect } from 'react';

const MenuButton = ({showMenu, setShowMenu}) => {

    //let [showMenu, setShowMenu] = useState(false);

    function toggleMenu() {
        console.log("menu test");
        if (showMenu == false) {
            setShowMenu(true);
            console.log("set showMenu to true");
        }
        else if (showMenu == true) {
            setShowMenu(false);
            console.log("set showMenu to false");
        }
    }

    if (showMenu == false) {
        return (
            <div onClick={toggleMenu}>
                <p>Menu</p>
            </div>
        );
    }
    else {
        return (
            <div onClick={toggleMenu}>
                <p>Menu (true)</p>
            </div>
        );
    }
}

export default MenuButton;