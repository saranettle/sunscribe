import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function WordCountDisplay() {
    const { username } = useParams();
    const [wordCount, setWordCount] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWordCount = async () => {
            try {
                const response = await fetch(`/get-word-count/${username}`);
                if (!response.ok) throw new Error("Failed to fetch word count");
                
                const data = await response.json();
                setWordCount(data.wordCount);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchWordCount();
    }, [username]);

    if (error) return <p>Error: {error}</p>;

    return <p>Total Words Written: {wordCount !== null ? wordCount : "Loading..."}</p>;
}

export default WordCountDisplay;
