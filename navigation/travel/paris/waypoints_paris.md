---
layout: post 
title: Paris Waypoints
search_exclude: true
permalink: /travel/paris/wellness_waypoints
menu: nav/paris_hotbar.html
---

<div class="container">
<!-- Header Section -->
<header class="header">
    <h1>Wellness Waypoints</h1>
    <p>Your one-stop guide to health and wellness resources.</p>
</header>

<!-- Search Section -->
<div class="search-section">
    <input type="text" id="searchInput" placeholder="Search for resources">
    <button class="search-btn" onclick="searchItem()">Search</button>
</div>

<!-- User Need Input Section -->
<div class="search-section">
    <input type="text" id="needInput" placeholder="Enter your need (e.g., broken bone, bloody nose)">
    <button class="search-btn" onclick="findLocationByNeed()">Find Help</button>
</div>

<!-- Filters Section -->
<div class="filters">
    <h2>Health Resource Filters</h2>
    <div class="dropdown">
        <button class="filter-btn" onclick="toggleDropdown('hospitals-dropdown')">Hospitals</button>
        <div class="dropdown-content" id="hospitals-dropdown"></div>
    </div>
    <div class="dropdown">
        <button class="filter-btn" onclick="toggleDropdown('pharmacies-dropdown')">Pharmacies</button>
        <div class="dropdown-content" id="pharmacies-dropdown"></div>
    </div>
    <div class="dropdown">
        <button class="filter-btn" onclick="toggleDropdown('recovery-dropdown')">Recovery Centers</button>
        <div class="dropdown-content" id="recovery-dropdown"></div>
    </div>
</div>

<!-- Map Section -->
<div id="map" style="height: 400px; margin-top: 20px; border-radius: 10px;"></div>

<!-- Footer Section -->
<footer class="footer">
    <p>&copy; 2024 Wellness Waypoints. All Rights Reserved.</p>
    <a href="#">Contact Us</a> | <a href="#">Privacy Policy</a>
</footer>
</div>

<!-- Leaflet.js for Map -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- JavaScript -->
<script>
// Static Locations Data
const locations = [
    // Hospitals
    { name: "Saint Louis Hospital", type: "hospitals", lat: 48.8566, lng: 2.3522 },
    { name: "Central Clinic", type: "hospitals", lat: 48.8540, lng: 2.3560 },
    { name: "Pitié-Salpêtrière Hospital", type: "hospitals", lat: 48.8389, lng: 2.3664 },
    { name: "Necker Hospital", type: "hospitals", lat: 48.8446, lng: 2.3162 },
    { name: "Georges Pompidou Hospital", type: "hospitals", lat: 48.8414, lng: 2.2774 },
    { name: "Lariboisière Hospital", type: "hospitals", lat: 48.8803, lng: 2.3554 },
    { name: "Robert Debré Hospital", type: "hospitals", lat: 48.8905, lng: 2.4050 },

    // Pharmacies
    { name: "Green Pharmacy", type: "pharmacies", lat: 48.8584, lng: 2.3470 },
    { name: "Healthline Pharmacy", type: "pharmacies", lat: 48.8590, lng: 2.3510 },
    { name: "City Care Pharmacy", type: "pharmacies", lat: 48.8665, lng: 2.3311 },
    { name: "Central Paris Pharmacy", type: "pharmacies", lat: 48.8730, lng: 2.2988 },
    { name: "Pharmacie de la Gare", type: "pharmacies", lat: 48.8443, lng: 2.3711 },
    { name: "Pharmacie Bastille", type: "pharmacies", lat: 48.8537, lng: 2.3691 },
    { name: "Champs-Élysées Pharmacy", type: "pharmacies", lat: 48.8698, lng: 2.3065 },

    // Recovery Centers
    { name: "Wellness Recovery Center", type: "recovery", lat: 48.8555, lng: 2.3500 },
    { name: "Bright Path Recovery", type: "recovery", lat: 48.8525, lng: 2.3555 },
    { name: "Paris Rehabilitation Center", type: "recovery", lat: 48.8465, lng: 2.3392 },
    { name: "Recovery House Montparnasse", type: "recovery", lat: 48.8437, lng: 2.3234 },
    { name: "Seine River Recovery Center", type: "recovery", lat: 48.8600, lng: 2.3775 },
    { name: "Saint-Germain Recovery Clinic", type: "recovery", lat: 48.8538, lng: 2.3332 },
    { name: "Eiffel Recovery Center", type: "recovery", lat: 48.8587, lng: 2.2923 }
];

// Initialize Map
let map = L.map("map").setView([48.8566, 2.3522], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "© OpenStreetMap"
}).addTo(map);

// Add markers for all locations
locations.forEach(loc => {
    L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(loc.name);
});

// Populate Dropdown Menus
function populateDropdowns() {
    const dropdowns = {
        hospitals: document.getElementById("hospitals-dropdown"),
        pharmacies: document.getElementById("pharmacies-dropdown"),
        recovery: document.getElementById("recovery-dropdown")
    };

    for (let type in dropdowns) {
        dropdowns[type].innerHTML = ""; // Clear existing items
        locations
            .filter(loc => loc.type === type)
            .forEach(loc => {
                const item = document.createElement("div");
                item.className = "dropdown-item";
                item.textContent = loc.name;
                item.onclick = () => map.setView([loc.lat, loc.lng], 15);
                dropdowns[type].appendChild(item);
            });
    }
}

// Toggle Dropdown Visibility
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

populateDropdowns();

// Search Functionality
function searchItem() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const result = locations.find(loc => loc.name.toLowerCase().includes(searchValue));
    if (result) {
        map.setView([result.lat, result.lng], 15);
    } else {
        alert("Location not found.");
    }
}

// Find Location Based on User's Need
function findLocationByNeed() {
    const need = document.getElementById("needInput").value.toLowerCase();

    let matchedType = "";
    if (need.includes("broken bone") || need.includes("injury")) {
        matchedType = "hospitals";
    } else if (need.includes("bloody nose") || need.includes("prescription")) {
        matchedType = "pharmacies";
    } else if (need.includes("recovery") || need.includes("rehab")) {
        matchedType = "recovery";
    } else {
        alert("No matching location found. Please refine your search.");
        return;
    }

    const result = locations.find(loc => loc.type === matchedType);
    if (result) {
        map.setView([result.lat, result.lng], 15);
    } else {
        alert("No locations available for your need.");
    }
}
</script>


<!-- CSS -->
<style>
/* General Styling */
body {
font-family: Arial, sans-serif;
margin: 0;
background: linear-gradient(to bottom right, #2C3E50, #4CA1AF);
color: #fff;
}

.container {
width: 90%;
max-width: 1200px;
margin: 20px auto;
}

.header {
text-align: center;
background: #007bff;
padding: 20px;
border-radius: 10px;
color: white;
}

.search-section {
display: flex;
justify-content: center;
margin-top: 10px;
}

input, .search-btn {
padding: 10px;
border-radius: 5px;
border: none;
color: #333;
}

.filters {
background: #fff;
color: #333;
padding: 20px;
border-radius: 10px;
margin-bottom: 50px;
}

.filter-btn {
width: 100%;
background: #007bff;
color: white;
padding: 10px;
border: none;
border-radius: 5px;
cursor: pointer;
}

.dropdown-content {
display: none;
background-color: #f9f9f9;
border: 1px solid #ccc;
padding: 10px;
margin-top: 5px;
border-radius: 5px;
}

.dropdown-item {
padding: 5px;
color: #007bff;
cursor: pointer;
}

.dropdown-item:hover {
background-color: #ddd;
}

.footer {
text-align: center;
margin-top: 20px;
background: #007bff;
padding: 10px;
color: white;
}
</style>
