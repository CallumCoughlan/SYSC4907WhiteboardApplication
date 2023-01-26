import { textAlign } from '@mui/system';
import React, {useState} from 'react';
import { Link } from "react-router-dom";

import './style.css';

function adminForm() {
    return (
        <div className='wrapper'>
            <div className='sidebar'>
                <div className="cuLogo" style={{textAlign:'center'}}>
                    <img src={require('../../../cuLogo.png')}></img>
                    <h2> cuWhiteBoard </h2>
                </div>
                <ul>
                    <Link to="/adminPage" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <li>
                            <span className="item">Home</span>
                        </li>
                    </Link>
                    {/* <Link to="/adminAssignSessions" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <li>
                            <span className="item">Assign Sessions</span>
                        </li>
                    </Link> */}
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
            <div className="mainMenu">
                <table>
                    <thead> 
                        <tr>
                            <th className='col1'>Student</th>
                            <th className='col2'>Date</th>
                            <th className='col3'>Time</th>
                            <th className='col4'>Course</th>
                            <th className='col5'>Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='col1'>devonsnow@cmail.carleton.ca</td>
                            <td className='col2'>01/27/2023</td>
                            <td className='col3'>9:00-11:00</td>
                            <td className='col4'>ECOR 1010</td>
                            <td className='col5'><button>Assign</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default adminForm;
