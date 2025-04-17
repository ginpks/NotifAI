import "./genAI.css";
import React, { useState } from 'react';
import axios from 'axios';

const initialHistory = []; 


const GenAI = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [chatHistory, setChatHistory] = useState(initialHistory); 
    const [isLoading, setIsLoading] = useState(false);

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    }

    const promptHandler = async () => {
        // checking if prompt is empty
        if (!prompt.trim()) return;
        setIsLoading(true);
        setResponse('');

        try {
            // clearing prompt field after send
            setPrompt('');

            // Send a POST request to the backend endpoint
            const result = await axios.post("http://localhost:3000/genAI/gemini-prompt", {
                prompt: prompt, // user's typed in prompt
                history: chatHistory // existing chat history
            });

            // extracting the response from gemini
            const aiResponseText = result.data.generatedText;

            // displaying it on frontend
            setResponse(aiResponseText);

            // updating chat history
            setChatHistory([
                ...chatHistory,
                { role: "user", parts: [{ text: prompt }] },
                { role: "model", parts: [{ text: aiResponseText }]}
            ])

        } catch (error) {
            console.log("uh oh we have an error with the prompt")
        } finally {
            setIsLoading(false);
        }
    }
    const handleKeyDown = (event) => {
        // Check if Enter key was pressed and Shift key was NOT pressed
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent default behavior (adding a new line)
            promptHandler(); // Call the existing prompt handler
        }
    }

    return (
        <div className="promptContainer">
            <div className="gemini-response-display">
                <h4>Gemini Response:</h4>
                {isLoading ? <pre>Generating response...</pre> : <pre>{response}</pre>}
            </div>
            <textarea
                className="genai-prompt-textarea"
                placeholder="Ask for help!" 
                rows="10" 
                cols="60" 
                value={prompt}
                onChange={handlePromptChange} 
                onKeyDown={handleKeyDown}
                disabled={isLoading}
            />
            <button id="send" onClick={promptHandler} disabled={isLoading || !prompt.trim()}>{isLoading ? 'Sending...' : 'Send'}</button>
        </div>
    )
}

export default GenAI;