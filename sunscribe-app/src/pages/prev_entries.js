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

    // Show loading, error, or the actual entries
    if (loading) return <p>Loading entries...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Menu />
            <div>
                <h2>Previous Entries</h2>
                {entries.length === 0 ? (
                    <p>No entries found for {username}.</p> // If no entries, display a message
                ) : (
                    <ul>
                        {entries.map((entry) => (
                            <li key={entry._id}>
                                {entry.text} {/* Display each entry */}
                            </li>
                        ))}
                    </ul>
                )}
                <p><Link to={`/home/${username}`}>Home</Link></p>
            </div>
        </>
    );
}

export default Prev_Entries;