import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

import './style.css';

function loginForm() {
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Form Submitted!")
        // if (!e.target.email.value) {
        //     console.log("Email Required");
        // } else if (e.target.password.value) {
        //     console.log("Password Required");
        // }
    }

    return (
        <div className='loginForm'>
            <div className='temp'>
                <form className='formGroup' onSubmit={handleSubmit}>
                    <img src={require('../../../cuLogo.png')} width="10%" height="10%"></img>
                    <div className='title'> cuWhiteBoard </div>
                    <div className='userIn'>
                        {/* <label> Email </label> */}
                        <input type='text' className='form-control' name='email' placeholder='Carleton Email'></input>
                        {/* <label> Password </label> */}
                        <input type='text' className='form-control' name='password' placeholder='Password'></input>
                    </div>
                    <Link to="/home">
                        <button className='primaryButton' type='submit'> Login </button>
                    </Link>
                </form>
                <Link to="/register">
                    <button className='secondayButton' type='submit'> Create New Account! </button>
                </Link>
            </div>
        </div>
    )
}

export default loginForm;