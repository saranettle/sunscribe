import { React } from 'react';

// Importing components for the application
import Menu from '../components/menu';

function User_Home() {


    return (
        <>
            
           <Menu />
           <div>
            <h2>Welcome, username.</h2>
            <p><a href="/new">New Entry</a></p>
           </div>

        </>
    );
}

export default User_Home;