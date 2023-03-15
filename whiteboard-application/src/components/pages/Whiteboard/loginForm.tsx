import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import './style.css';

function LoginForm() { 
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [incorrectInputs, setIncorrect] = useState("");
    
    function handleSubmit(event: any) {
        event.preventDefault();

        const request = new XMLHttpRequest();

        request.open('GET', 'https://lit-river-91932.herokuapp.com/login', false);
        request.setRequestHeader("id", email);
        request.setRequestHeader("password", password);
        request.send();

        var response = JSON.parse(request.responseText);

        if (response.status == "valid") {
            sessionStorage.setItem("currentUserEmail", email);
            if (response.role == "admin") {
                sessionStorage.setItem("currentUserRole", "admin");
                return navigate("/home");
            } else if(response.role == "scholar") {
                sessionStorage.setItem("currentUserRole", "scholar");
                return navigate("/home");
            } else{
                sessionStorage.setItem("currentUserRole", "student");
                return navigate("/home");
            }
        } else {
            setIncorrect("Email or password you've entered is incorrect.");
        }
    }
    
    return (
        <div className='loginForm'>
            <div className='temp'>
                <form className='formGroup'>
                    <img src={require('../../../cuLogo.png')} width="10%" height="10%"></img>
                    <div className='title'> cuWhiteBoard </div>
                    <div className='userIn'>
                        <div id='incorrectInput'>{incorrectInputs}</div>
                        <input type='text' className='form-control' name='email' placeholder='Carleton Email' onChange={e => setEmail(e.target.value)}></input>
                        <input type='text' className='form-control' name='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <button className='primaryButton' type='submit' onClick={handleSubmit}> Login </button>
                </form>
                <Link to="/register">
                    <button className='secondayButton' type='submit'> Create New Account! </button>
                </Link>
            </div>
        </div>
    )
}

export default LoginForm;