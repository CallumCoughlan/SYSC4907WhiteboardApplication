import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css'

const RequestSession: FC = () => {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [course, setCourse] = useState("");

    return (
        <form>
            <h1 className='form-title'>Request a Session</h1>
            <div className='form-container'>
                <label htmlFor="date-input">Select a date:</label>
                <input type="date" id="date-input" value={date} className="form-item" onChange={(e)=>setDate(e.target.value)}/>
                <br/>
                <label htmlFor="start-time-select">Select a start time:</label>
                <select value={startTime} id="start-time-select" className="form-item" onChange={(e)=>setStartTime(e.target.value)}>
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
                <select value={endTime} id="end-time-select" className="form-item" onChange={(e)=>setEndTime(e.target.value)}>
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
                    <option value="16:00">16:00</option>
                </select>
                <br/>
                <label htmlFor="course-select">Select a course:</label>
                <select value={course} id="course-select" className="form-item" onChange={(e)=>setCourse(e.target.value)}>
                    <option value="ECOR 1010">ECOR 1010</option>
                    <option value="MATH 1004">MATH 1004</option>
                    <option value="MATH 1104">MATH 1104</option>
                </select>
                <br/>
                <input type="submit" value="Submit" className="submit-button"/>
            </div>
            <Link to="/home"><div className="back-button">Back</div></Link>
        </form>
    );
};

export default RequestSession;