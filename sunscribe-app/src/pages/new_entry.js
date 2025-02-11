import { React, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Importing components for the application
import Menu from '../components/menu';

export const New_Entry = () => {

    const { username } = useParams();

    const [text, setText]       = useState('');
        
    const redirect = useNavigate();
    
    const addEntry = async () => {
        const newEntry = { text, author: username };
        const response = await fetch('/entries', {
            method: 'post',
            body: JSON.stringify(newEntry),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`Success!`);
        } else {
            alert(`Uh oh, something went wrong... error = ${response.status}`);
        }
        redirect(`/home/${username}`);
    };

    return (
        <>
            
           <Menu />
           <div>
            <h2>Create a new entry</h2>
            <textarea 
                type="text"
                placeholder=""
                value={text}
                onChange={e => setText(e.target.value)} 
                id="text">
                </textarea>
                <button onClick={addEntry}>Save Entry</button>
            <p><Link to={`/home/${username}`}>Home</Link></p>
           </div>

        </>
    );
}

export default New_Entry;