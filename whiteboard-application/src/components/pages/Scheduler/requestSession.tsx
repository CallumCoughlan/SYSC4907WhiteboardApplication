import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
//import { globalVarEmail } from '../../pages/Whiteboard/loginForm';


type RequestSessionProps = {
    role: String;
};

const RequestSession: FC<RequestSessionProps> = (props) => {
    //default date is current date + a week
    let startDate = new Date();
    startDate.setDate(startDate.getDate() + 7);

    let year = startDate.getFullYear().toString();
    let month = startDate.getMonth().toString();
    let day = startDate.getDate().toString();

    //for some reason months start at index 0
    if(month == '0') month = '01';
    if(month == '1') month = '02';
    if(month == '2') month = '03';
    if(month == '3') month = '04';
    if(month == '4') month = '05';
    if(month == '5') month = '06';
    if(month == '6') month = '07';
    if(month == '7') month = '08';
    if(month == '8') month = '09';
    if(month == '9') month = '10';
    if(month == '10') month = '11';
    if(month == '11') month = '12';

    if(day == '1') day = '01';
    if(day == '2') day = '02';
    if(day == '3') day = '03';
    if(day == '4') day = '04';
    if(day == '5') day = '05';
    if(day == '6') day = '06';
    if(day == '7') day = '07';
    if(day == '8') day = '08';
    if(day == '9') day = '09';

    let str = year + '-' + month + '-' + day;

    const [date, setDate] = useState(str);
    const [startTime, setStartTime] = useState("8:30");
    const [endTime, setEndTime] = useState("9:00");
    const [course, setCourse] = useState("ECOR 1010");
    const [description, setDescription] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("10");

    function isTimeInvalid(time: String) {
        if (startTime === "") {
            return false
        } else {
            const startTimeValues = startTime.split(":")
            const values = time.split(":")
            if ((parseInt(startTimeValues[0]) * 60 + parseInt(startTimeValues[1])) >= (parseInt(values[0]) * 60 + parseInt(values[1]))) {
                return true
            } else {
                return false
            }
        }
    }

    function handleStartTimeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setStartTime(event.target.value)
        var select = document.getElementById("end-time-select")
        select?.removeAttribute("disabled")
    }

    //function that is invoked on submit 
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log("creating session...");
        console.log("date: " + date); 
        console.log("start time: " + startTime); 
        console.log("end time: " + endTime); 
        console.log("course: " + course);
        console.log("description: " + description);
        console.log("max participants: " + maxParticipants);

        //must convert start and end time to "2023-06-25 17:00:00" format
        let startStr = startTime;
        let endStr = endTime;
        if(startStr == '8:30') startStr = '08:30';
        if(startStr == '9:00') startStr = '09:00';
        if(startStr == '9:30') startStr = '09:30';
        if(endStr == '8:30') endStr = '08:30';
        if(endStr == '9:00') endStr = '09:00';
        if(endStr == '9:30') endStr = '09:30';
        startStr = date + ' ' + startStr + ':00';
        endStr = date + ' ' + endStr + ':00';
        
        var sessionType = props.role === "student" ? "private" : "public";
        var sessionStatus = props.role === "student" ? "requested" : "created";

        // const response = fetch('https://lit-river-91932.herokuapp.com/login', {
        //     method: 'GET',
        //     mode: "cors",
        //     headers: {
        //         //'Access-Control-Allow-Origin': 'http://localhost:3000',
        //         //'Origin': 'http://localhost:3000',
        //         'id': 'bob@cmail.carleton.ca',
        //         'password': '12345'
        //     }
        //   })
        // .then((response) => response.json())
        // .then((json) => console.log(json));

        //send http post request to backend to create session
        fetch("https://lit-river-91932.herokuapp.com/session", {
        method: "POST",
        body: JSON.stringify({
            date: date,
            startTime: startStr,
            endTime: endStr,
            course: course,
            description: description,
            numParticipants: maxParticipants,
            sessionType: sessionType,
            sessionStatus: sessionStatus,
            userID: sessionStorage.getItem("currentUserEmail") // this is the id of the scholar requesting a prvate session or the id of a scholar creating a public session
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })
        
        var message = props.role === "student" ? "Private session request has been created" : "Public session has been created";
        alert(message);
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <h1 className='form-title'>{props.role === "student" ? "Request a Private Session" : "Create a Public Session"}</h1>
            <div className='form-container'>
                <label htmlFor="date-input">Select a date:</label>
                <input type="date" id="date-input" value={date} className="form-item" onChange={(e)=>setDate(e.target.value)}/>
                <br/>
                <label htmlFor="start-time-select">Select a start time:</label>
                <select value={startTime} id="start-time-select" className="form-item" onChange={(e)=>handleStartTimeChange(e)}>
                    <option value="8:30">8:30</option>
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                </select>
                <br/>
                <label htmlFor="end-time-select">Select an end time:</label>
                <select value={endTime} id="end-time-select" className="form-item" onChange={(e)=>setEndTime(e.target.value)} disabled>
                    <option value="9:00" disabled={isTimeInvalid("9:00")}>9:00</option>
                    <option value="9:30" disabled={isTimeInvalid("9:30")}>9:30</option>
                    <option value="10:00" disabled={isTimeInvalid("10:00")}>10:00</option>
                    <option value="10:30" disabled={isTimeInvalid("10:30")}>10:30</option>
                    <option value="11:00" disabled={isTimeInvalid("11:00")}>11:00</option>
                    <option value="11:30" disabled={isTimeInvalid("11:30")}>11:30</option>
                    <option value="12:00" disabled={isTimeInvalid("12:00")}>12:00</option>
                    <option value="12:30" disabled={isTimeInvalid("12:30")}>12:30</option>
                    <option value="13:00" disabled={isTimeInvalid("13:00")}>13:00</option>
                    <option value="13:30" disabled={isTimeInvalid("13:30")}>13:30</option>
                    <option value="14:00" disabled={isTimeInvalid("14:00")}>14:00</option>
                    <option value="14:30" disabled={isTimeInvalid("14:30")}>14:30</option>
                    <option value="15:00" disabled={isTimeInvalid("15:00")}>15:00</option>
                    <option value="15:30" disabled={isTimeInvalid("15:30")}>15:30</option>
                    <option value="16:00" disabled={isTimeInvalid("16:00")} selected>16:00</option>
                </select>
                <br/>
                <label htmlFor="course-select">Select a course:</label>
                <select value={course} id="course-select" className="form-item" onChange={(e)=>setCourse(e.target.value)}>
                    <option value="ECOR 1010">ECOR 1010</option>
                    <option value="MATH 1004">MATH 1004</option>
                    <option value="MATH 1104">MATH 1104</option>
                </select>
                <br/>
                <label htmlFor="description">Session description:</label>
                <input value={description} type="text" id="description" name="description" className="form-item" placeholder="description"
                 onChange={(e)=>setDescription(e.target.value)}></input>
                <br/>
                <label htmlFor="maxParticipants">Max participants:</label>
                <input value={maxParticipants} type="number" id="maxParticipants" name="maxParticipants" className="form-item" min="2" max="50"
                 onChange={(e)=>setMaxParticipants(e.target.value)}></input>
                <br/>
                <input type="submit" value="Submit" className="submit-button"/>
            </div>
            <Link to="/home"><div className="back-button">Back</div></Link>
        </form>
    );
};

export default RequestSession;