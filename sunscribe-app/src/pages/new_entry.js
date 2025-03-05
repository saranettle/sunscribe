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
        const confirmed = window.confirm("Are you sure you want to save this journal entry?");
        if (!confirmed) return;
    
        try {
            // send STOP to Timer-Service to get the writing time
            const timerService = await fetch('/get-writing-time', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'stop' }), 
            });
    
            if (!timerService.ok) {
                throw new Error(`Failed to communicate with Timer-Service: ${timerService.status}`);
            }
    
            const timerServiceData = await timerService.json();
            console.log('Timer-Service Response:', timerServiceData);
    
            // set up newEntry creation
            const newEntry = {
                text,
                author: username,
                write_time: timerServiceData.response, 
            };
    
            const response = await fetch('/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
            });
    
            if (response.status === 201) {
                alert(`Success!`);
                redirect(`/home/${username}`);
            } else {
                alert(`Uh oh, something went wrong... error = ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving your entry.');
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