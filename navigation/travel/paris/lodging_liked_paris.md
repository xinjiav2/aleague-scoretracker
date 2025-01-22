---
layout: post
title: Lodging Listings - Liked Hotels
search_exclude: true
permalink: /travel/paris/lodging_liked_paris
menu: nav/paris_hotbar.html
---

<div id="hotelCount"></div>
<div id="details"></div>


<script type="module">
import {
    pythonURI,
    fetchOptions,
} from "{{ site.baseurl }}/assets/js/api/config.js";



document.addEventListener("DOMContentLoaded", (event) => {
    fetchLikedHotels();
});
async function fetchLikedHotels() {
    try {
        const response = await fetch(`http://127.0.0.1:8887/api/hotel`, {

        });
        if (!response.ok) {
            throw new Error('Failed to fetch hotels: ' + response.statusText);
        }

        const postData = await response.json();
        const postCount = postData.length || 0;
        document.getElementById('hotelCount').innerHTML = `<h2>You have liked ${postCount} hotels!</h2>`;
        const detailsDiv = document.getElementById('details');
        detailsDiv.innerHTML = '';
        postData.forEach(postItem => {
            const postElement = document.createElement('div');
            postElement.className = 'post-item';
            postElement.innerHTML = `
                <h3>${postItem.hotel}</h3>
                <p>${postItem.location}</p>
                <p>${postItem.rating}</p>
            `;
            const unlikeButton = document.createElement("button");
            unlikeButton.textContent = "Unlike";
            unlikeButton.onclick = () => {
                deleteHotel(postItem.id);
            };
            postElement.appendChild(unlikeButton)
            detailsDiv.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


  async function deleteHotel(id) {
    const deleteData = {
      id: id,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8887/api/hotel`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Delete response:', data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }

    fetchLikedHotels();
  }


</script>