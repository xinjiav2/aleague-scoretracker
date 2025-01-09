---
layout: post 
title: Fair Fares
search_exclude: true
permalink: /travel/paris/paris_fair_fares
menu: nav/paris_hotbar.html
---

<style>
    body {
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f4f9;
        color: #000; /* Set all text to black */
    }

    .header {
        background: linear-gradient(to right, #001F3F, #004080);
        color: #000; /* Header text is black */
        text-align: center;
        padding: 20px;
        border-radius: 8px;
    }

    .container {
        max-width: 1200px;
        margin: 20px auto;
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }

    .section {
        flex: 1 1 calc(45% - 20px);
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        min-width: 300px;
        color: #000; /* Set text color in sections to black */
    }

    .section h2 {
        color: #000; /* Section headers are black */
        border-bottom: 2px solid #0073e6;
        padding-bottom: 10px;
    }

    .section label {
        display: block;
        margin-bottom: 10px;
        color: #000; /* Labels are black */
    }

    .section input,
    .section select,
    .section button {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        color: #000; /* Input text is black */
    }

    .section button {
        background-color: #0073e6;
        color: white;
        border: none;
        cursor: pointer;
    }

    .section button:hover {
        background-color: #005bb5;
    }

    .info-card {
        background-color: #f1f9ff;
        border: 1px solid #0073e6;
        border-radius: 8px;
        padding: 20px;
        margin: 10px 0;
        color: #000; /* Set text color to black */
        max-height: 300px; /* Set max height for scrollable content */
        overflow-y: auto; /* Enable vertical scrolling if needed */
    }

    .info-card h3 {
        color: #000; /* Header text in info card is black */
    }

    .footer {
        text-align: center;
        padding: 10px;
        background-color: #001F3F;
        color: #000; /* Footer text is black */
        border-top: 5px solid #004080;
    }
</style>


<div class="header">
    <h1>Fair Fares</h1>
    <p>Your travel, your way – simplified!</p>
</div>

<div class="container">
    <div class="section">
        <h2>Search Flights</h2>
        <form id="flightForm">
            <label for="dep_iata">Departure Airport (IATA Code):</label>
            <input type="text" id="dep_iata" name="dep_iata" required placeholder="e.g., LAX">

            <label for="arr_iata">Arrival Airport (IATA Code):</label>
            <input type="text" id="arr_iata" name="arr_iata" required placeholder="e.g., JFK">

            <button type="submit">Search Flights</button>
        </form>
    </div>

    <div class="section">
        <h2>Flight Results</h2>
        <div id="flightResults" class="info-card">
            <h3>Results:</h3>
            <p>Enter your flight details to view available options.</p>
        </div>
    </div>
</div>

<div class="footer">
    <p>&copy; Fair Fares is Fairly Fantastic</p>
</div>

<script>
    const accessKey = 'e57e129b3e76d1dc706a05dc1e776b40';

    document.getElementById('flightForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const depIata = document.getElementById('dep_iata').value.trim().toUpperCase();
        const arrIata = document.getElementById('arr_iata').value.trim().toUpperCase();

        if (!depIata || !arrIata) {
            alert('Please fill in all fields.');
            return;
        }

        const apiUrl = `https://api.aviationstack.com/v1/flights?access_key=${accessKey}&dep_iata=${encodeURIComponent(depIata)}&arr_iata=${encodeURIComponent(arrIata)}`;

        const flightResults = document.getElementById('flightResults');

        try {
            const response = await fetch(apiUrl);

            if (response.ok) {
                const data = await response.json();

                if (data.data && data.data.length > 0) {
                    flightResults.innerHTML = `<h3>Results:</h3>${data.data.map(
                        flight => `<p>Flight ${flight.flight.iata}: ${flight.airline.name} - Departure: ${flight.departure.scheduled}, Arrival: ${flight.arrival.scheduled}</p>`
                    ).join('')}`;
                } else {
                    flightResults.innerHTML = `<h3>Results:</h3><p>No flights found for the provided details.</p>`;
                }
            } else {
                flightResults.innerHTML = `<h3>Results:</h3><p>Error fetching data: ${response.status}</p>`;
            }
        } catch (error) {
            flightResults.innerHTML = `<h3>Results:</h3><p>Error: ${error.message}</p>`;
        }
    });
</script>
