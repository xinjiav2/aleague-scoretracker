---
layout: post 
title: Paris Waypoints
search_exclude: true
permalink: /travel/paris/wellness_waypoints
menu: nav/paris_hotbar.html
---


<div class="container">
    <!-- Sidebar (Left) -->
    <div class="sidebar">
        <h2>Menu</h2>
        <button class="sidebar-btn">Section 1</button>
        <button class="sidebar-btn">Section 2</button>
        <button class="sidebar-btn">Section 3</button>
        <button class="sidebar-btn">Section 4</button>
        <button class="sidebar-btn">Section 5</button>
        <div class="sidebar-footer">
            <a href="#">Settings</a>
            <a href="#">Contact Us</a>
        </div>
    </div>

<!-- Main Content (Center) -->
<div class="main-content">
    <h1>Wellness Waypoints</h1>
    <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Search your need">
        <button class="search-btn" onclick="searchItem()">Search</button>
    </div>
    <div class="buttons-section">
        <button class="main-btn" onclick="displayContent('Type 1')">Type 1</button>
        <button class="main-btn" onclick="displayContent('Type 2')">Type 2</button>
        <button class="main-btn" onclick="displayContent('Type 3')">Type 3</button>
        <button class="main-btn" onclick="displayContent('Type 4')">Type 4</button>
        <button class="main-btn" onclick="displayContent('Type 5')">Type 5</button>
    </div>
</div>

<!-- Filters (Right) -->
<div class="filters">
    <h2>Filters</h2>
    <button class="filter-btn" onclick="filterContent('Hospitals')">Hospitals</button>
    <button class="filter-btn" onclick="filterContent('Recovery Centers')">Recovery Centers</button>
    <button class="filter-btn" onclick="filterContent('Pharmacies')">Pharmacies</button>
    <button class="filter-btn" onclick="filterContent('Insurance')">Insurance</button>
    <button class="filter-btn" onclick="filterContent('Emergency Contacts')">Emergency Contacts</button>
</div>
</div>

<style>
/* General Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
    color: #333;
}

/* Container Layout */
.container {
    display: grid;
    grid-template-columns: 2fr 3fr 2fr; /* Sidebar | Main Content | Filters */
    gap: 20px;
    width: 90%;
    max-width: 1200px;
    margin: 20px auto;
}

/* Sidebar (Left) */
.sidebar {
    background-color: #d8ecff;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 40px);
    position: sticky;
    top: 20px;
    width: 100%;
}

.sidebar h2 {
    margin-bottom: 15px;
    font-size: 20px;
    color: #333;
    text-align: center;
}

.sidebar-btn {
    background-color: #eaf4ff;
    border: none;
    border-radius: 5px;
    padding: 15px;
    margin: 10px 0;
    width: 95%; /* Ensures sections are wide enough */
    text-align: center;
    cursor: pointer;
    font-size: 18px;
}

.sidebar-btn:hover {
    background-color: #b5dbff;
}

.sidebar-footer {
    margin-top: auto;
    text-align: center;
}

.sidebar-footer a {
    display: block;
    margin: 10px 0;
    color: #007bff;
    text-decoration: none;
    font-size: 14px;
}

.sidebar-footer a:hover {
    color: #0056b3;
}

/* Main Content (Center) */
.main-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.main-content h1 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
}

.search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.search-bar input {
    width: 60%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

.search-btn {
    padding: 10px 20px;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
}

.search-btn:hover {
    background-color: #0056b3;
}

.buttons-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.main-btn {
    width: 80%;
    padding: 15px;
    background-color: #e0e0e0;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

.main-btn:hover {
    background-color: #d1d1d1;
}

/* Filters (Right) */
.filters {
    background-color: #d8ecff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    min-height: calc(100vh - 40px);
    position: sticky;
    top: 20px;
}

.filters h2 {
    margin-bottom: 20px;
    font-size: 20px;
    color: #333;
}

.filter-btn {
    display: block;
    width: 95%; /* Keeps filter buttons wide */
    margin: 10px 0;
    padding: 15px;
    background-color: #eaf4ff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
}

.filter-btn:hover {
    background-color: #b5dbff;
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
