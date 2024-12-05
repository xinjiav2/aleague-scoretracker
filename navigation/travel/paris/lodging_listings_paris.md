---
layout: post 
title: Lodging Listings
search_exclude: true
permalink: /travel/paris/lodging_listings_paris
---



<body>
  <div class="container">
    <!-- <aside class="sidebar">
      <div class="section">B Section</div>
      <div class="section">B Section</div>
      <div class="section">B Section</div>
      <div class="section">B Section</div>
      <div class="section">B Section</div>
      <div class="section">B Section</div>
      <div class="footer">
        <p>Settings</p>
        <p>Contact Us</p>
      </div>
    </aside> -->
    <main class="main-content">
      <header>
        <div class="auth-buttons">
          <button>Log In</button>
          <button>Sign Up</button>
        </div>
        <h1>Lodging Listings</h1>
        <hr>
        <div class="search-bar">
          <input type="text" placeholder="Search">
          <button>Search</button>
        </div>
      </header>
      <div class="listings">
        <div class="listing">Holiday Inn</div>
        <div class="listing">Hilton Garden inn</div>
        <div class="listing">Motel 6</div>
        <div class="listing">Days Inn</div>
        <div class="listing">Homewood Suites</div>
      </div>
    </main>
    <aside class="filters">
      <h2>FILTERS</h2>
      <div class="filter-options">
        <div class="filter">Filter 1</div>
        <div class="filter">Filter 2</div>
        <div class="filter">Filter 3</div>
        <div class="filter">Filter 4</div>
      </div>
    </aside>
    <footer class="home-button">
      <button>HOME</button>
    </footer>
  </div>
</body>
<style>
    /* styles.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
}
.container {
  display: grid;
  grid-template-areas:
    "sidebar header filters"
    "sidebar main filters"
    "sidebar footer filters";
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr auto;
  width: 50vw; /* Compressed to 50% */
  height: 100vh;
}
.sidebar {
  grid-area: sidebar;
  background-color: #f3f3f3;
  padding: 10px;
  border-right: 1px solid #ddd;
  overflow:hidden;
}
.section {
  padding: 10px;
  margin: 5px 0;
  background-color: #e7e7e7;
  text-align: center;
  border-radius: 5px;
}
.footer {
  margin-top: auto;
  text-align: center;
  font-size: 14px;
}
.main-content {
  grid-area: main;
  padding: 20px;
}
header {
  text-align: center;
}
.auth-buttons {
  text-align: right;
}
.auth-buttons button {
  margin: 5px;
  border-style: solid;
  border-radius: 5px;
  background-color: #fff;
  border-color: #767676;
}
.search-bar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.search-bar input {
  width: 60%;
  padding: 8px;
  margin-right: 5px;
  border-style: solid;
  border-color: #767676;
}
.search-bar button {
  padding: 8px 15px;
  border-style: solid;
  border-color: #767676;
}
.listings {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.listing {
  padding: 15px;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  text-align: center;
}
.filters {
  grid-area: filters;
  background-color: #fff;
  color:#000;
  padding: 10px;
  border-radius: 10px;
  /* border-style:solid;
  border-color: #767676; */
}
.filter-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.home-button {
  grid-area: footer;
  text-align: center;
  padding: 10px;
}
.home-button button {
  padding: 10px 20px;
  border-style: solid;
  border-color: #767676;
}
</style>