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
            <h2>Create a new entry</h2>
            <p><Link to={`/home/${username}`}>Home</Link></p>
           </div>

        </>
    );
}

export default User_Home;