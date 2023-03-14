import React, {useEffect, useState} from 'react';
import { NavBar } from '../../Whiteboard';

import './style.css';

function AdminStudentList() {
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        fetch('https://lit-river-91932.herokuapp.com/students', {
            method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
            setStudentList(data["results"])
        })
    }, []);

    function handleSubmit(student:string) {
        const request = new XMLHttpRequest();

        request.open('POST', 'https://lit-river-91932.herokuapp.com/promote_student', false);
        request.setRequestHeader('user_id', student);
        request.send();

        window.location.reload();
    }

    return (
        <div className='wrapper'>
            <NavBar/>
            <div className="mainMenu">
                <table>
                    <thead> 
                        <tr>
                            <th className='col1'>Student</th>
                            <th className='col2'>Password</th>
                            <th className='col3'>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.map((students) => {
                            return (
                                <tr>
                                    <td className='col1'>{students["id"]}</td>
                                    <td className='col2'>{students["password"]}</td>
                                    <td className='col3'>
                                        <button className='primaryButton' type='submit' onClick={()=>handleSubmit(students["id"])}> Promote </button>
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

export default AdminStudentList;