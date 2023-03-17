import React from 'react';
import {  Link } from "react-router-dom";
const calendarNavBar= () =>{
  return (
    <div className='sidebar'>
        <div className="cuLogo" style={{textAlign:'center'}}>
            <img src={require('../../cuLogo.png')}></img>
            <h2> cuWhiteBoard </h2>
        </div>
        <ul>

            <Link to={sessionStorage.getItem("currentUserRole") === "student" ? "/request-session" : "/create-session"} style={{ color: 'inherit', textDecoration: 'none' }}>
                <li>
                    <span className='item'>{sessionStorage.getItem("currentUserRole") === "student" ? "Request a Private Session" : "Create a Public Session"}</span>
                </li>
            </Link>
            {sessionStorage.getItem("currentUserRole") === "scholar" ?
            (
                <Link to="/set-availability" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <li>
                        <span className='item'>Set Availability</span>
                    </li>
                </Link>
            )
            :
                null
            }

            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                <li>
                    <span className="item">Logout</span>
                </li>
            </Link>
        </ul>
    </div>
  );
}
export default calendarNavBar;