import React, {useState} from 'react';
import { Link } from "react-router-dom";

import './style.css';

function registrationForm() {
    return (
        <div className='loginForm'>
            <div className='temp'>
                <form className='formGroup'>
                    <div className='title'> Register </div>
                    <div className='userIn'>
                        {/* <label> Email </label> */}
                        <input type='text' className='form-control' placeholder='Carleton Email'></input>
                        {/* <label> Password </label> */}
                        <input type='text' className='form-control' placeholder='Password'></input>
                        {/* <label> Confirm Password </label> */}
                        <input type='text' className='form-control' placeholder='Confirm Password'></input>
                    </div>
                    <Link to="/home">
                        <button className='primaryButton' type='submit'> Register </button>
                    </Link>
                </form>
                <Link to="/">
                    <button className='secondayButton' type='submit'> Already Have an Account? </button>
                </Link>
            </div>
        </div>
    )
}

export default registrationForm;
