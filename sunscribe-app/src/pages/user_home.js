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
            
           <Menu />
           <div>
            <h2>Welcome, { username }.</h2>
            <p><Link to={`/new/${username}`}>New Entry</Link></p>
           </div>

        </>
    );
}

export default User_Home;