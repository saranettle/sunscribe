import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Menu from '../components/menu';

import TestEmailButton from '../components/testEmailButton';

function EditAccount() {
    const { username } = useParams();
    const navigate = useNavigate(); // For redirecting after update

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // 🔽 Fetch current user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/users/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                console.log('Fetched user data:', data);
                setEmail(data.email); // Set email from fetched data
               
            } catch (err) {
                setError('Error fetching user details.');
            }
        };
        fetchUserData();
    }, [username]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');
    
        const updateData = {};
        if (email) updateData.email = email;
        if (password) updateData.password = password; // Only send if provided
    
        try {
            const response = await fetch(`/edit_account/${username}`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData),
            });
            
    
            if (!response.ok) {
                throw new Error('Failed to update account.');
            }
    
            const updatedUser = await response.json();
            setSuccessMessage('Account updated successfully!');
            setPassword(''); 
    
            setTimeout(() => {
                navigate(`/home/${username}`); // Redirect user after update
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <>
            <Row>
                <Col sm={12} md={4}>
                    <Menu />
                </Col>
                <Col>
                    <h2 className="user_heading">Edit User Settings for {username}</h2>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}  // Ensure the input reflects the state
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label>New Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>
                        <button type="submit">Update Account Settings</button>
                    </form>
                    <TestEmailButton email={email}/>
                    <button onClick={() => navigate(-1)}>Cancel</button>
                </Col>
            </Row>
        </>
    );
}

export default EditAccount;