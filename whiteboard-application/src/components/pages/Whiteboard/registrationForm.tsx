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
                    <Link to="/whiteboard">
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