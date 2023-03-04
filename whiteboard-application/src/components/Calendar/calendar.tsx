import { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import './style.css'

type CalendarProps = {
    role: String;
};

var sessionInfoMap = new Map<string, string[]>();

//fetches information of all session from server
function fetchSessionInfo() {
    var jsonSessionInfo = null;
    const request = new XMLHttpRequest();
    request.open('GET', 'https://lit-river-91932.herokuapp.com/session', false);
    request.send(null);
    if (request.status === 200) {
        jsonSessionInfo = JSON.parse(request.responseText);
    }
    //console.log(jsonSessionInfo['results'][0]['description']);

    //clear previous sessionInfoMap
    sessionInfoMap = new Map<string, string[]>();

    //convert json to a hashmap of string to list of json objects where the keys are dates
    for (let index = 0; index < jsonSessionInfo['results'].length; index++) {
        var date = jsonSessionInfo['results'][index]['date'];

        if (sessionInfoMap.get(date) == null) {
            sessionInfoMap.set(date, [jsonSessionInfo['results'][index]]);
        } else {
            // @ts-ignore
            sessionInfoMap.get(date).push(jsonSessionInfo['results'][index]);
        }
    }
}

//fetch information of all session from server at the start
//fetchSessionInfo();


const Calendar: FC<CalendarProps> = (props) => {
    const [dates, setDates] = useState(new Map<number, number[][]>());
    const [weekViewSelected, setWeekViewSelected] = useState(false);
    const [currentYear, setCurrentYear] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [currentWeek, setCurrentWeek] = useState(0);

    useEffect(() => {
        //fetch information of all session when useEffect runs
        fetchSessionInfo();

        const currentDate = new Date();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        setCurrentMonth(month);
        setCurrentYear(year);

        setDates(() => {
            var newDates;

            if (month >= 8) {
                //fall
                newDates = getDates(new Date(currentDate.getFullYear(), 8, 1), new Date(currentDate.getFullYear(), 11, 31));
            } else if (month >= 4) {
                //summer
                newDates = getDates(new Date(currentDate.getFullYear(), 4, 1), new Date(currentDate.getFullYear(), 7, 31));
            } else {
                //winter
                newDates = getDates(new Date(currentDate.getFullYear(), 0, 1), new Date(currentDate.getFullYear(), 3, 30));
            }

            // console.log(newDates);
            return newDates;
        });

        function getDates(startDate: Date, endDate: Date) {
            var newDates = new Map<number, number[][]>();
            var month = 0;
            var datesOfWeek = [];
            var datesOfMonth: number[][];
            datesOfMonth = []
            for (var date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
                const dayOfMonth = date.getDate();
                const dayOfWeek = date.getDay();

                if (dayOfWeek === 0) {
                    datesOfWeek = [];
                }

                if (dayOfMonth === 1) {
                    month = date.getMonth();
                    datesOfWeek = [];
                    datesOfMonth = [];
                    //newDates.set(month, []);
                    if (dayOfWeek !== 0) {
                        var tempDate = new Date(date);
                        tempDate.setDate(dayOfMonth - dayOfWeek);
                        while (tempDate < date) {
                            datesOfWeek.push(tempDate.getDate());
                            tempDate.setDate(tempDate.getDate() + 1);
                        }
                    }
                    //console.log(dayOfMonth);
                }

                datesOfWeek.push(dayOfMonth);

                if (isLastDayOfMonth(date)) {
                    if (dayOfWeek !== 6) {
                        var tempDate = new Date(date);
                        var targetDate = new Date(date);
                        tempDate.setDate(tempDate.getDate() + 1);
                        targetDate.setDate(dayOfMonth + (6 - dayOfWeek));
                        while (tempDate <= targetDate) {
                            datesOfWeek.push(tempDate.getDate());
                            tempDate.setDate(tempDate.getDate() + 1);
                        }
                    }

                    datesOfMonth.push(datesOfWeek);
                    newDates.set(month, datesOfMonth);
                    //console.log(dayOfMonth);
                } else {
                    if (dayOfWeek === 6) {
                        datesOfMonth.push(datesOfWeek);
                    }
                }
                //console.log(dayOfMonth);
            }

            return newDates;
        }
    }, []);

    function changeToWeekView() {
        const currentDate = new Date();
        if (currentMonth === currentDate.getMonth()) {
            const month = dates.get(currentMonth);
            for (var i = 0; i < month!.length; i++) {
                for (var j = 0; j < month![i].length; j++) {
                    if (month![i][j] === currentDate.getDate()) {
                        if (!(currentDate.getDate() > 20 && i === 0) && !(currentDate.getDate() < 7 && i > 1)) {
                            setCurrentWeek(i);
                        }
                    }
                }
            }
        }
        setWeekViewSelected(true);
    }

    function changeToMonthView() {
        setWeekViewSelected(false);
    }

    function handleClick() {
        console.log("clicked");
    }

    function goToPrevious() {
        if (weekViewSelected) {
            if (currentWeek === 0) {
                if (currentMonth !== 0 && currentMonth !== 4 && currentMonth !== 8) {
                    setCurrentMonth(currentMonth - 1);
                    const previousWeek = dates.get(currentMonth - 1)!.length - 1;
                    if (areArraysEqual(dates.get(currentMonth)![currentWeek], dates.get(currentMonth - 1)![previousWeek])) {
                        setCurrentWeek(previousWeek - 1);
                    } else {
                        setCurrentWeek(previousWeek);
                    }
                }
            } else {
                setCurrentWeek(currentWeek - 1);
            }
        } else {
            if (currentMonth !== 0 && currentMonth !== 4 && currentMonth !== 8) {
                setCurrentMonth(currentMonth - 1);
            }
        }
    }

    function goToNext() {
        if (weekViewSelected) {
            if (currentWeek === dates.get(currentMonth)!.length - 1) {
                if (currentMonth !== 3 && currentMonth !== 7 && currentMonth !== 11) {
                    setCurrentMonth(currentMonth + 1);
                    if (areArraysEqual(dates.get(currentMonth)![currentWeek], dates.get(currentMonth + 1)![0])) {
                        setCurrentWeek(1);
                    } else {
                        setCurrentWeek(0);
                    }
                }
            } else {
                setCurrentWeek(currentWeek + 1);
            }
        } else {
            if (currentMonth !== 3 && currentMonth !== 7 && currentMonth !== 11) {
                setCurrentMonth(currentMonth + 1);
            }
        }
    }

    function areArraysEqual(arr1: number[], arr2: number[]) {
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    function getMonthString(month: number) {
        var monthString = "";
        switch (month) {
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
        const date = new Date();
        return monthString + " " + date.getFullYear();
    }

    function isLastDayOfMonth(date: Date) {
        const originalMonth = date.getMonth();
        var nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        return originalMonth !== nextDate.getMonth();
    }

    function getWeekString() {
        const month = dates.get(currentMonth);
        if (month && month[currentWeek][0] > month[currentWeek][6]) {
            if (currentWeek === 0) {
                return getMonthString(currentMonth - 1) + "/" + getMonthString(currentMonth);
            } else {
                return getMonthString(currentMonth) + "/" + getMonthString(currentMonth + 1);
            }
        } else {
            return getMonthString(currentMonth);
        }
    }

    //fetches the div for a particular date from sessionInfoMap
    function getDaySessionsDiv(year: number, month: number, day: number, divClass: string) {
        let monthStr = month.toString();
        let dayStr = day.toString();

        //for some reason month values start from 0
        if (monthStr == '0') monthStr = '01';
        if (monthStr == '1') monthStr = '02';
        if (monthStr == '2') monthStr = '03';
        if (monthStr == '3') monthStr = '04';
        if (monthStr == '4') monthStr = '05';
        if (monthStr == '5') monthStr = '06';
        if (monthStr == '6') monthStr = '07';
        if (monthStr == '7') monthStr = '08';
        if (monthStr == '8') monthStr = '09';
        if (monthStr == '9') monthStr = '10';
        if (monthStr == '10') monthStr = '11';
        if (monthStr == '11') monthStr = '12';

        if (dayStr == '1') dayStr = '01';
        if (dayStr == '2') dayStr = '02';
        if (dayStr == '3') dayStr = '03';
        if (dayStr == '4') dayStr = '04';
        if (dayStr == '5') dayStr = '05';
        if (dayStr == '6') dayStr = '06';
        if (dayStr == '7') dayStr = '07';
        if (dayStr == '8') dayStr = '08';
        if (dayStr == '9') dayStr = '09';

        var dateStr = year + '-' + monthStr + '-' + dayStr + 'T00:00:00.000Z';
        console.log("dateStr is " + dateStr);

        //if a session exists for that day
        var bool = false;
        if (sessionInfoMap.has(dateStr)) {
            bool = true;
            // side note, for some reason if I call sessionInfoMap.get
            // in this if statement then it crashes
        }else{
            return(
                <div className={divClass}>
                {day}
            </div>
            );
        }

        var sessions = null;
        if (bool) {
            // @ts-ignore
            sessions = sessionInfoMap.get(dateStr);
        }

        const sessionDivs: JSX.Element[] = [];
        const PublicSessionField = ({ results }: { results: Array<String> }) => (
            <div className='public-div'>
                {results[0]}
                <br></br>
                {results[1]}
            </div>
          );
        const PrivateSessionField = ({ results }: { results: Array<String> }) => (
            <div className='private-div'>
                {results[0]}
                <br></br>
                {results[1]}
            </div>
          );

        // @ts-ignore
        for (var i = 0; i < sessions.length; i++) {

            // @ts-ignore
            var results = [sessions[i]['course_code'] + " " + sessions[i]['session_type'], sessions[i]['start_time'].slice(11).slice(0,-8) + " : "+ sessions[i]['end_time'].slice(11).slice(0,-8)];

            // @ts-ignore
            if(sessions[i]['session_type'] == 'public'){
                sessionDivs.push(<PublicSessionField results={results}  />);
            }else{
                sessionDivs.push(<PrivateSessionField results={results}  />);
            } 
        }

        // var results = [course, description, start, end, type];
        return (
            <div className={divClass}>
                {day}
                {sessionDivs}
            </div>
        );
    }

    return (
        <>
            <div className='header'>
                <h2>My Sessions</h2>
                <div className='view-toggle'>
                    <div className='view-toggle-item' onClick={changeToWeekView}>Week</div>
                    <div className='view-toggle-item' onClick={changeToMonthView}>Month</div>
                </div>
                <div className='header-top-right'>
                    <Link to={props.role === "student" ? "/request-session" : "/create-session"}>
                        <button className='request-session-button' onClick={handleClick}>{props.role === "student" ? "Request a Session" : "Create a Session"}</button>
                    </Link>
                    {props.role === "scholar" ?
                        (
                            <Link to="/set-availability">
                                <button className='request-session-button' onClick={handleClick}>Set Availability</button>
                            </Link>
                        )
                        :
                        null
                    }
                </div>
            </div>
            <div className='calendar'>
                <div className='calendar-header'>
                    {weekViewSelected ? <div>{getWeekString()}</div> : <div>{getMonthString(currentMonth)}</div>}
                    <div className='calendar-navigation'>
                        <div className='calendar-navigation-item' onClick={goToPrevious}>Previous</div>
                        <div className='calendar-navigation-item' onClick={goToNext}>Next</div>
                    </div>
                </div>
                <div className='calendar-grid'>
                    {weekViewSelected ?
                        (
                            dates.get(currentMonth)![currentWeek].map((day) => {
                                const currentDate = new Date();
                                if (day === currentDate.getDate() && currentMonth === currentDate.getMonth()) {
                                    if (!(currentDate.getDate() > 20 && currentWeek === 0) && !(currentDate.getDate() < 7 && currentWeek > 1)) {
                                        var results = getDaySessionsDiv(currentYear, currentMonth, day, 'day week current');
                                        return(results);
                                    } else {
                                        var results = getDaySessionsDiv(currentYear, currentMonth, day, 'day week');
                                        return(results);
                                    }
                                } else {
                                    var results = getDaySessionsDiv(currentYear, currentMonth, day, 'day week');
                                    return(results);
                                }
                            })
                        )
                        :
                        (
                            dates.get(currentMonth)?.map((days, index) => {
                                const currentDate = new Date();
                                return days.map((day) => {
                                    if ((index === 0 && day > 7) || (index > 2 && day < 7)) {
                                        var results = getDaySessionsDiv(currentYear, currentMonth, day, 'day other-month');
                                        return(results);
                                    } else if (day === currentDate.getDate() && currentMonth === currentDate.getMonth()) {
                                        var results = getDaySessionsDiv(currentYear, currentMonth, day, 'day current');
                                        return(results);
                                    } else {
                                        var results = getDaySessionsDiv(currentYear, currentMonth, day, 'day');
                                        return(results);
                                    }
                                });
                            })
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Calendar;