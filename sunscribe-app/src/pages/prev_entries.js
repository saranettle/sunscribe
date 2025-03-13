import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Menu from '../components/menu';

function PrevEntries() {
    const { username } = useParams();
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch(`/entries/${username}`);
                if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
                const data = await response.json();
                setEntries(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEntries();
    }, [username]);

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
        
    const formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleString(); // Converts to readable date-time format
    };

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
                    <h2 className="user_heading">Previous Entries</h2>
                    <div id="prev_entries">
                        {entries.length === 0 ? (
                            <p>No entries found for {username}.</p>
                        ) : (
                            <ul>
                                {entries.map((entry, index) => (
                                    <React.Fragment key={entry._id}>
                                        <li>
                                            <p><strong>Entry:</strong> {entry.text}</p>
                                            <p><strong>Created At:</strong> {formatDate(entry.create_time)}</p>
                                            <p><strong>Time Spent Writing:</strong> {entry.write_time} seconds</p>
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
                    <Link to={`/home/${username}`}><button className="user_button">Go Back</button></Link>
                </Col>
            </Row>
        </>
    );
}

export default PrevEntries;