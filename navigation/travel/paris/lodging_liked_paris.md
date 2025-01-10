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
        document.getElementById('hotelCount').innerHTML = `<h2>You have liked ${postCount} hotels!</h2>`;
        const detailsDiv = document.getElementById('details');
        detailsDiv.innerHTML = '';
        postData.forEach(postItem => {
            const postElement = document.createElement('div');
            postElement.className = 'post-item';
            postElement.innerHTML = `
                <h3>${postItem.title}</h3>
                <p>${postItem.comment}</p>
            `;
            detailsDiv.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData(1);
</script>