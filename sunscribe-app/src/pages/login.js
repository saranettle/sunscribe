import { React } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login() {


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
                <form id="login_form" action="/">

                    <label for="username">Username:</label>
				    <input type="text" id="username" name="username" placeholder="" required />

                    <label for="password">Password:</label>
				    <input type="text" id="password" name="password" placeholder="" required />

                    <label for="submit">Submit</label>
                    <button type="submit" id="submit ">Submit</button>

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