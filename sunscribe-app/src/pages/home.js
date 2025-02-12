import { React } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {


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

export default Home;