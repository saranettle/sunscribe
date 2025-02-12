import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Change the icons, function names, and parameters 
// to fit your portfolio topic and schema.

export const Register = () => {

    const [username, setUsername]       = useState('');
    const [email, setEmail]         = useState('');
    const [password, setPassword] = useState('');
    
    const redirect = useNavigate();

    const addUser = async () => {
        const newUser = { username, email, password };
        const response = await fetch('/users', {
            method: 'post',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`Success! Login to your account now.`);
            redirect("/login");
        } else {
            alert(`Uh oh, something went wrong... error = ${response.status}`);
        }
        
    };


    return (
        <>
        <Row>
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4}}>
        <a href="/about">
            <div class="homepage homepage_inactive">
                <h2>About</h2>
            </div>
        </a>
        </Col>
        </Row>

        <Row>
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4}}>
        <a href="/login">
            <div class="homepage homepage_inactive">
                <h2>Login</h2>
            </div>
        </a>
        </Col>
        </Row>

        <Row>
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4}}>
        <div class="homepage" id="register_form">
            <h2>Register</h2>
                

                <label for="username">Username:</label>
                <input
                            type="text"
                            placeholder=" username"
                            value={username}
                            onChange={e => setUsername(e.target.value)} 
                            id="username" />

                <label for="email">Email:</label>
                <input
                            type="email"
                            value={email}
                            placeholder="email"
                            onChange={e => setEmail(e.target.value)} 
                            id="email" />

                <label for="password">Password:</label>
                <input
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={e => setPassword(e.target.value)} 
                            id="password" />

                <label for="submit" >Submit</label>
                        <button
                            type="submit"
                            onClick={addUser}
                            id="submit"
                            class="submit_button"
                        >Submit</button>


            <a href="/"><button class="back_button">Back</button></a>
        </div>
        </Col>
        </Row>

    </>
);
}
        

export default Register;