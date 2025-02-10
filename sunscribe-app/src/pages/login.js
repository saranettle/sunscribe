import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login() {

    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh
        if (username) {
            navigate(`/home/${username}`);
        }
    };



    return (
        <>
            <Row>
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4}}>
            <a href="/about">
                <div class="homepage">
                    <h2>About</h2>
                </div>
            </a>
            </Col>
            </Row>

            <Row>
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4}}>
            <div class="homepage">
                <h2>Login</h2>
                <form id="login_form" onSubmit={handleSubmit}>

                    <label for="username">Username:</label>
				    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required />

                    <label for="password">Password:</label>
				    <input type="password" id="password" name="password" placeholder="" required />

                    <label for="submit">Submit</label>
                    <button type="submit" id="submit">Submit</button>

                </form>

                <button><a href="/">Back</a></button>

            </div>
            </Col>
            </Row>

            <Row>
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4}}>
            <a href="/register">
                <div class="homepage">
                    <h2>Register</h2>
                </div>
            </a>
            </Col>
            </Row>

        </>
    );
}

export default Login;