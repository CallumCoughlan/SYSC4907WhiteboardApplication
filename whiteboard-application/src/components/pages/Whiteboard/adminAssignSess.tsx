import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import { NavBar } from '../../Whiteboard';

import './style.css';

function adminAssignSess() {
    return (
        <div className='wrapper'>
            <NavBar/>
            <div className="mainMenu">
                ASSIGN SESSION  PAGE <br/>
            </div>
        </div>
    )
}

export default adminAssignSess;