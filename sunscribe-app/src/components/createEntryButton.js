import { React } from 'react';
import { useParams, Link } from 'react-router-dom';

function CreateEntryButton() {

    const { username } = useParams();

    const handleClick = async () => {
        
        try {
            const response = await fetch('/send-start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'start' }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
    
            console.log('Message sent to Timer-Service: start');
        } catch (error) {
            console.error('Error sending message to Timer-Service:', error);
        }
    };
    

    return (
        <>
                
            <div id="user_homepage" onClick={handleClick}>
                <Link to={`/new/${username}`}>
                    <h2>New Entry</h2>
                </Link>
            </div>
             
        </>
    );
}

export default CreateEntryButton;