import { React } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Importing components for the application
import Menu from '../components/menu';

function EditAccount() {

    const { username } = useParams();

    return (
        <>
            
           <Row>
            <Col sm={12} md={4}>
              <Menu />
            </Col>
           
                <Col >
                    
                        <h2 class="user_heading">Edit User Settings for { username }.</h2>
                    
                    
                    </Col>
                    </Row>
                
        </>
    );
}

export default EditAccount;