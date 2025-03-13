import { React } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Importing components for the application
import Menu from '../components/menu';
import CreateEntryButton from '../components/createEntryButton';
import WordCountDisplay from '../components/wordCount';

function UserHome() {

    const { username } = useParams();

    return (
        <>
            
           <Row>
            <Col sm={12} md={4}>
              <Menu />
            </Col>
           
                <Col >

                        <h2 class="user_heading">Welcome, { username }.</h2>
                        <WordCountDisplay />
                        <CreateEntryButton />

                    </Col>
                    </Row>
                
        </>
    );
}

export default UserHome;