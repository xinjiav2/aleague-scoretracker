---
layout: post
title: Paris Activity Chat
permalink: /travel/Paris/activity/chat
menu: nav/paris_hotbar.html
---

<h1>Simple Chat Room</h1>
<div id="chat-window">
    <div id="messages"></div>
</div>
<form id="chat-form">
    <input type="text" id="chat-input" placeholder="Type your message..." required />
    <button type="submit">Send</button>
</form>

<style>
body {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f4f4f9;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

#chat-window {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    background: white;
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 20px;
}

#messages div {
    margin: 10px 0;
    padding: 8px;
    border-radius: 8px;
    background-color: #2196f3; /* Brighter blue */
    color: white; /* White text */
    max-width: 70%;
}

#chat-form {
    display: flex;
    gap: 10px;
}

#chat-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

button {
    padding: 10px;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>

<script type="module">
import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';
document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        
        const msgDiv = document.createElement('div');
        msgDiv.textContent = message;
        document.getElementById('messages').appendChild(msgDiv);
        submitPost(message);
        
        const response = await sendToGeminiAPI(message);

        const responseDiv = document.createElement('div');
        responseDiv.textContent = response;

        console.log(response)
        document.getElementById('messages').appendChild(responseDiv);

        input.value = '';
        document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;
    }
});

async function sendToGeminiAPI(userMessage) {
        const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDS3SPkR0UScS4ZLziJM77Sbd7EJNPjk2A";
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `You are a travel agent who is supposed to help to users with any questions they have about traveling. Your goal is to sound natural, relatable, and like an agent. You may refer to online budgets, travel times, locations, and anything else travel-related. If asked something complex, admit you might not know the full answer. ${userMessage}` }]
                    }]
                })
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error communicating with Gemini API:', error);
            return "An error occurred while communicating with the AI.";
        }
    }

async function submitPost(userMessage) {
    const title = "Title";
        const content = userMessage;
        const channel_id = 2;
        const postData = {
            title: title,
            comment: content,
            channel_id: channel_id
        };
        try {
            const response = await fetch(`${pythonURI}/api/post`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to add channel: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error adding channel:', error);
            alert('Error adding channel: ' + error.message);
        }
}
</script>
