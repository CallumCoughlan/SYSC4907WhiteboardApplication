import { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import './style.css'

type CalendarProps = {
    role: String;
};


//fetch session info from server
var jsonSessionInfo = null;
const request = new XMLHttpRequest();
request.open('GET', 'https://lit-river-91932.herokuapp.com/session', false);
request.send(null);
if (request.status === 200) {
    jsonSessionInfo = JSON.parse(request.responseText);
}
//console.log(sessionInfo['results'][0]['description']);

var sessionInfoMap = new Map<string, string[]>();
sessionInfoMap.set("apples", ["hello","world"]);
for(let index = 0; index <jsonSessionInfo['results'].length; index ++){
    console.log(jsonSessionInfo['results'][index]['date']);
    var date = jsonSessionInfo['results'][index]['date'];

    console.log(sessionInfoMap.get('apples'));

    if(sessionInfoMap.get(date) == null){
        console.log("ITS NULL");
    }
}
console.log(jsonSessionInfo['results'].length);


const Calendar: FC<CalendarProps> = (props) => {
    const [dates, setDates] = useState(new Map<number, number[][]>());
    const [weekViewSelected, setWeekViewSelected] = useState(false);
    const [currentYear, setCurrentYear] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [currentWeek, setCurrentWeek] = useState(0);

    useEffect(() => {
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
            } else if (month >=4) {
                //summer
                newDates = getDates(new Date(currentDate.getFullYear(), 4, 1), new Date(currentDate.getFullYear(), 7, 31));
            } else {
                //winter
                newDates = getDates(new Date(currentDate.getFullYear(), 0, 1), new Date(currentDate.getFullYear(), 3, 30));
            }

            console.log(newDates);
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
        const date  = new Date();
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
                            dates.get(currentMonth)![currentWeek].map((day)=>{
                                const currentDate = new Date();
                                if (day === currentDate.getDate() && currentMonth === currentDate.getMonth()) {
                                    if (!(currentDate.getDate() > 20 && currentWeek === 0) && !(currentDate.getDate() < 7 && currentWeek > 1)) {
                                        return (
                                            <div className='day week current'>{day} aaa</div>
                                        );
                                    } else {
                                        return (
                                            <div className='day week'>{day} bbb</div>
                                        );
                                    }
                                } else {
                                    return (
                                        <div className='day week'> ccc{day}</div>
                                    );
                                }
                            })
                        )
                        :
                        (
                            dates.get(currentMonth)?.map((days, index)=>{
                                const currentDate = new Date();
                                return days.map((day)=>{
                                    if ((index === 0 && day > 7) || (index > 2 && day < 7)) {
                                        return (
                                            <div className='day other-month'>{day} ddd</div>
                                        );
                                    } else if (day === currentDate.getDate() && currentMonth === currentDate.getMonth()) {
                                        return (
                                            <div className='day current'>{day} eee</div>
                                        );
                                    } else {
                                        
                                        // console.log("day is " + day);
                                        // console.log("currentDate is " + currentDate);
                                        // console.log("currentMonth is " + currentMonth);
                                        // console.log("year is " + currentYear);
                                        // console.log("dates is " + dates);
                                        return (
                                            <div className='day'>{day} fff </div>
                                        );
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