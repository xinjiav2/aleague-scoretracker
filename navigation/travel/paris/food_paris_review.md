---
layout: post
title: Food Paris Review
permalink: /travel/paris/food_paris_review
menu: nav/paris_hotbar.html
---






<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
    }

    .container {
        width: 80%;
        margin: auto;
        margin-top: 20px;
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    h1, h2 {
        text-align: center;
        color: #333;
    }

    form {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin: 10px 0 5px;
        font-weight: bold;
    }

    input, textarea, select, button {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
    }

    select {
        color: #000; /* Text color for dropdowns */
        background-color: #fff; /* Background color for dropdowns */
    }

    button {
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }

    .post-item {
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
        color: #000; /* Set the text color for posts */
    }

    .post-item:last-child {
        border-bottom: none;
    }

    .post-item h3 {
        margin: 0;
        color: #007bff; /* Blue title */
    }

    .post-item p {
        margin: 5px 0;
        color: #000; /* Black for details */
    }

    #count {
        text-align: center;
        margin-bottom: 20px;
    }
</style>


<div class="container">
        <h1>Group and Channel Selector</h1>
        <form id="selectionForm">
            <label for="group_id">Select Group:</label>
            <select id="group_id">
                <option value="">Select a group</option>
        </select>

<label for="channel_id">Select Channel:</label>
<select id="channel_id">
                <option value="">Select a channel</option>
            </select>

<button type="submit">Fetch Posts</button>
</form>

<form id="postForm">
            <h2>Add a Post</h2>
            <label for="title">Post Title:</label>
            <input type="text" id="title" placeholder="Enter post title" required>

<label for="comment">Post Comment:</label>
<textarea id="comment" placeholder="Enter post comment" required></textarea>

<button type="submit">Submit Post</button>
</form>

<div id="count"></div>
        <div id="details"></div>
    </div>


<script type="module">
        import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

        async function fetchGroups() {
            try {
                const response = await fetch(`${pythonURI}/api/groups/filter`, {
                    ...fetchOptions,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ section_name: "Paris Food" })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch groups: ' + response.statusText);
                }
                const groups = await response.json();
                const groupSelect = document.getElementById('group_id');
                groups.forEach(group => {
                    const option = document.createElement('option');
                    option.value = group.name;
                    option.textContent = group.name;
                    groupSelect.appendChild(option);
                });
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        }

        async function fetchChannels(groupName) {
            try {
                const response = await fetch(`${pythonURI}/api/channels/filter`, {
                    ...fetchOptions,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ group_name: groupName })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch channels: ' + response.statusText);
                }
                const channels = await response.json();
                const channelSelect = document.getElementById('channel_id');
                channelSelect.innerHTML = '<option value="">Select a channel</option>';
                channels.forEach(channel => {
                    const option = document.createElement('option');
                    option.value = channel.id;
                    option.textContent = channel.name;
                    channelSelect.appendChild(option);
                });
            } catch (error) {
                console.error('Error fetching channels:', error);
            }
        }

        document.getElementById('group_id').addEventListener('change', function() {
            const groupName = this.value;
            if (groupName) {
                fetchChannels(groupName);
            } else {
                document.getElementById('channel_id').innerHTML = '<option value="">Select a channel</option>';
            }
        });

        document.getElementById('selectionForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const groupId = document.getElementById('group_id').value;
            const channelId = document.getElementById('channel_id').value;
            if (groupId && channelId) {
                fetchData(channelId);
            } else {
                alert('Please select both group and channel.');
            }
        });

        document.getElementById('postForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const comment = document.getElementById('comment').value;
            const channelId = document.getElementById('channel_id').value;

            const postData = {
                title: title,
                comment: comment,
                channel_id: channelId
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
                    throw new Error('Failed to add post: ' + response.statusText);
                }

                alert('Post added successfully!');
                document.getElementById('postForm').reset();
                fetchData(channelId);
            } catch (error) {
                console.error('Error adding post:', error);
                alert('Error adding post: ' + error.message);
            }
        });

        async function fetchData(channelId) {
            try {
                const response = await fetch(`${pythonURI}/api/posts/filter`, {
                    ...fetchOptions,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ channel_id: channelId })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch posts: ' + response.statusText);
                }

                const postData = await response.json();
                const postCount = postData.length || 0;
                document.getElementById('count').innerHTML = `<h2>Count ${postCount}</h2>`;
                const detailsDiv = document.getElementById('details');
                detailsDiv.innerHTML = '';
                postData.forEach(postItem => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post-item';
                    postElement.innerHTML = `
                        <h3>${postItem.title}</h3>
                        <p><strong>Channel:</strong> ${postItem.channel_name}</p>
                        <p><strong>User:</strong> ${postItem.user_name}</p>
                        <p>${postItem.comment}</p>
                    `;
                    detailsDiv.appendChild(postElement);
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchGroups();
</script>

