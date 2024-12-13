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

<!-- Main Content Section -->
<div class="main-content">
    <div class="buttons-section">
        <h2>Explore Sections</h2>
        <button class="main-btn" onclick="displayContent('Type 1')">Type 1</button>
        <button class="main-btn" onclick="displayContent('Type 2')">Type 2</button>
        <button class="main-btn" onclick="displayContent('Type 3')">Type 3</button>
        <button class="main-btn" onclick="displayContent('Type 4')">Type 4</button>
        <button class="main-btn" onclick="displayContent('Type 5')">Type 5</button>
    </div>

<div id="contentDisplay" class="info-box">
</div>
</div>

<!-- Filters Section -->
<div class="filters">
    <h2>Filters</h2>
    <button class="filter-btn" onclick="filterContent('Hospitals')">Hospitals</button>
    <button class="filter-btn" onclick="filterContent('Recovery Centers')">Recovery Centers</button>
    <button class="filter-btn" onclick="filterContent('Pharmacies')">Pharmacies</button>
    <button class="filter-btn" onclick="filterContent('Insurance')">Insurance</button>
    <button class="filter-btn" onclick="filterContent('Emergency Contacts')">Emergency Contacts</button>
</div>

<!-- Footer Section -->
<footer class="footer">
    <p>&copy; 2024 Wellness Waypoints. All Rights Reserved.</p>
    <a href="#">Contact Us</a> | <a href="#">Privacy Policy</a>
</footer>
</div>

<style>
/* General Reset */
* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

body {
font-family: 'Arial', sans-serif;
background-color: #f4f6f9;
color: #333;
line-height: 1.6;
}

.container {
width: 90%;
max-width: 1200px;
margin: 20px auto;
}

/* Header Styling */
.header {
text-align: center;
background-color: #007bff;
color: #fff;
padding: 20px;
border-radius: 10px;
margin-bottom: 20px;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.header h1 {
font-size: 2.5em;
margin-bottom: 10px;
}

.header p {
font-size: 1.2em;
}

/* Search Section */
.search-section {
display: flex;
justify-content: center;
margin-bottom: 20px;
}

.search-section input {
width: 60%;
padding: 10px;
border-radius: 5px;
border: 1px solid #ccc;
margin-right: 10px;
}

.search-section .search-btn {
padding: 10px 20px;
background-color: #007bff;
border: none;
border-radius: 5px;
color: #fff;
cursor: pointer;
transition: background-color 0.3s ease;
}

.search-section .search-btn:hover {
background-color: #0056b3;
}

/* Main Content Section */
.main-content {
text-align: center;
background: #fff;
color: #000;
padding: 20px;
border-radius: 10px;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
margin-bottom: 20px;
}

.buttons-section {
margin-bottom: 20px;
}

.buttons-section h2 {
margin-bottom: 15px;
color: #007bff;
font-size: 1.8em;
}

.main-btn {
width: 80%;
margin: 10px auto;
padding: 15px;
background-color: #007bff;
color: #fff;
border: none;
border-radius: 5px;
font-size: 16px;
cursor: pointer;
transition: background-color 0.3s ease;
}

.main-btn:hover {
background-color: #0056b3;
}

.info-box {
margin-top: 20px;
padding: 20px;
background-color: #f4f6f9;
color: #000;
border: 1px solid #ccc;
border-radius: 5px;
}

/* Filters Section */
.filters {
background-color: #fff;
color: #000;
padding: 20px;
border-radius: 10px;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.filters h2 {
margin-bottom: 15px;
color: #007bff;
font-size: 1.8em;
text-align: center;
}

.filter-btn {
width: 90%;
margin: 10px auto;
padding: 10px;
background-color: #f4f6f9;
border: 1px solid #007bff;
border-radius: 5px;
color: #007bff;
cursor: pointer;
font-size: 16px;
transition: background-color 0.3s ease, color 0.3s ease;
}

.filter-btn:hover {
background-color: #007bff;
color: #fff;
}

/* Footer Section */
.footer {
text-align: center;
padding: 20px;
background-color: #007bff;
color: #fff;
border-radius: 10px;
margin-top: 20px;
}

.footer a {
color: #fff;
text-decoration: underline;
margin: 0 10px;
}

.footer a:hover {
color: #d1d1d1;
}
</style>

<script>
const contentData = {
Hospitals: "Find hospitals in your area for emergency or routine health checkups.",
"Recovery Centers": "Recovery centers for addiction and post-surgery rehabilitation.",
Pharmacies: "Nearby pharmacies for medicines and prescriptions.",
"Emergency Contacts": "Essential emergency numbers for local authorities.",
Insurance: "Find travel and health insurance providers."
};

function displayContent(section) {
const contentDisplay = document.getElementById("contentDisplay");
contentDisplay.innerHTML = contentData[section] || "Content not found.";
}

function searchItem() {
const searchValue = document.getElementById("searchInput").value.toLowerCase();
const matchedContent = Object.keys(contentData).find(key =>
    key.toLowerCase().includes(searchValue)
);
displayContent(matchedContent || "Content not found");
}

function filterContent(filter) {
displayContent(filter);
}
</script>
