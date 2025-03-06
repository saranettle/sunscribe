import { React } from 'react';
import { useParams, Link } from 'react-router-dom';

function TestEmailButton({ email }) {

    const handleClick = async () => {

        const confirmed = window.confirm(`Send a test notification email to ${ email }?`);
        if (!confirmed) return;
        
        try {
            const response = await fetch('/test-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
    
            console.log('User email sent to the email-service');
        } catch (error) {
            console.error('Error sending message to Email-Service:', error);
        }
    };
    

    return (
        <>
                
            <button onClick={handleClick}>Click Here to Test Email Notifications</button>
             
        </>
    );
}

export default TestEmailButton;