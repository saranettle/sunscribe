import { React } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Importing components for the application
import Menu from '../components/menu';

function User_Home() {


    return (
        <>
            
           <Menu />
           <div>
            <h2>Create a new entry</h2>
            <p><a href="/home">Back</a></p>
           </div>

        </>
    );
}

export default User_Home;