import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
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

// fetches all the public or private scholar sessions and returns a table body with the results
function fetchScholarSessionsTableBody(scholarID: string, publicOrPrivate: string){
    var jsonSessionInfo = null;
    const request = new XMLHttpRequest();
    request.open('GET', 'https://lit-river-91932.herokuapp.com/'+publicOrPrivate+'-sessions', false);
    request.setRequestHeader('user_id', scholarID);
    request.send(null);
    if (request.status === 200) {
        jsonSessionInfo = JSON.parse(request.responseText);
    }

    const tableRows: JSX.Element[] = [];

    const SessionField = ({ results }: { results: Array<String> }) => (
        <tr>
            <td>{results[0]}</td>
            <td>{results[1]}</td>
            <td>{results[2]}</td>
            <td>{results[3]}</td>
        </tr>
      );

    for (var i = 0; i < jsonSessionInfo['results'].length; i++) {
        var session = jsonSessionInfo['results'][i];
        var results = [session['course_code'], convertTime(session["start_time"]) +' - '+ convertTime(session["end_time"]), session['date'].slice(0,-14) , session['status']]
        tableRows.push(<SessionField results={results}  />);
    }

    return (
        <tbody>
            {tableRows}
        </tbody>
    );
}

function AdminScholarList() {
    const [scholars, setScholars] = useState([]);

    useEffect(() => {
        // fetch initial scholar list
        fetch("https://lit-river-91932.herokuapp.com/scholars", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setScholars(data["results"])
        })
    }, []);

    return (
        <div className='wrapper'>
            <AdminNavBar/>
            <div className="mainMenu">
                <table>
                    <thead> 
                        <tr>
                            <th className='col1'>Scholar</th>
                            <th className='col2'>Availability</th>
                            <th className='publicSessionsCol'>Public Sessions</th>
                            <th className='privateSessionsCol'>Private Sessions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholars.map((scholar) => {
                            var privateResults = fetchScholarSessionsTableBody(scholar["id"], 'private');
                            var publicResults = fetchScholarSessionsTableBody(scholar["id"], 'public');
                                                                              
                            return (
                                <tr>
                                    <td className='col1'>{scholar["id"]}</td>
                                    <td className='col2'><button>View Availability</button></td>
                                    <td className='publicSessionsCol'>
                                        <table>
                                            <thead> 
                                                <tr>
                                                    <th className='col2'>Course</th>
                                                    <th className='col2'>Time</th>
                                                    <th className='col2'>Date</th>
                                                    <th className='col2'>Status</th>
                                                </tr>
                                            </thead>
                                            {publicResults}
                                        </table>
                                    </td>
                                    <td className='privateSessionsCol'>
                                        <table>
                                            <thead> 
                                                <tr>
                                                    <th className='col2'>Course</th>
                                                    <th className='col2'>Time</th>
                                                    <th className='col2'>Date</th>
                                                    <th className='col2'>Status</th>
                                                </tr>
                                            </thead>
                                            {privateResults}
                                        </table>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminScholarList;

