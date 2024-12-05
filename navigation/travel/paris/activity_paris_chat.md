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

<script>
document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        const msgDiv = document.createElement('div');
        msgDiv.textContent = message;
        document.getElementById('messages').appendChild(msgDiv);
        input.value = '';
        document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;
    }
});
</script>