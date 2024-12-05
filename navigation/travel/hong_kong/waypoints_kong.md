---
layout: post 
title: Hong Kong Waypoints
search_exclude: true
permalink: /travel/destination_imagination
menu: nav/hong_hotbar.html
---

<div class="container">
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="sidebar-header">Menu</div>
        <button class="sidebar-btn">Section</button>
        <button class="sidebar-btn">Section</button>
        <button class="sidebar-btn">Section</button>
        <button class="sidebar-btn">Section</button>
        <button class="sidebar-btn">Section</button>
        <button class="sidebar-btn">Section</button>
        <button class="sidebar-btn">Section</button>
        <div class="sidebar-footer">
            <a href="#">Settings</a>
            <a href="#">Contact Us</a>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <h1>Wellness Waypoints</h1>
        <div class="search-bar">
            <input type="text" placeholder="Search your need" />
            <button class="search-btn">Search</button>
        </div>
        <div class="buttons-section">
            <button class="main-btn">Hospitals</button>
            <button class="main-btn">Recovery Centers</button>
            <button class="main-btn">Pharmacies</button>
            <button class="main-btn">Emergency Contacts</button>
            <button class="main-btn">Insurance</button>
        </div>
    </div>

    <!-- Filters -->
    <div class="filters">
        <h2>Filters</h2>
        <button class="filter-btn">Type</button>
        <button class="filter-btn">Type</button>
        <button class="filter-btn">Type</button>
        <button class="filter-btn">Type</button>
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
    background-color: #141414; /* Deep black background */
    color: #ffffff; /* White text for readability */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 20px;
}

/* Container */
.container {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    width: 90%;
    max-width: 1200px;
    gap: 20px;
}

/* Sidebar */
.sidebar {
    background-color: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.sidebar-header {
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #00bfff;
    font-weight: bold;
    text-align: center;
}

.sidebar-btn {
    background-color: #333;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    text-align: center;
}

.sidebar-btn:hover {
    background-color: #444;
    transform: scale(1.05);
}

.sidebar-footer {
    margin-top: auto;
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #333;
}

.sidebar-footer a {
    display: block;
    margin: 10px 0;
    color: #00bfff;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;
}

.sidebar-footer a:hover {
    color: #0080ff;
}

/* Main Content */
.main-content {
    background-color: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    text-align: center;
}

h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #00bfff;
}

.search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}

.search-bar input {
    width: 70%;
    padding: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    margin-right: 10px;
    background-color: #fff;
    color: #000;
}

.search-btn {
    padding: 10px 20px;
    background-color: #00bfff;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.search-btn:hover {
    background-color: #0080ff;
    transform: scale(1.05);
}

.buttons-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.main-btn {
    width: 80%;
    padding: 15px;
    font-size: 1.2em;
    background-color: #333;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.main-btn:hover {
    background-color: #444;
    transform: scale(1.05);
}

/* Filters */
.filters {
    background-color: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    text-align: center;
}

.filters h2 {
    margin-bottom: 20px;
    color: #00bfff;
    font-size: 1.5em;
}

.filter-btn {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #333;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.filter-btn:hover {
    background-color: #444;
    transform: scale(1.05);
}
</style>
