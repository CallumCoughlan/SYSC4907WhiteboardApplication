import { textAlign } from '@mui/system';
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import './style.css';

function convertTime(time: string) {
    var date = new Date(time);
    var convertedTime = ""
    var hours = date.getUTCHours()
    var hoursString = hours < 10 ? "0" + hours : hours
    var minutes = date.getUTCMinutes()
    var minutesString = minutes === 0 ? "00" : minutes
    convertedTime = hoursString + ":" + minutesString
    return convertedTime
}

function AdminForm() {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        fetch("https://lit-river-91932.herokuapp.com/requested-sessions", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setSessions(data["results"])
        })
    }, []);

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
                        {sessions.map((session) => {
                            return (
                                <tr>
                                    <td className='col1'>{session["id"]}</td>
                                    <td className='col2'>{session["date"]}</td>
                                    <td className='col3'>{convertTime(session["start_time"])} - {convertTime(session["end_time"])}</td>
                                    <td className='col4'>{session["course_code"]}</td>
                                    <td className='col5'><button>Assign</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminForm;
