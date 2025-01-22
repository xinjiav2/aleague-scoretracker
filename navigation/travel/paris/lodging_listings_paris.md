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

  document.addEventListener("DOMContentLoaded", (event) => {
    const goButton = document.getElementById("goButton");
    goButton.addEventListener("click", FindHotels);
  });

  async function FindHotels() {
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
      console.log(data)
      const body = document.getElementById("main-content");
      data.forEach((place, index) => {
        const card = document.createElement("div");
        card.className = "card";
        const placeInfo = place.display_name.split(", ");
        const hotelName = document.createElement("h2");

        const hotelTitle = JSON.stringify(index + 1) + ") " + placeInfo[0]
        hotelName.textContent = hotelTitle;
        card.appendChild(hotelName);
        placeInfo.shift();
        placeInfo.forEach((point) => {
          const pointElement = document.createElement("p");
          pointElement.textContent = point;
          card.appendChild(pointElement);
        });
        const likeButton = document.createElement("button");
        likeButton.className = "like-button";
        likeButton.textContent = "🤍";
        likeButton.onclick = () => {
          likeHotel(hotelTitle, data);
          likeButton.textContent = "❤️";
        };
        card.appendChild(likeButton);

        body.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function likeHotel(hotelName, data) {

    const dataNumber = parseInt(hotelName.split(') ')[0])
    const countryName = data[dataNumber-1]['address']['country']
    postHotelData(hotelName, countryName)

  };

  async function postHotelData(hotel, location) {
    const postData = {
      hotel: hotel,
      location: location,
      rating: 123
    };

    try {
      const response = await fetch('http://127.0.0.1:8887/api/hotel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Post response:', data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  async function putHotelData() {
    const putData = {
      id: 1,
      hotel: "hi",
      location: "NEjtjtjt",
      rating: 123
    };

    try {
      const response = await fetch(`http://127.0.0.1:8887/api/hotel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Put response:', data);
    } catch (error) {
      console.error("Error putting data:", error);
    }
  }

</script>
