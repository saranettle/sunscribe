import { React } from 'react';
import { useParams, Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Importing components for the application
import Menu from '../components/menu';

function User_Home() {

    const { username } = useParams();

    return (
        <>
            
           <Row>
            <Col sm={12} md={4}>
              <Menu />
            </Col>
           
                <Col >
                    
                        <h2 class="user_heading">Welcome, { username }.</h2>
                    
                    <div id="user_homepage">
                        <Link to={`/new/${username}`}><h2>New Entry</h2></Link>
                    </div>
                    </Col>
                    </Row>
                
        </>
    );
}

export default User_Home;