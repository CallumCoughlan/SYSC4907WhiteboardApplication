import React from 'react';
import {  Link } from "react-router-dom";
const adminNavBar= () =>{
  return (
    <div className='sidebar'>
        <div className="cuLogo" style={{textAlign:'center'}}>
            <img src={require('../../cuLogo.png')}></img>
            <h2> cuWhiteBoard </h2>
        </div>
        <ul>
            <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
                <li>
                    <span className="item">Home</span>
                </li>
            </Link>
            <Link to="/create-session" style={{ color: 'inherit', textDecoration: 'none' }}>
                <li>
                    <span className='item'>Create a Public Session</span>
                </li>
            </Link>
            <Link to="/adminAssignSessions" style={{ color: 'inherit', textDecoration: 'none' }}>
                <li>
                    <span className="item">Assign Private Sessions</span>
                </li>
            </Link>
            <Link to="/adminScholarList" style={{ color: 'inherit', textDecoration: 'none' }}>
                <li>
                    <span className="item">Scholars</span>
                    {/* <ul>
                        <li>
                            <span className="item">Perfomance</span>
                        </li>
                    </ul> */}
                </li>
            </Link>
            <Link to="/adminStudentList" style={{ color: 'inherit', textDecoration: 'none' }}>
                <li>
                    <span className="item">Students</span>
                </li>
            </Link>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                <li>
                    <span className="item">Logout</span>
                </li>
            </Link>
        </ul>
    </div>
  );
}
export default adminNavBar;