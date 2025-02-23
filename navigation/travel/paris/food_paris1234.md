---
layout: post
title: L'As du Fallafel - Street Food Delight
permalink: /travel/paris/food_paris1234
menu: nav/paris_hotbar.html
search_exclude: true
show_reading_time: false
---



<head>
  <style>
    /* Custom CSS */
    body, h1, h2, h3, p, ul, li {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      color: #333;
      line-height: 1.6;
    }

    .main-content {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    #reviewCount {
      text-align: center;
      margin-bottom: 20px;
    }

    #reviewCount h2 {
      font-size: 1.5rem;
      color: #444;
    }

    .card {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .card h2 {
      font-size: 1.2rem;
      color: #222;
      margin-bottom: 10px;
    }

    .card p {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 16px;
    }

    .remove-button {
      background-color: #e74c3c;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .remove-button:hover {
      background-color: #c0392b;
    }

    .form-container {
      margin-bottom: 20px;
    }

    .form-container input, .form-container textarea, .form-container button {
      display: block;
      width: 100%;
      margin: 8px 0;
      padding: 10px;
      font-size: 1rem;
    }

    .form-container button {
      background-color: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .form-container button:hover {
      background-color: #27ae60;
    }
  </style>
</head>

<body>
  <main class="main-content" id="main-content">
    <div id="reviewCount"></div>

    <div class="form-container">
      <h2>Add a Food Review</h2>
      <input type="text" id="foodInput" placeholder="Enter food name" />
      <textarea id="reviewInput" placeholder="Enter your review"></textarea>
      <input type="number" id="ratingInput" placeholder="Enter rating (1-5)" min="1" max="5" />
      <button onclick="addReview()">Submit Review</button>
    </div>
  </main>
</body>

<script type="module">
import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
document.addEventListener("DOMContentLoaded", () => {
    fetchReviews();
});

async function fetchReviews() {
    try {
        const response = await fetch(`${pythonURI}/api/food_review_1234_api`);
        if (!response.ok) {
            throw new Error("Failed to fetch reviews: " + response.statusText);
        }
        const data = await response.json();
        let reviewCount = data.length || 0;
        document.getElementById('reviewCount').innerHTML = `<h2>You have ${reviewCount} food reviews!</h2>`;
        const body = document.getElementById('main-content');
        data.forEach(item => {
            createCard(body, item);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function createCard(container, item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = `review-${item.id}`;
    card.innerHTML = `
        <h2>${item.food}</h2>
        <p>${item.review}</p>
        <p><strong>Rating:</strong> <span class="rating">${item.rating}</span>/5</p>
    `;

    // Remove Button
    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    removeButton.onclick = () => {
        deleteReview(item.id);
        container.removeChild(card);
        updateReviewCount(-1);
    };
    card.appendChild(removeButton);

    // Edit Button
    const editButton = document.createElement("button");
    editButton.className = "remove-button";
    editButton.textContent = "Edit";
    editButton.onclick = () => {
        editReview(item.id, item.food, item.review, item.rating);
    };
    card.appendChild(editButton);

    container.appendChild(card);
}

window.addReview = async function addReview() {
    const food = document.getElementById("foodInput").value;
    const review = document.getElementById("reviewInput").value;
    const rating = parseInt(document.getElementById("ratingInput").value);

    if (!food || !review || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const postData = {
        food: food,
        review: review,
        rating: rating,
    };

    try {
        const response = await fetch(`${pythonURI}/api/food_review_1234_api`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error("Failed to add review: " + response.statusText);
        }

        const data = await response.json();
        const body = document.getElementById("main-content");
        createCard(body, data);
        updateReviewCount(1);

        document.getElementById("foodInput").value = "";
        document.getElementById("reviewInput").value = "";
        document.getElementById("ratingInput").value = "";
    } catch (error) {
        console.error("Error adding review:", error);
    }
};

function editReview(id, food, review, rating) {
    document.getElementById("foodInput").value = food;
    document.getElementById("reviewInput").value = review;
    document.getElementById("ratingInput").value = rating;

    const submitButton = document.querySelector(".form-container button");
    submitButton.textContent = "Update Review";

    submitButton.onclick = () => {
        updateReview(id);
    };
}

async function updateReview(id) {
    const food = document.getElementById("foodInput").value;
    const review = document.getElementById("reviewInput").value;
    const rating = parseInt(document.getElementById("ratingInput").value);

    if (!food || !review || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const putData = {
        id: id,
        food: food,
        review: review,
        rating: rating,
    };

    try {
        const response = await fetch(`${pythonURI}/api/food_review_1234_api`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(putData),
        });

        if (!response.ok) {
            throw new Error("Failed to update review: " + response.statusText);
        }

        const data = await response.json();

        const reviewCard = document.querySelector(`#review-${id}`);
        reviewCard.querySelector("h2").textContent = data.food;
        reviewCard.querySelector("p").textContent = data.review;
        reviewCard.querySelector(".rating").textContent = data.rating;

        document.getElementById("foodInput").value = "";
        document.getElementById("reviewInput").value = "";
        document.getElementById("ratingInput").value = "";
        const submitButton = document.querySelector(".form-container button");
        submitButton.textContent = "Submit Review";
        submitButton.onclick = addReview;

    } catch (error) {
        console.error("Error updating review:", error);
    }
}

async function deleteReview(id) {
    try {
        await fetch(`${pythonURI}/api/food_review_1234_api`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
    } catch (error) {
        console.error("Error deleting review:", error);
    }
}

function updateReviewCount(change) {
    const reviewCountElement = document.getElementById("reviewCount");
    const currentCount = parseInt(reviewCountElement.textContent.match(/\d+/)[0]) || 0;
    reviewCountElement.innerHTML = `<h2>You have ${currentCount + change} food reviews!</h2>`;
}
</script>
