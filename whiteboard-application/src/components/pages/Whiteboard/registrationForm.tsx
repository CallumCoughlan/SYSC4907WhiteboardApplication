import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import './style.css';

function RegistrationForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirm] = useState("");
    const [incorrectInputs, setIncorrect] = useState("");

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (password == confirmPwd) {
            const res = await fetch('https://lit-river-91932.herokuapp.com/login', {
                method: "POST",
                body: JSON.stringify({
                    id: email,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });    

            const data = await res.json();
            const status = JSON.parse(JSON.stringify(data.status));

            switch (status) {
                case "ID_already_exists":
                    setIncorrect("User ID already exists.");
                    return;
                case "invalid_ID":
                    setIncorrect("Invalid user ID.");
                    return;
                case "invalid_password":
                    setIncorrect("Invalid password.");
                    return;
                default:
                    return navigate("/");
            }
        } else {
            setIncorrect("Passwords do not match.");
        }
    }

    return (
        <div className='loginForm'>
            <div className='temp'>
                <form className='formGroup'>
                    <div className='title'> Register </div>
                    <div className='userIn'>
                        <div id='incorrectInput'>{incorrectInputs}</div>
                        <input type='text' className='form-control' placeholder='Carleton Email' onChange={e => setEmail(e.target.value)}></input>
                        <input type='text' className='form-control' placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
                        <input type='text' className='form-control' placeholder='Confirm Password' onChange={e => setConfirm(e.target.value)}></input>
                    </div>
                    <Link to="/home">
                        <button className='primaryButton' type='submit' onClick={handleSubmit}> Register </button>
                    </Link>
                </form>
                <Link to="/">
                    <button className='secondayButton' type='submit'> Already Have an Account? </button>
                </Link>
            </div>
        </div>
    )
}

export default RegistrationForm;
