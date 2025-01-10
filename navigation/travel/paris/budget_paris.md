---
layout: post
title: Paris Budget
search_exclude: true
permalink: /travel/Paris/budget
menu: nav/paris_hotbar.html
---
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #FDF5E6;
        }
        .header {
            background: black;
            color: #add8e6;
            text-align: center;
            padding: 20px;
            border-radius: 8px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .form-container {
            margin: 20px 0;
            padding: 15px;
            border: 2px solid #add8e6;
            border-radius: 8px;
            background: black;
            color: white;
        }
        .form-container h2 {
            margin-bottom: 15px;
        }
        .form-container label {
            display: block;
            margin-bottom: 8px;
        }
        .form-container input,
        .form-container select,
        .form-container textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #add8e6;
            border-radius: 5px;
        }
        .form-container button {
            padding: 10px 20px;
            background-color: #FFD700;
            border: none;
            color: black;
            cursor: pointer;
            border-radius: 5px;
        }
        .form-container button:hover {
            background-color: #C5B358;
        }
        .budget-summary {
            margin: 20px 0;
            padding: 15px;
            border: 2px solid #add8e6;
            border-radius: 8px;
            background: black;
            color: white;
        }
        .budget-summary h3 {
            color: #add8e6;
        }
        .category {
            margin: 20px 0;
            padding: 15px;
            border: 2px solid #add8e6;
            border-radius: 8px;
            background: black;
            color: white;
        }
        .post-item {
            border: 1px solid #add8e6;
            border-radius: 15px;
            background-color: #073461;
            margin-bottom: 20px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease-in-out;
            color: white;
        }
        .post-item:hover {
            transform: scale(1.02);
        }
        .post-item h3 {
            margin-top: 0;
            color: #add8e6;
            border-bottom: 1px solid #add8e6;
            padding-bottom: 5px;
        }
        .post-item p {
            margin: 10px 0;
            color: #E6E6FA;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        th, td {
            padding: 10px;
            text-align: center;
            border: 1px solid #add8e6;
        }
        th {
            background-color: #add8e6;
            color: black;
        }
        td {
            background-color: #073461;
            color: white;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Trip Budget Planner</h1>
        <p>Plan your budget plan for Paris!</p>
    </div>
    <div class="container">
        <div class="form-container">
            <h2>Set Your Trip Budget</h2>
            <form id="budgetForm">
                <label for="budget">Enter your total budget (USD):</label>
                <input type="number" id="budget" name="budget" required placeholder="Enter amount" step="0.01">
                <button type="submit">Set Budget</button>
            </form>
        </div>
    </div>
    <div class="container">
        <div class="form-container">
            <h2>See reviews on value-to-price choices:</h2>
            <form id="selectionForm">
                <label for="group_id">Group:</label>
                <select id="group_id" name="group_id" required>
                    <option value="">Select a group</option>
                </select>
                <label for="channel_id">Channel:</label>
                <select id="channel_id" name="channel_id" required>
                    <option value="">Select a channel</option>
                </select>
                <button type="submit">Select</button>
            </form>
            <a href="chat" style="display: inline-block; margin-top: 20px;">
                <button type="button">Join a Chatroom about these choices!</button>
            </a>
        </div>
    </div>
    <div class="container">
        <div class="form-container">
            <h2>Make a post:</h2>
            <form id="postForm">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required>
                <label for="comment">Comment:</label>
                <textarea id="comment" name="comment" required></textarea>
                <button type="submit">Post</button>
            </form>
        </div>
    </div>
    <div class="container">
        <div id="data" class="data">
            <div class="left-side">
                <p id="count"></p>
            </div>
            <div class="details" id="details">
            </div>
        </div>
    </div>
    <div class="container">
        <div class="budget-summary" id="budgetSummary">
            <h3>Your Budget Summary</h3>
            <p id="budgetStatus">Set your budget to see the summary.</p>
            <table id="budgetTable" style="display:none;">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount (USD)</th>
                        <th>Percentage of Total Budget</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Activities</td>
                        <td id="activitiesAmount">$0</td>
                        <td id="activitiesPercentage">0%</td>
                    </tr>
                    <tr>
                        <td>Hotels</td>
                        <td id="hotelsAmount">$0</td>
                        <td id="hotelsPercentage">0%</td>
                    </tr>
                    <tr>
                        <td>Transportation</td>
                        <td id="transportationAmount">$0</td>
                        <td id="transportationPercentage">0%</td>
                    </tr>
                    <tr>
                        <td>Food</td>
                        <td id="foodAmount">$0</td>
                        <td id="foodPercentage">0%</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td id="totalAmount">$0</td>
                        <td>100%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="container">
        <div class="category">
            <h2>Budget Tips</h2>
            <div class="post-item">
                <h3>Budget-Saving Tip</h3>
                <p>Consider staying in budget hostels or using public transportation instead of taxis for savings!</p>
            </div>
        </div>
    </div>
    <div class="container">
        <h1>Currency Converter</h1>
        <table>
            <thead>
                <tr>
                    <th>Symbol</th><th>Name</th><th>Symbol</th><th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>CNY</td><td>Chinese Yuan</td><td>GBP</td><td>British Pound</td>
                </tr>
                <tr>
                    <td>CHF</td><td>Swiss Franc</td><td>NZD</td><td>New Zealand Dollar</td>
                </tr>
                <tr>
                    <td>AUD</td><td>Australian Dollar</td><td>KRW</td><td>South Korean Won</td>
                </tr>
                <tr>
                    <td>PLN</td><td>Polish Zloty</td><td>DKK</td><td>Danish Krone</td>
                </tr>
                <tr>
                    <td>TRY</td><td>Turkish Lira</td><td>HKD</td><td>Hong Kong Dollar</td>
                </tr>
            </tbody>
        </table>
        <div class="form-container">
            <label for="have">From (e.g., GBP):</label>
            <input type="text" id="have" placeholder="Currency code" required>
            <label for="want">To (e.g., AUD):</label>
            <input type="text" id="want" placeholder="Currency code" required>
            <label for="amount">Amount:</label>
            <input type="number" id="amount" placeholder="Enter amount" required>
            <button id="convertButton">Convert</button>
        </div>
        <div id="conversionResult"></div>
    </div>

<script>
    document.getElementById('budgetForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const budget = Number(document.getElementById('budget').value);
        if (budget > 0) {
            document.getElementById('budgetStatus').textContent = `Total Budget: $${budget}`;
            document.getElementById('totalAmount').textContent = `$${budget}`;
            const activities = budget * 0.30;
            const hotels = budget * 0.40; 
            const transportation = budget * 0.30; 
            document.getElementById('activitiesAmount').textContent = `$${activities}`;
            document.getElementById('activitiesPercentage').textContent = `${(activities / budget * 100)}%`;
            document.getElementById('hotelsAmount').textContent = `$${hotels.toFixed(2)}`;
            document.getElementById('hotelsPercentage').textContent = `${(hotels / budget * 100)}%`;
            document.getElementById('transportationAmount').textContent = `$${transportation}`;
            document.getElementById('transportationPercentage').textContent = `${(transportation / budget * 100)}%`;
            document.getElementById('budgetTable').style.display = 'table';
        } else {
            alert("Please enter a valid positive number.");
        }
    });
    document.getElementById('convertButton').addEventListener('click', function() {
        const have = document.getElementById('have').value.trim();
        const want = document.getElementById('want').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const resultElement = document.getElementById('conversionResult');
        // Validate input fields
        if (!have || !want || !amount) {
            resultElement.textContent = 'Please fill out all fields.';
            return;
        }
        // Make a request to the backend API (Flask)
        fetch(`http://127.0.0.1:8887/api/convertcurrency?have=${have}&want=${want}&amount=${amount}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            if (result.new_amount) {
                resultElement.textContent = `${amount} ${have} = ${result.new_amount} ${want}`;
            } else {
                resultElement.textContent = `Error: Unable to convert currency.`;
            }
        })
        .catch(error => {
            resultElement.textContent = `Error: ${error.message}`;
        });
    });
</script>

    
<script type="module">
    // Import server URI and standard fetch options
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    /**
     * Fetch groups for dropdown selection
     * User picks from dropdown
     */
    async function fetchGroups() {
        try {
            const response = await fetch(`${pythonURI}/api/groups/filter`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ section_name: "Shared Interest" })
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

    /**
     * Fetch channels based on selected group
     * User picks from dropdown
     */
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
            channelSelect.innerHTML = '<option value="">Select a channel</option>'; // Reset channels
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

    /**
      * Handle group selection change
      * Channel Dropdown refresh to match group_id change
      */
    document.getElementById('group_id').addEventListener('change', function() {
        const groupName = this.value;
        if (groupName) {
            fetchChannels(groupName);
        } else {
            document.getElementById('channel_id').innerHTML = '<option value="">Select a channel</option>'; // Reset channels
        }
    });

    /**
     * Handle form submission for selection
     * Select Button: Computer fetches and displays posts
     */
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

    /**
     * Handle form submission for adding a post
     * Add Form Button: Computer handles form submission with request
     */
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

            const result = await response.json();
            alert('Post added successfully!');
            document.getElementById('postForm').reset();
            fetchData(channelId);
        } catch (error) {
            console.error('Error adding post:', error);
            alert('Error adding post: ' + error.message);
        }
    });

    /**
     * Fetch posts based on selected channel
     * Handle response: Fetch and display posts
     */
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