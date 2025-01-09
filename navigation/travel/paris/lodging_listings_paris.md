---
layout: post
title: Lodging Listings
search_exclude: true
permalink: /travel/paris/lodging_listings_paris
menu: nav/paris_hotbar.html
---

<head>
  <link rel="stylesheet" href="../../assets/css/travel/lodging.css" />
</head>

<body id="body">
  <div class="container">
    <main class="main-content" id="main-content">
      <header>
        <h1>Lodging Listings</h1>
        <hr />
        <div class="search-bar">
          <input
            type="text"
            id="destination"
            placeholder="Search for a hotel..."
          />
          <input type="text" id="place" placeholder="Search for a city..." />
          <button id="goButton">Go</button>
        </div>
        <a href="{{ site.baseurl }}/travel/paris/lodging_liked_paris">Liked Hotels</a>
      </header>
    </main>
  </div>
</body>

<script type="module">
  import {
    pythonURI,
    fetchOptions,
  } from "{{ site.baseurl }}/assets/js/api/config.js";

  document.querySelectorAll(".filter").forEach((filter) => {
    filter.addEventListener("click", () => {
      document.querySelectorAll(".filter-input").forEach((input) => {
        input.classList.add("hidden");
      });
      const filterId = filter.dataset.filter + "-filter";
      document.getElementById(filterId).classList.remove("hidden");
    });
  });

  document.addEventListener("DOMContentLoaded", (event) => {
    const goButton = document.getElementById("goButton");
    goButton.addEventListener("click", helppp);
  });

  async function helppp() {
    var destination = document
      .getElementById("destination")
      .value.trim()
      .replace(/\s+/g, "+");
    var place = document
      .getElementById("place")
      .value.trim()
      .replace(/\s+/g, "+");
    const url = `https://nominatim.openstreetmap.org/search?q=${destination},${place}&format=json&addressdetails=`;
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "MyHotelApp/1.0 (contact@example.com)",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const body = document.getElementById("main-content");
      data.forEach((place, index) => {
        const card = document.createElement("div");
        card.className = "card";
        const placeInfo = place.display_name.split(", ");
        const hotelName = document.createElement("h2");

        const hotelTitle = placeInfo[0]
        hotelName.textContent = hotelTitle;
        card.appendChild(hotelName);
        placeInfo.shift();
        const countryTitle = placeInfo.slice(-1)[0] 
        placeInfo.forEach((point) => {
          const pointElement = document.createElement("p");
          pointElement.textContent = point;
          card.appendChild(pointElement);
        });
        const likeButton = document.createElement("button");
        likeButton.className = "like-button";
        likeButton.textContent = "Like";
        likeButton.onclick = () => {
          likeHotel(hotelTitle, countryTitle);
          likeButton.textContent = "Liked!";
        };
        card.appendChild(likeButton);

        body.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function likeHotel(hotelName, countryName) {

    const title = hotelName;
    const content = countryName;
    const channel_id = 1;
    const postData = {
      title: title,
      comment: content,
      channel_id: channel_id,
    };
    try {
      const response = await fetch(`${pythonURI}/api/post`, {
        ...fetchOptions,
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error("Failed to add channel: " + response.statusText);
      }
    } catch (error) {
      console.error("Error adding channel:", error);
      alert("Error adding channel: " + error.message);
    }
  }
</script>
