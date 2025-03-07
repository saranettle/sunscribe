import { useState, useEffect } from 'react';

const RandomPrompt = () => {
    
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        const getPrompt = async () => {
            try {
                const response = await fetch('/get-prompt'); 
                if (!response.ok) throw new Error('Failed to fetch prompt');
                const data = await response.json();
                setPrompt(data.response); 
            } catch (error) {
                console.error('Error fetching prompt:', error);
                setPrompt("What do you hope to accomplish today? How will you achieve your goals?"); // Fallback prompt
            }
        };
        getPrompt();
    }, []);

    return prompt; 
};

export default RandomPrompt;
