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
                    <div className='title'> WhiteBoard App </div>
                    <div className='userIn'>
                        {/* <label> Email </label> */}
                        <input type='text' className='form-control' name='email' placeholder='Carleton Email'></input>
                        {/* <label> Password </label> */}
                        <input type='text' className='form-control' name='password' placeholder='Password'></input>
                    </div>
                    <Link to="/whiteboard">
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

// import React, { useState } from "react";

// import Form from "react-bootstrap/Form";

// import Button from "react-bootstrap/Button";

// import "./Login.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   function validateForm() {
//     return email.length > 0 && password.length > 0;
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//   }

//   return (
//     <div className="Login">
//       <Form onSubmit={handleSubmit}>
//         <Form.Group size="lg" controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             autoFocus
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}/>
//         </Form.Group>
//         <Form.Group size="lg" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
//         </Form.Group>
//         <Button block size="lg" type="submit" disabled={!validateForm()}>
//           Login
//         </Button>
//       </Form>
//     </div>
//   );

// }