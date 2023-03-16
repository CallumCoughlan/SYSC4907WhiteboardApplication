import React, {useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { AdminNavBar } from '../../Whiteboard';

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

function getDayAndMonth(time: string) {
    var date = new Date(time);
    var monthString = "";
    switch (date.getUTCMonth()) {
        case 0: {
            monthString = "January";
            break;
        }
        case 1: {
            monthString = "February";
            break;
        }
        case 2: {
            monthString = "March";
            break;
        }
        case 3: {
            monthString = "April";
            break;
        }
        case 4: {
            monthString = "May";
            break;
        }
        case 5: {
            monthString = "June";
            break;
        }
        case 6: {
            monthString = "July";
            break;
        }
        case 7: {
            monthString = "August";
            break;
        }
        case 8: {
            monthString = "September";
            break;
        }
        case 9: {
            monthString = "October";
            break;
        }
        case 10: {
            monthString = "November";
            break;
        }
        case 11: {
            monthString = "December";
            break;
        }
    }
    return monthString + " " + date.getUTCDate();
}

function AdminAssignSess() {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState("")
    const [availableScholars, setAvailableScholars] = useState([])
    const [open, setOpen] = useState(false);

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

    function handleAssign(id: string, date: string, startTime: string, endTime: string) {
        setSelectedSession(id);

        const request = new XMLHttpRequest();

        request.open('GET', 'https://lit-river-91932.herokuapp.com/available-scholars', false);
        request.setRequestHeader("session-date", date);
        request.setRequestHeader("start", startTime);
        request.setRequestHeader("end", endTime);
        request.send();

        var response = JSON.parse(request.responseText);
        console.log(response["results"]);
        setAvailableScholars(response["results"]);

        setOpen(true);

        /*fetch("http://localhost:5000/scholars", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })*/
    }

    function handleSelect(scholarID: string) {
        console.log(scholarID);

        fetch("https://lit-river-91932.herokuapp.com/requested-session", {
        method: "POST",
        body: JSON.stringify({
            userID: scholarID,
            sessionID: selectedSession
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })

        setOpen(false);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div className='wrapper'>
            <AdminNavBar/>
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
                                    <td className='col2'>{getDayAndMonth(session["date"])}</td>
                                    <td className='col3'>{convertTime(session["start_time"])} - {convertTime(session["end_time"])}</td>
                                    <td className='col4'>{session["course_code"]}</td>
                                    <td className='col5'><button onClick={()=>handleAssign(session["session_id"], session["date"], session["start_time"], session["end_time"])}>Assign</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Available Scholars</DialogTitle>
                <DialogContent>
                    <table>
                        <tbody>
                            {availableScholars.map((scholar) => {
                                return (
                                    <tr>
                                        <td>{scholar["id"]}</td>
                                        <td><button onClick={()=>handleSelect(scholar["id"])}>Assign to Session</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AdminAssignSess;