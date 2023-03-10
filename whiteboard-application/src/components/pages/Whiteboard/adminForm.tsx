import { textAlign } from '@mui/system';
import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { NavBar } from '../../Whiteboard';

import './style.css';

function adminForm() {
    return (
        <div className='wrapper'>
            <NavBar/>
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
