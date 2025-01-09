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
        <p>Your guide to health and wellness resources.</p>
    </header>

    <!-- Accordion Section -->
    <div class="accordion">
        <!-- Hospitals Section -->
        <div class="accordion-item">
            <button class="accordion-btn" onclick="toggleAccordion('hospitals-list')">Hospitals</button>
            <div class="accordion-content" id="hospitals-list"></div>
        </div>
        
        <!-- Pharmacies Section -->
        <div class="accordion-item">
            <button class="accordion-btn" onclick="toggleAccordion('pharmacies-list')">Pharmacies</button>
            <div class="accordion-content" id="pharmacies-list"></div>
        </div>
        
        <!-- Recovery Centers Section -->
        <div class="accordion-item">
            <button class="accordion-btn" onclick="toggleAccordion('recovery-list')">Recovery Centers</button>
            <div class="accordion-content" id="recovery-list"></div>
        </div>
    </div>

    <!-- Map Section -->
    <div id="map" style="height: 400px; margin-top: 20px; border-radius: 10px;"></div>

    <!-- Footer Section -->
    <footer class="footer">
        <p>&copy; 2024 Wellness Waypoints. All Rights Reserved.</p>
    </footer>
</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
    // Static Locations Data
    const locations = [
        { name: "Saint Louis Hospital", type: "hospitals", lat: 48.8566, lng: 2.3522 },
        { name: "Central Clinic", type: "hospitals", lat: 48.8540, lng: 2.3560 },
        { name: "Pitié-Salpêtrière Hospital", type: "hospitals", lat: 48.8389, lng: 2.3664 },
        { name: "Necker Hospital", type: "hospitals", lat: 48.8446, lng: 2.3162 },
        { name: "Georges Pompidou Hospital", type: "hospitals", lat: 48.8414, lng: 2.2774 },
        { name: "Green Pharmacy", type: "pharmacies", lat: 48.8584, lng: 2.3470 },
        { name: "Healthline Pharmacy", type: "pharmacies", lat: 48.8590, lng: 2.3510 },
        { name: "City Care Pharmacy", type: "pharmacies", lat: 48.8665, lng: 2.3311 },
        { name: "Central Paris Pharmacy", type: "pharmacies", lat: 48.8730, lng: 2.2988 },
        { name: "Wellness Recovery Center", type: "recovery", lat: 48.8555, lng: 2.3500 },
        { name: "Bright Path Recovery", type: "recovery", lat: 48.8525, lng: 2.3555 },
        { name: "Paris Rehabilitation Center", type: "recovery", lat: 48.8465, lng: 2.3392 },
    ];

    // Initialize Map
    const map = L.map("map").setView([48.8566, 2.3522], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap"
    }).addTo(map);

    // Add map markers
    locations.forEach(loc => {
        L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(loc.name);
    });

    // Populate accordion content
    function populateAccordion() {
        const sections = {
            hospitals: document.getElementById("hospitals-list"),
            pharmacies: document.getElementById("pharmacies-list"),
            recovery: document.getElementById("recovery-list"),
        };

        for (let type in sections) {
            sections[type].innerHTML = ""; // Clear existing items
            locations
                .filter(loc => loc.type === type)
                .forEach(loc => {
                    const item = document.createElement("div");
                    item.className = "accordion-item-content";
                    item.textContent = loc.name;
                    item.onclick = () => map.setView([loc.lat, loc.lng], 15); // Center map on location
                    sections[type].appendChild(item);
                });
        }
    }

    // Toggle accordion visibility
    function toggleAccordion(sectionId) {
        const section = document.getElementById(sectionId);
        const isExpanded = section.style.display === "block";

        // Collapse all sections
        document.querySelectorAll(".accordion-content").forEach(content => {
            content.style.display = "none";
        });

        // Expand the clicked section
        if (!isExpanded) {
            section.style.display = "block";
        }
    }

    // Populate accordion on page load
    document.addEventListener("DOMContentLoaded", populateAccordion);
</script>

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        background: #f5f5f5;
        color: #333;
    }

    .container {
        width: 90%;
        max-width: 1200px;
        margin: 20px auto;
    }

    .header {
        text-align: center;
        margin-bottom: 20px;
    }

    /* Accordion Section */
    .accordion {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .accordion-item {
        background: #007bff;
        color: white;
        border-radius: 5px;
        overflow: hidden;
    }

    .accordion-btn {
        width: 100%;
        background: none;
        border: none;
        padding: 10px;
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        color: white;
    }

    .accordion-btn:hover {
        background-color: #0056b3;
    }

    .accordion-content {
        display: none;
        background: white;
        color: #333;
        padding: 10px;
        border: 1px solid #ccc;
        border-top: none;
    }

    .accordion-item-content {
        padding: 5px;
        cursor: pointer;
    }

    .accordion-item-content:hover {
        background-color: #f0f0f0;
    }

    /* Map Section */
    #map {
        height: 400px;
        margin-top: 20px;
        border-radius: 10px;
    }

    .footer {
        text-align: center;
        margin-top: 20px;
        background: #007bff;
        color: white;
        padding: 10px;
    }
</style>
