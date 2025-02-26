import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Menu from '../components/menu';

function Prev_Entries() {
    const { username } = useParams(); // Get username from the URL params
    const [entries, setEntries] = useState([]); // Store entries in state
    const [loading, setLoading] = useState(true); // Loading state for async fetch
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch(`/entries/${username}`); // Fetch entries by author
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                setEntries(data); // Store fetched entries
            } catch (err) {
                setError(err.message); // Set error message if fetch fails
            } finally {
                setLoading(false); // Set loading to false once fetch is complete
            }
        };

        fetchEntries(); // Call the function when the component mounts
    }, [username]); // Fetch entries when username changes

    const handleDelete = async (id) => {

        const confirmed = window.confirm("Are you sure you want to delete this journal entry?")

        if (confirmed) {

            try {
                const response = await fetch(`/entries/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`Failed to delete entry: ${response.statusText}`);
                }
                // Remove the deleted entry from state
                setEntries(entries.filter(entry => entry._id !== id));
            } catch (err) {
                setError(err.message);
            }
        };

        }
        

    // Show loading, error, or the actual entries
    if (loading) return <p>Loading entries...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            

            <Row>
            <Col sm={12} md={4}>
              <Menu />
            </Col>

            <Col>
            <h2 class="user_heading">Previous Entries</h2>
            <div id="prev_entries">
                
                {entries.length === 0 ? (
                    <p>No entries found for {username}.</p> // If no entries, display a message
                ) : (
                    <ul>
                                {entries.map((entry, index) => (
                                    <React.Fragment key={entry._id}>
                                        <li>
                                            {entry.text}
                                            <button 
                                                onClick={() => handleDelete(entry._id)}
                                                id="delete_button">
                                                Delete
                                            </button>
                                        </li>
                                        {index < entries.length - 1 && <li>-----------------------------------</li>}
                                    </React.Fragment>
                                ))}
                            </ul>
                )}
                
            </div>
            <Link to={`/home/${username}`}><button class="user_button">Go Back</button></Link>
            </Col>
            </Row>
        </>
    );
}

export default Prev_Entries;