import { React, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Importing components for the application
import Menu from '../components/menu';

export const NewEntry = () => {

    const { username } = useParams();

    const [text, setText]       = useState('');
        
    const redirect = useNavigate();
    
    const addEntry = async () => {
        const newEntry = { text, author: username };
        const confirmed = window.confirm("Are you sure you want to save this journal entry?")

        if (confirmed) {

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

        } 
        
    };

    return (
        <>
            
            <Row>
            <Col sm={12} md={4}>
              <Menu />
            </Col>

            <Col>
            <h2 class="user_heading">Create a new entry</h2>
           <div id="new_entry">
            
            <textarea 
                type="text"
                placeholder=""
                value={text}
                onChange={e => setText(e.target.value)} 
                id="text">
                </textarea>
                </div>
                <Link to={`/home/${username}`}><button class="user_button">Go Back</button></Link>
                <button class="user_button" onClick={addEntry}>Save Entry</button>
            
           
           </Col>
           </Row>

        </>
    );
}

export default NewEntry;