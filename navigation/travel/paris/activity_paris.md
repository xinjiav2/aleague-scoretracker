---
layout: post 
title: Paris Activity Planner
permalink: /travel/Paris/activity
menu: nav/paris_hotbar.html
---

<!--
<div class="container">
    <div class="card">
        <a href="{{site.baseurl}}/travel/Paris/activity/chat">
            <img src="{{site.baseurl}}/images/eiffel_paris.jpg" alt="Eiffel Tower">
            <p>Eiffel Tower</p>
        </a>
    </div>
    <div class="card">
        <a href="{{site.baseurl}}/travel/Paris/activity/chat">
            <img src="{{site.baseurl}}/images/louvre_paris.jpeg" alt="Louvre Museum" height="100" width="500">
            <p>Louvre Museum</p>
        </a>
    </div>
    <div class="card">
        <a href="{{site.baseurl}}/travel/Paris/activity/chat">
            <img src="{{site.baseurl}}/images/notre_dame_paris.jpeg" alt="Notre-Dame Cathedral">
            <p>Notre-Dame Cathedral</p>
        </a>
    </div>
    <div class="card">
        <a href="{{site.baseurl}}/travel/Paris/activity/chat">
            <img src="{{site.baseurl}}/images/palace_versailles_paris.jpg" alt="Palace of Versailles">
            <p>Palace of Versailles</p>
        </a>
    </div>
    <div class="card">
        <a href="{{site.baseurl}}/travel/Paris/activity/chat">
            <img src="{{site.baseurl}}/images/champs-elysees.jpeg" alt="Champs-Élysées">
            <p>Champs-Élysées</p>
        </a>
    </div>
</div>

<style>
h1 {
    text-align: center;
    font-size: 2rem;
    color: #007bff;
    margin: 20px 0;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}

.card {
    text-align: center;
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s;
}

.card:hover {
    transform: scale(1.05);
}

.card img {
    width: 100%;
    height: auto;
}

.card p {
    margin: 10px 0;
    font-size: 1rem;
    color: #333;
}

.card a {
    text-decoration: none;
    color: #007bff;
}

.card a:hover {
    color: #0056b3;
}
</style>
-->

<h2>Rating</h2>
<div id="rating-display">Loading rating...</div>

<h2>Ratings Table</h2>
<div id="ratings-table-container"></div>

<button id="createNewRatingBtn">Create New Rating</button>

<style>
    .ratings-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    .ratings-table th, .ratings-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    .ratings-table th {
        background-color: #f2f2f2;
        color: #000;
    }

    .edit-rating-input {
        width: 50px;
        text-align: center;
    }

    .action-btn {
        background-color: #007bff;
        color: white;
        padding: 5px 10px;
        border: none;
        cursor: pointer;
    }

    .action-btn:hover {
        background-color: #0056b3;
    }

    .create-rating-btn {
        background-color: #28a745;
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
        margin-top: 20px;
    }

    .create-rating-btn:hover {
        background-color: #218838;
    }
</style>

<script type="module">
    import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    // Function to fetch the rating for a given post ID
    async function rateFetch(postID) {
        const response = await fetch(`${pythonURI}/api/rate?post_id=${postID}`, {
            ...fetchOptions,
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        const data = await response.json();
        return data.length > 0 ? data[0].rating : 0;
    }

    // Function to fetch and display the rating for a specific post ID
    async function fetchAndDisplayRating(postID) {
        const rating = await rateFetch(postID);
        document.getElementById('rating-display').textContent = `Rating for post ID ${postID}: ${rating}`;
    }

    // Function to submit a rate (rating) for a given post ID
    async function submitRate(postId, rating) {
        await fetch(`${pythonURI}/api/rate`, {
            ...fetchOptions,
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post_id: postId, rating: rating })
        });

        fetchAndDisplayRating(postId); // Refresh the rating after submitting a new rate
        createRatingsTable(); // Refresh the table
    }

    // Function to update a rate for a specific post ID
    async function updateRate(postId, rating) {
        await fetch(`${pythonURI}/api/rate`, {
            ...fetchOptions,
            method: 'PUT',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post_id: postId, rating: rating })
        });

        fetchAndDisplayRating(postId); // Refresh the rating after updating it
        createRatingsTable(); // Refresh the table
    }

    // Function to delete a rate for a specific post ID
    async function deleteRate(postId) {
        await fetch(`${pythonURI}/api/rate`, {
            ...fetchOptions,
            method: 'DELETE',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post_id: postId })
        });

        document.getElementById('rating-display').textContent = `Rating for post ID ${postId} has been deleted.`;
        createRatingsTable(); // Refresh the table
    }

    // Function to create and display the ratings table
    async function createRatingsTable() {
        const tableContainer = document.getElementById('ratings-table-container');
        tableContainer.innerHTML = ''; // Clear existing content

        const table = document.createElement('table');
        table.className = 'ratings-table';

        const headerRow = document.createElement('tr');
        const headerPostID = document.createElement('th');
        headerPostID.textContent = 'Post ID';
        const headerRating = document.createElement('th');
        headerRating.textContent = 'Rating';
        const headerActions = document.createElement('th');
        headerActions.textContent = 'Actions';

        headerRow.appendChild(headerPostID);
        headerRow.appendChild(headerRating);
        headerRow.appendChild(headerActions);
        table.appendChild(headerRow);

        // Iterate over the post IDs (1 to 10)
        for (let postID = 1; postID <= 10; postID++) {
            const rating = await rateFetch(postID);
            if (rating !== 0) {
                const row = document.createElement('tr');
                const cellPostID = document.createElement('td');
                cellPostID.textContent = postID;
                const cellRating = document.createElement('td');

                // Rating input field for inline editing
                const ratingInput = document.createElement('input');
                ratingInput.type = 'number';
                ratingInput.value = rating;
                ratingInput.min = 1;
                ratingInput.max = 10;
                ratingInput.className = 'edit-rating-input';

                cellRating.appendChild(ratingInput);

                const cellActions = document.createElement('td');

                // Action buttons (update and delete)
                const updateBtn = document.createElement('button');
                updateBtn.textContent = 'Update';
                updateBtn.className = 'action-btn';
                updateBtn.onclick = async function() {
                    const newRating = ratingInput.value;
                    await updateRate(postID, newRating);
                };

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'action-btn';
                deleteBtn.onclick = async function() {
                    await deleteRate(postID);
                };

                cellActions.appendChild(updateBtn);
                cellActions.appendChild(deleteBtn);

                row.appendChild(cellPostID);
                row.appendChild(cellRating);
                row.appendChild(cellActions);
                table.appendChild(row);
            }
        }

        tableContainer.appendChild(table);
    }

    // Function to handle new rating creation
    async function handleNewRatingCreation() {
        const postId = prompt("Enter a new Post ID (1-10):");
        if (postId >= 1 && postId <= 10) {
            const rating = prompt("Enter the rating (1-10):");
            if (rating >= 1 && rating <= 10) {
                await submitRate(postId, rating);
            } else {
                alert("Please enter a valid rating (1-10).");
            }
        } else {
            alert("Please enter a valid Post ID (1-10).");
        }
    }

    // Event listener for the "Create New Rating" button
    document.getElementById('createNewRatingBtn').addEventListener('click', handleNewRatingCreation);

    // Initial fetch to display the table
    createRatingsTable();
</script>
