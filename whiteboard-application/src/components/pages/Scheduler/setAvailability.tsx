import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css'

const SetAvailability: FC = () => {
    const [day, setDay] = useState("");
    const [startTimeWeekly, setStartTimeWeekly] = useState("");
    const [endTimeWeekly, setEndTimeWeekly] = useState("");
    const [date, setDate] = useState("");
    const [startTimeSingle, setStartTimeSingle] = useState("");
    const [endTimeSingle, setEndTimeSingle] = useState("");

    function isTimeInvalid(time: String, startTime: String) {
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

    function handleStartTimeWeeklyChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setStartTimeWeekly(event.target.value)
        var select = document.getElementById("end-time-weekly-select")
        select?.removeAttribute("disabled")
    }
    
    function handleStartTimeSingleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setStartTimeSingle(event.target.value)
        var select = document.getElementById("end-time-single-select")
        select?.removeAttribute("disabled")
    }

    //function that is invoked on submit 
    async function handleSubmit(event: React.MouseEvent<HTMLInputElement>, isWeekly: boolean) {
        event.preventDefault();
        console.log("setting availability...");
        console.log("day: " + day);
        console.log("date: " + date);
        console.log("start time weekly: " + startTimeWeekly);
        console.log("end time weekly: " + endTimeWeekly);
        console.log("start time single: " + startTimeSingle);
        console.log("end time single: " + endTimeSingle);

        var reqBody;
        if (isWeekly) {
            reqBody = {
                userID: "bob@cmail.carleton.ca",
                day: day,
                startTime: startTimeWeekly,
                endTime: endTimeWeekly
            }
        } else {
            reqBody = {
                userID: "bob@cmail.carleton.ca",
                date: date + "T10:00:00.000Z",
                startTime: startTimeSingle,
                endTime: endTimeSingle
            }
        }

        fetch("https://lit-river-91932.herokuapp.com/availability", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })
    }

    return (
        
        <form>
            <h1 style={{margin: "auto"}} className='title'>Set the times at which you are unavailable</h1>
            <div className='set-availability-layout'>
                
                <div className='availability-form-container'>
                    <h3 className='form-title'>Weekly occurence</h3>
                    <label htmlFor="day-select">Select a day:</label>
                    <select value={day} id="day-select" className="form-item" onChange={(e)=>setDay(e.target.value)}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <br/>
                    <label htmlFor="start-time-weekly-select">Select a start time:</label>
                    <select value={startTimeWeekly} id="start-time-weekly-select" className="form-item" onChange={(e)=>handleStartTimeWeeklyChange(e)}>
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
                    <label htmlFor="end-time-weekly-select">Select an end time:</label>
                    <select value={endTimeWeekly} id="end-time-weekly-select" className="form-item" onChange={(e)=>setEndTimeWeekly(e.target.value)} disabled>
                    <option value="9:00" disabled={isTimeInvalid("9:00", startTimeWeekly)}>9:00</option>
                    <option value="9:30" disabled={isTimeInvalid("9:30", startTimeWeekly)}>9:30</option>
                    <option value="10:00" disabled={isTimeInvalid("10:00", startTimeWeekly)}>10:00</option>
                    <option value="10:30" disabled={isTimeInvalid("10:30", startTimeWeekly)}>10:30</option>
                    <option value="11:00" disabled={isTimeInvalid("11:00", startTimeWeekly)}>11:00</option>
                    <option value="11:30" disabled={isTimeInvalid("11:30", startTimeWeekly)}>11:30</option>
                    <option value="12:00" disabled={isTimeInvalid("12:00", startTimeWeekly)}>12:00</option>
                    <option value="12:30" disabled={isTimeInvalid("12:30", startTimeWeekly)}>12:30</option>
                    <option value="13:00" disabled={isTimeInvalid("13:00", startTimeWeekly)}>13:00</option>
                    <option value="13:30" disabled={isTimeInvalid("13:30", startTimeWeekly)}>13:30</option>
                    <option value="14:00" disabled={isTimeInvalid("14:00", startTimeWeekly)}>14:00</option>
                    <option value="14:30" disabled={isTimeInvalid("14:30", startTimeWeekly)}>14:30</option>
                    <option value="15:00" disabled={isTimeInvalid("15:00", startTimeWeekly)}>15:00</option>
                    <option value="15:30" disabled={isTimeInvalid("15:30", startTimeWeekly)}>15:30</option>
                    <option value="16:00" disabled={isTimeInvalid("16:00", startTimeWeekly)} selected>16:00</option>
                    </select>
                    <br/>
                    <input type="submit" value="Submit" id="weekly-submit" className="submit-button" onClick={(e)=>handleSubmit(e, true)}/>
                </div>
                <div className='availability-form-container'>
                    <h3 className='form-title'>Single occurence</h3>
                    <label htmlFor="date-input">Select a date:</label>
                    <input type="date" id="date-input" value={date} className="form-item" onChange={(e)=>setDate(e.target.value)}/>
                    <br/>
                    <label htmlFor="start-time-single-select">Select a start time:</label>
                    <select value={startTimeSingle} id="start-time-single-select" className="form-item" onChange={(e)=>handleStartTimeSingleChange(e)}>
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
                    <label htmlFor="end-time-single-select">Select an end time:</label>
                    <select value={endTimeSingle} id="end-time-single-select" className="form-item" onChange={(e)=>setEndTimeSingle(e.target.value)} disabled>
                    <option value="9:00" disabled={isTimeInvalid("9:00", startTimeSingle)}>9:00</option>
                    <option value="9:30" disabled={isTimeInvalid("9:30", startTimeSingle)}>9:30</option>
                    <option value="10:00" disabled={isTimeInvalid("10:00", startTimeSingle)}>10:00</option>
                    <option value="10:30" disabled={isTimeInvalid("10:30", startTimeSingle)}>10:30</option>
                    <option value="11:00" disabled={isTimeInvalid("11:00", startTimeSingle)}>11:00</option>
                    <option value="11:30" disabled={isTimeInvalid("11:30", startTimeSingle)}>11:30</option>
                    <option value="12:00" disabled={isTimeInvalid("12:00", startTimeSingle)}>12:00</option>
                    <option value="12:30" disabled={isTimeInvalid("12:30", startTimeSingle)}>12:30</option>
                    <option value="13:00" disabled={isTimeInvalid("13:00", startTimeSingle)}>13:00</option>
                    <option value="13:30" disabled={isTimeInvalid("13:30", startTimeSingle)}>13:30</option>
                    <option value="14:00" disabled={isTimeInvalid("14:00", startTimeSingle)}>14:00</option>
                    <option value="14:30" disabled={isTimeInvalid("14:30", startTimeSingle)}>14:30</option>
                    <option value="15:00" disabled={isTimeInvalid("15:00", startTimeSingle)}>15:00</option>
                    <option value="15:30" disabled={isTimeInvalid("15:30", startTimeSingle)}>15:30</option>
                    <option value="16:00" disabled={isTimeInvalid("16:00", startTimeSingle)} selected>16:00</option>
                    </select>
                    <br/>
                    <input type="submit" value="Submit" id="single-submit" className="submit-button" onClick={(e)=>handleSubmit(e, false)}/>
                </div>
            </div>
            <Link to="/home"><div className="back-button">Back</div></Link>
        </form>
    );
};

export default SetAvailability;