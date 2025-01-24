---
layout: post 
title: Paris Activity Planner
permalink: /travel/Paris/activity
menu: nav/paris_hotbar.html
---
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


<h2>Submit Your Rating</h2>
<form id="ratingForm">
    <label for="post_id">Post ID:</label>
    <input type="text" id="post_id" name="post_id" required><br><br>
    <label for="rating">Rating (1-10):</label>
    <input type="number" id="rating" name="rating" min="1" max="10" required><br><br>
    <button type="submit">Submit Rating</button>
</form>

<h2>Update Your Rating</h2>
<form id="updateForm">
    <label for="update_post_id">Post ID:</label>
    <input type="text" id="update_post_id" name="update_post_id" required><br><br>
    <label for="update_rating">New Rating (1-10):</label>
    <input type="number" id="update_rating" name="update_rating" min="1" max="10" required><br><br>
    <button type="submit">Update Rating</button>
</form>

<h2>Delete Your Rating</h2>
<form id="deleteForm">
    <label for="delete_post_id">Post ID:</label>
    <input type="text" id="delete_post_id" name="delete_post_id" required><br><br>
    <button type="submit">Delete Rating</button>
</form>

<h2>Rating</h2>
<div id="rating-display">Loading rating...</div>

<h2>Ratings Table</h2>
<div id="ratings-table-container">
    
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

    // This helpsr eturn the rating or returns 0 if no data found
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
        body: JSON.stringify({ post_id: postId, rating: rating }) // Correctly format the JSON body
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

    headerRow.appendChild(headerPostID);
    headerRow.appendChild(headerRating);
    table.appendChild(headerRow);

    for (let postID = 1; postID <= 10; postID++) {
        const rating = await rateFetch(postID);
        if (rating !== 0) {
            const row = document.createElement('tr');
            const cellPostID = document.createElement('td');
            cellPostID.textContent = postID;
            const cellRating = document.createElement('td');
            cellRating.textContent = rating;

            row.appendChild(cellPostID);
            row.appendChild(cellRating);
            table.appendChild(row);
        }
    }

    tableContainer.appendChild(table);
}

// Event listener for form submission to post a rate
document.getElementById('ratingForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const postId = document.getElementById('post_id').value;
    const rating = document.getElementById('rating').value;

    await submitRate(postId, rating);
});

// Event listener for form submission to update a rate
document.getElementById('updateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const postId = document.getElementById('update_post_id').value;
    const rating = document.getElementById('update_rating').value;

    await updateRate(postId, rating);
});

// Event listener for form to delete a rate
document.getElementById('deleteForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const postId = document.getElementById('delete_post_id').value;

    await deleteRate(postId);
});

// Initial fetch to display the table
createRatingsTable();
</script>