---
layout: post
title: Paris Waypoints
search_exclude: true
permalink: /travel/paris/wellness_waypoints
menu: nav/paris_hotbar.html
---

<script src="{{site.baseurl}}/navigation/create_and_compete/scripted.js"></script>


<div class="waypoints-container">
   <h1>Wellness Waypoint</h1>

<!-- Accordion Section -->
<div class="accordion">
    <!-- Hospitals Section -->
    <div class="accordion-item">
        <button class="accordion-btn" onclick="toggleAccordion('hospitals-list')">Hospitals</button>
        <div class="accordion-content" id="hospitals-list"></div>
    </div>
    
<!-- Pharmacies Section -->
<div class="accordion-item">
    <button class="accordion-btn" onclick="toggleAccordion('pharmacies-list')">Pharmacies</button>
    <div class="accordion-content" id="pharmacies-list"></div>
</div>

<!-- Recovery Centers Section -->
<div class="accordion-item">
    <button class="accordion-btn" onclick="toggleAccordion('recovery-list')">Recovery Centers</button>
    <div class="accordion-content" id="recovery-list"></div>
</div>
</div>

<!-- Map Section -->
<div id="map" style="height: 400px; margin-top: 20px; border-radius: 10px;"></div>

<!-- Footer Section -->
<footer class="footer">
    <p>&copy; 2024 Wellness Waypoints. All Rights Reserved.</p>
</footer>

   <div class="container">
    <div class="form-container">
        <h2>Map Injury to Care Location</h2>
        <form id="selectionForm">
            <label for="group_id">Select Injury</label>
            <select id="group_id" name="group_id" required>
                <option value="">Select Injury</option>
            </select>
            <label for="channel_id">Care Location</label>
            <select id="channel_id" name="channel_id" required>
                <option value="">Care Location</option>
            </select>
        </form>
        <form id="postForm">
            <button type="submit">Submit Selection</button>
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

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
    // Static Locations Data
const locations = [
    // Hospitals
    { name: "Saint Louis Hospital", type: "hospitals", lat: 48.8566, lng: 2.3522 },
    { name: "Central Clinic", type: "hospitals", lat: 48.8540, lng: 2.3560 },
    { name: "Pitié-Salpêtrière Hospital", type: "hospitals", lat: 48.8389, lng: 2.3664 },
    { name: "Necker Hospital", type: "hospitals", lat: 48.8446, lng: 2.3162 },
    { name: "Georges Pompidou Hospital", type: "hospitals", lat: 48.8414, lng: 2.2774 },
    { name: "Cochin Hospital", type: "hospitals", lat: 48.8410, lng: 2.3340 },
    { name: "Tenon Hospital", type: "hospitals", lat: 48.8722, lng: 2.4005 },

    // Pharmacies
    { name: "Green Pharmacy", type: "pharmacies", lat: 48.8584, lng: 2.3470 },
    { name: "Healthline Pharmacy", type: "pharmacies", lat: 48.8590, lng: 2.3510 },
    { name: "City Care Pharmacy", type: "pharmacies", lat: 48.8665, lng: 2.3311 },
    { name: "Central Paris Pharmacy", type: "pharmacies", lat: 48.8730, lng: 2.2988 },
    { name: "Pharmacie de la Gare", type: "pharmacies", lat: 48.8402, lng: 2.3730 },
    { name: "Pharmacie du Louvre", type: "pharmacies", lat: 48.8626, lng: 2.3362 },
    { name: "Pharmacie Montparnasse", type: "pharmacies", lat: 48.8419, lng: 2.3210 },

    // Recovery Centers
    { name: "Wellness Recovery Center", type: "recovery", lat: 48.8555, lng: 2.3500 },
    { name: "Bright Path Recovery", type: "recovery", lat: 48.8525, lng: 2.3555 },
    { name: "Paris Rehabilitation Center", type: "recovery", lat: 48.8465, lng: 2.3392 },
    { name: "New Beginnings Recovery", type: "recovery", lat: 48.8702, lng: 2.3195 },
    { name: "Hope Recovery Center", type: "recovery", lat: 48.8764, lng: 2.3510 },
    { name: "Unity Rehabilitation Center", type: "recovery", lat: 48.8328, lng: 2.2925 },
];

    // Initialize Map
    const map = L.map("map").setView([48.8566, 2.3522], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap"
    }).addTo(map);

    // Add map markers
    locations.forEach(loc => {
        L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(loc.name);
    });

    // Populate accordion content
    function populateAccordion() {
        const sections = {
            hospitals: document.getElementById("hospitals-list"),
            pharmacies: document.getElementById("pharmacies-list"),
            recovery: document.getElementById("recovery-list"),
        };

        for (let type in sections) {
            sections[type].innerHTML = ""; // Clear existing items
            locations
                .filter(loc => loc.type === type)
                .forEach(loc => {
                    const item = document.createElement("div");
                    item.className = "accordion-item-content";
                    item.textContent = loc.name;
                    item.onclick = () => map.setView([loc.lat, loc.lng], 15); // Center map on location
                    sections[type].appendChild(item);
                });
        }
    }

    // Toggle accordion visibility
    function toggleAccordion(sectionId) {
        const section = document.getElementById(sectionId);
        const isExpanded = section.style.display === "block";

        // Collapse all sections
        document.querySelectorAll(".accordion-content").forEach(content => {
            content.style.display = "none";
        });

        // Expand the clicked section
        if (!isExpanded) {
            section.style.display = "block";
        }
    }

    // Populate accordion on page load
    document.addEventListener("DOMContentLoaded", populateAccordion);
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
                body: JSON.stringify({ section_name: "Wellness Waypoints" }) // Adjust the section name as needed
            });
            if (!response.ok) {
                throw new Error('Failed to fetch groups: ' + response.statusText);
            }
            const groups = await response.json();
            const groupSelect = document.getElementById('group_id');
            groups.forEach(group => {
                const option = document.createElement('option');
                option.value = group.name; // Use group name for payload
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

        // Extract data from form
        const title = document.getElementById('group_id').value;
        const comment = document.getElementById('channel_id').value;
        const channelId = document.getElementById('channel_id').value;

        // Create API payload
        const postData = {
            title: title,
            comment: comment,
            channel_id: channelId
        };

        // Trap errors
        try {
            // Send POST request to backend, purpose is to write to database
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

            // Successful post
            const result = await response.json();
            alert('Guess Submitted successfully!');
            document.getElementById('postForm').reset();
            fetchData(channelId);
        } catch (error) {
            // Present alert on error from backend
            console.error('Error adding guess:', error);
            alert('Error adding guess: ' + error.message);
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

            // Parse the JSON data
            const postData = await response.json();

            // Extract posts count
            const postCount = postData.length || 0;
            // Update the HTML elements with the data
            document.getElementById('count').innerHTML = `<h2>Care Location for Injury Saved ${postCount}</h2>`;

            // Get the details div
            const detailsDiv = document.getElementById('details');
            detailsDiv.innerHTML = ''; // Clear previous posts

            // Iterate over the postData and create HTML elements for each item
            postData.forEach(postItem => {
                const postElement = document.createElement('div');
                postElement.className = 'post-item';
                postElement.innerHTML = `
                    <p>Injury:${postItem.title}</p>
                    <p><strong>Care Location:</strong> ${postItem.channel_name}</p>
                    <p><strong>User:</strong> ${postItem.user_name}</p>
                    <p>${postItem.comment}</p>
                `;
                detailsDiv.appendChild(postElement);
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch groups when the page loads
    fetchGroups();
</script>
</div>


<style>
   .waypointsnguess-container {
       font-family: Arial, sans-serif;
       margin: 0 auto;
       padding: 20px;
       max-width: 800px;
       text-align: center;
       box-shadow: 0 4px 8px rgba(0, 0, 255, 0.2); /* Blue shadow for main container */
       border-radius: 10px;
   }


   h1 {
       font-size: 2em;
       color: #333;
       text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue shadow for heading */
   }


   .guess-box label {
   font-size: 1.5em; /* Make the font size larger */
   color: #333333; /* Dark grey color */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue shadow for label */
   }


   .explanation-box label {
   font-size: 1.5em; /* Make the font size larger */
   color: #333333; /* Dark grey color */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue shadow for label */
   }


   .submit-button {
   font-size: 1.5em; /* Make the font size larger */
   color: #333333; /* Dark grey color */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue shadow for label */
   }
   .waypoints-image-section,
   .explanation-box,
   #feedback-section,
   #leaderboard-section {
       margin-top: 20px;
       padding: 15px;
       background-color: #fff;
       border-radius: 8px;
       box-shadow: 0 4px 6px rgba(0, 0, 255, 0.2); /* Blue shadow for sections */
   }


   .waypoints-image-box {
       display: inline-block;
       box-shadow: 0 4px 8px rgba(0, 0, 255, 0.3); /* Blue shadow for image box */
   }


   .feedback-button label {
   font-size: 1.5em; /* Make the font size larger */
   color: #333333; /* Dark grey color */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue shadow for label */
   }


   .feedback-button {
   font-size: 1.5em; /* Increase font size */
   color: #333333; /* Dark grey text color */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue shadow for text */
   background-color: #007bff; /* Button background color (optional) */
   padding: 10px 20px; /* Add padding for better appearance */
   border: none;
   border-radius: 8px;
   cursor: pointer;
   box-shadow: 0 4px 6px rgba(0, 0, 255, 0.3); /* Blue shadow around button */
   transition: box-shadow 0.3s ease;
   }


   .feedback-button:hover {
   box-shadow: 0 6px 12px rgba(0, 0, 255, 0.4); /* Stronger shadow on hover */
   }
   .waypoints-image {
       max-width: 100%;
       border-radius: 8px;
   }
   .submit-button label {
   font-size: 1.5em; /* Make the font size larger */
   color: #333333; /* Dark grey color */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue shadow for label */
   }
   .submit-button {
   font-size: 1.5em; /* Increase font size */
   color: #333333; /* Dark grey text color */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue shadow for text */
   background-color: #007bff; /* Button background color (optional) */
   padding: 10px 20px; /* Add padding for better appearance */
   border: none;
   border-radius: 8px;
   cursor: pointer;
   box-shadow: 0 4px 6px rgba(0, 0, 255, 0.3); /* Blue shadow around button */
   transition: box-shadow 0.3s ease;
   }


   .submit-button:hover {
   box-shadow: 0 6px 12px rgba(0, 0, 255, 0.4); /* Stronger shadow on hover */
   }


   .modal {
       display: none;
       position: fixed;
       z-index: 1;
       padding-top: 60px;
       left: 0;
       top: 0;
       width: 100%;
       height: 100%;
       background-color: rgba(0, 0, 0, 0.5);
   }


   .modal-content {
       background-color: #fefefe;
       margin: auto;
       padding: 20px;
       border-radius: 10px;
       box-shadow: 0 4px 8px rgba(0, 0, 255, 0.3); /* Blue shadow for modal */
       width: 80%;
       max-width: 500px;
       text-align: center;
       text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue shadow effect */
   }


   .close-button {
       color: #aaa;
       float: right;
       font-size: 28px;
       font-weight: bold;
       cursor: pointer;
   }
   #feedback-modal .modal-content {
   font-size: 1.5em; /* Make the font size larger */
   color: #333333; /* Dark grey text color for all modal content */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue text shadow */
}


#feedback-modal h2 {
   font-size: 2em; /* Larger font size for the heading */
   color: #333333; /* Dark grey text color */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue text shadow for heading */
}


#feedback-modal p {
   font-size: 1.2em; /* Slightly larger font size for paragraph text */
   color: #333333; /* Dark grey text color */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue text shadow for paragraph */
}


#feedback-modal .close-button {
   font-size: 1.5em; /* Font size for the close button */
   color: #333333; /* Dark grey text color */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue text shadow for close button */
   cursor: pointer; /* Pointer cursor for better interactivity */
}


.info-box label {
   font-size: 1.5em; /* Make the font size larger */
   color: #333333; /* Dark grey color */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue shadow for label */
   }


#feedback-section .info-box {
   font-size: 1.5em; /* Make the font size larger */
   color: #333333; /* Dark grey text color for all modal content */
   text-shadow: 1px 1px 5px rgba(0, 0, 255, 0.4); /* Blue text shadow */
}


</style>

<style>
    .container {
        display: flex;
        justify-content: center;
        width: 100%;
        max-width: 1200px;
        padding: 20px;
        box-sizing: border-box;
    }
    .form-container {
        display: flex;
        flex-direction: column;
        max-width: 800px;
        width: 100%;
        background-color: #2C3E50;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        color: #ECF0F1;
    }
    .form-container label {
        margin-bottom: 5px;
    }
    .form-container input, .form-container textarea, .form-container select {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        border: none;
        width: 100%;
    }
    .form-container button {
        padding: 10px;
        border-radius: 5px;
        border: none;
        background-color: #34495E;
        color: #ECF0F1;
        cursor: pointer;
    }

    /* Full-Page Background with Strong Glowing Effect */
body {
    background: linear-gradient(135deg, #1254f0, hsla(277, 87%, 54%, 0.632), #0ee070, #5a67d8);
    background-size: 400% 400%;
    animation: glowingBackground 20s ease infinite;
    font-family: Arial, sans-serif;
    color: #fff;
}

/* Glowing Animation for Background */
@keyframes glowingBackground {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* General container for Zoom N Guess game */
.waypointsnguess-container {
    width: 80%;
    max-width: 600px;
    background-color: rgba(0, 0, 0, 0.9);
    border: 2px solid #007BFF;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 4px 15px rgba(0, 123, 255, 0.5);
    margin: 20px auto;
    text-align: center;
    color: #007BFF;
}

h1, h2 {
    color: #007BFF;
    text-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
}

p, label, .info-box, .leaderboard-box li {
    color: #333;
}

/* Image of the Day Text */
.image-of-day-text {
    font-size: 2em;
    color: rgb(28, 44, 218);
    margin-bottom: 15px;
    text-align: center;
    color: #007BFF;
}

/* Zoom Image Display Section */
.waypoints-image-section {
    margin-bottom: 15px;
}

.waypoints-image-box {
    border: 2px solid #007BFF;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    background-color: #f9f9f9;
    box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.3);
}

/* Additional styles omitted for brevity */


/* Guess Input Box */
.guess-box {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.guess-box input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #007BFF;
    border-radius: 5px;
    color: #007BFF; /* Text color to stand out against white */
    background-color: #f9f9f9;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.guess-box input:focus {
    border-color: #0056b3;
    box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.6); /* Blue glow on focus */
}

/* Explanation Box */
.explanation-box {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
}

.explanation-box textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #2c6bb3;
    border-radius: 5px;
    resize: vertical;
    height: 80px;
    color: #2874a7;
    background-color: #f9f9f9;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.explanation-box textarea:focus {
    border-color: #216088;
    box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.5);
}

/* Submit Button */
.submit-button {
    width: 100%;
    background-color: #007BFF;
    color: #ffffff;
    font-size: 18px;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s ease;
    margin-top: 10px;
    box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.5); /* Glowing shadow */
}

.submit-button:hover {
    background-color: #0056b3;
    transform: scale(1.03);
    box-shadow: 0px 6px 12px rgba(0, 123, 255, 0.6);
}

/* Feedback Button */
.feedback-button {
   width: 100%;
   background-color: #007BFF;
   color: #ffffff;
   font-size: 18px;
   padding: 12px;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s ease;
   margin-top: 10px;
   box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.5);
}

.feedback-button:hover {
   background-color: #0056b3;
   transform: scale(1.03);
   box-shadow: 0px 6px 12px rgba(0, 123, 255, 0.6);
}

/* Comment Button */
.Comment-button {
    width: 100%;
    background-color: #007BFF;
    color: #ffffff;
    font-size: 18px;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s ease;
    margin-top: 10px;
    box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.5);
 }
 
 .Comment-button:hover {
    background-color: #0056b3;
    transform: scale(1.03);
    box-shadow: 0px 6px 12px rgba(0, 123, 255, 0.6);
 }

/* Feedback Section */
#feedback-section {
    margin-top: 20px;
}

#feedback-display {
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #e6d6d6;
    color: #d9534f; /* Red color for feedback text */
    font-weight: bold;
    box-shadow: 0px 2px 6px rgba(217, 83, 79, 0.5); /* Red shadow */
}

/* Leaderboard Styling */
.leaderboard-box {
    list-style-type: none;
    padding: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    padding: 10px;
    margin-top: 10px;
}

.leaderboard-box li {
    padding: 5px 0;
    border-bottom: 1px solid #e0e0e0;
    color: #333;
}

.leaderboard-box li:hover {
    background-color: rgba(0, 123, 255, 0.1);
}

/* Modal Styling */
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 60px;
}

.modal-content {
    background-color: #ffffff;
    margin: 5% auto;
    padding: 20px;
    border: 2px solid #007BFF;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
    text-align: center;
    color: #ffffff;
}

.close-button {
    color: #ffffff;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
}

.close-button:hover {
    color: #007BFF;
}

</style>

<style>
    
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        background: #f5f5f5;
        color: #333;
    }

    .container {
        width: 90%;
        max-width: 1200px;
        margin: 20px auto;
    }

    .header {
        text-align: center;
        margin-bottom: 20px;
    }

    /* Accordion Section */
    .accordion {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .accordion-item {
        background: #007bff;
        color: white;
        border-radius: 5px;
        overflow: hidden;
    }

    .accordion-btn {
        width: 100%;
        background: none;
        border: none;
        padding: 10px;
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        color: white;
    }

    .accordion-btn:hover {
        background-color: #0056b3;
    }

    .accordion-content {
        display: none;
        background: white;
        color: #333;
        padding: 10px;
        border: 1px solid #ccc;
        border-top: none;
    }

    .accordion-item-content {
        padding: 5px;
        cursor: pointer;
    }

    .accordion-item-content:hover {
        background-color: #f0f0f0;
    }

    /* Map Section */
    #map {
        height: 400px;
        margin-top: 20px;
        border-radius: 10px;
    }

    .footer {
        text-align: center;
        margin-top: 20px;
        background: #007bff;
        color: white;
        padding: 10px;
    }

    .search-result {
        margin-top: 10px;
        font-weight: bold;
        color: #333;
    }    
</style>

<style>
   /* Full-Page Background with Strong Glowing Effect */
body {
    background: linear-gradient(135deg, #1254f0, hsla(277, 87%, 54%, 0.632), #0ee070, #5a67d8);
    background-size: 400% 400%;
    animation: glowingBackground 20s ease infinite;
    font-family: Arial, sans-serif;
    color: #fff;
}

/* Glowing Animation for Background */
@keyframes glowingBackground {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
</style> 

