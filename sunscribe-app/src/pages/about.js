import { React } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function About() {


    return (
        <>
            <Row>
                <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4}}>
                    <div class="homepage" id="about_box">
                        <h2>About</h2>
                        <p class="about_text">SunScribe is a virtual notebook. Nothing more, nothing less.</p>
                        <p class="about_text">It was designed to make "morning pages" more accessible for those of us with busy lives. Morning pages can facilitate creative thinking and problem solving, but the habit is difficult to maintain if you have little time to reflect in the morning.</p>
                        <p class="about_text">Or if you like staying in bed.</p>
                        <p class="about_text">To use SunScribe, register for a free account with the Register link below. Or sign into your existing account.</p>
                        <a href="/"><button class="back_button" >Back</button></a>
                    </div>
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
            <a href="/register">
                <div class="homepage homepage_inactive">
                    <h2>Register</h2>
                </div>
            </a>
            </Col>
            </Row>

        </>
    );
}

export default About;