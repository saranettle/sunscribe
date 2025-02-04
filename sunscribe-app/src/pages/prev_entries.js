import { React } from 'react';

// Importing components for the application
import Menu from '../components/menu';

function Prev_Entries() {


    return (
        <>
            
           <Menu />

            <div>
                <h2>Previous Entries</h2>

                <p><a href="/home">Back</a></p>
            </div>
        </>
    );
}

export default Prev_Entries;