import React, { useState, useEffect } from 'react';

const Menu = ({showMenu}) => {
    if (showMenu == false) {
        return (null);
    }
    else {
        return (
            <div className = "menu">
                <p>test</p>
            </div>
        );
    }
}

export default Menu;