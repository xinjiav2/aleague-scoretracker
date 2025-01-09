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
        color: #333;
    }

    .header {
        background: linear-gradient(to right, #001F3F, #004080);
        color: white;
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
    }

    .section h2 {
        color: #004080;
        border-bottom: 2px solid #0073e6;
        padding-bottom: 10px;
    }

    .section label {
        display: block;
        margin-bottom: 10px;
    }

    .section input,
    .section select,
    .section button {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
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
    }

    .info-card h3 {
        color: #004080;
        margin-top: 0;
    }

    .footer {
        text-align: center;
        padding: 10px;
        background-color: #001F3F;
        color: white;
        border-top: 5px solid #004080;
    }

    .form-group {
        display: flex;
        gap: 10px;
    }

    .form-group input {
        flex: 1;
    }
</style>

<div class="header">
    <h1>Fair Fares</h1>
    <p>Your travel, your way – simplified!</p>
</div>

<div class="container">
    <div class="section">
        <h2>Set Your Travel Budget</h2>
        <form id="budgetForm">
            <label for="budget">Enter your total budget (USD):</label>
            <input type="number" id="budget" name="budget" required placeholder="Enter amount" step="0.01">
            <button type="submit">Set Budget</button>
        </form>
    </div>

    <div class="section">
        <h2>Explore Travel Options</h2>
        <form id="travelForm">
            <label for="pickup">Enter Pickup Location:</label>
            <input type="text" id="pickup" name="pickup" required placeholder="Pickup Address">

            <label for="destination">Enter Destination Location:</label>
            <input type="text" id="destination" name="destination" required placeholder="Destination Address">

            <div class="form-group">
                <input type="number" id="date" name="date" required placeholder="UNIX Timestamp">
            </div>

            <button type="submit">Get Recommendations</button>
        </form>
    </div>

    <div class="section">
        <h2>Your Budget Summary</h2>
        <div class="info-card" id="budgetSummary">
            <h3>Summary:</h3>
            <p>Set your budget to view a detailed breakdown of your travel options.</p>
        </div>
    </div>

    <div class="section">
        <h2>Travel Options</h2>
        <div id="travelResults" class="info-card">
            <h3>Results:</h3>
            <p>Enter your travel details to get recommendations.</p>
        </div>
    </div>
</div>

<div class="footer">
    <p>&copy; Fair Fares is Fairly Fantastic</p>
</div>

<script>
    document.getElementById('budgetForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const budget = document.getElementById('budget').value;
        const summary = document.getElementById('budgetSummary');
        summary.innerHTML = `<h3>Summary:</h3><p>Your budget is set to $${budget}. Explore the best options within your range.</p>`;
    });

    document.getElementById('travelForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const pickup = document.getElementById('pickup').value.trim();
        const destination = document.getElementById('destination').value.trim();
        const date = document.getElementById('date').value.trim();

        if (!pickup || !destination || !date) {
            alert('Please fill in all fields.');
            return;
        }
        const apiUrl = `https://api.taxicode.com/booking/quote/?pickup=${encodeURIComponent(
pickup)}&destination=${encodeURIComponent(destination)}&date=${date}`;

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'X-Api-Key': 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvWsZp6+LgsDLDZNThnxP\nedjz6oRCKzkarLAH/zYX/6ZfrxVBE4Lu+/jAcxT9nA2QFaOijjV+dLdqr0XdjBAZ\nWThgPkISRV6assRIo5Z7q/6YbeNtkeOEIRwGOFB+sGhE/NSPaoChSBVlfaISoPFs\n7twPpcaPG+ua+SeBPTuFRLO6YDaQy9TObprk5cDGbYHsqAZm6IZGHLAKUPWGeGMB\nrjnPZzHbvkkGJAqhHw7twLtRbj/9ZWRh4n2sk8gMU+g4HJGAWv4wVZ3VrIdc+w6R\nIoUaqvYYGOHqulOLoYpstNAooJhprKAbWoLsN1GBCm/a0EePMZu2KlQNjw5VWt7o\nLOOsqALPZjsJ0AhGe8XlW496amiH+hvjeWIlPEVdE2oy+iuso/izRiWbzHqZV4i6\n4+SByscSgFaZP/yjMv9k5F8Z1ZWyTd4HQ81QZT1kZLOdvZ+/xrWlVb+T4K0R2ARI\nUb8aoV0Z6B7sCl97aFu9/80lSPy/V9vk2a/a8VzFbb1Ybzmcok+tIg6Fh0vo0lCc\nx/lFTUElD+SeFt4thVSUWuLczUuGTmBumrXB8LAJFyAIAIBOe2Vvjf9EfhItWI8q\nCq447GHyhTsoL7U3j/bCCcTzpRgZyRd5x9EfuRpJoj2mTOrXHpsGZAkuaUmwiTc7\nXquTSj+EjPh4d75q4zbjE3UCAwEAAQ=='
                }
            });

            const travelResults = document.getElementById('travelResults');

            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    travelResults.innerHTML = `<h3>Results:</h3>${data.map(
                        result => `<p>${result.name}: $${result.price}</p>`
                    ).join('')}`;
                } else {
                    travelResults.innerHTML = `<h3>Results:</h3><p>No options found for the provided details.</p>`;
                }
            } else {
                travelResults.innerHTML = `<h3>Results:</h3><p>Error fetching data: ${response.status}</p>`;
            }
        } catch (error) {
            travelResults.innerHTML = `<h3>Results:</h3><p>Error: ${error.message}</p>`;
        }
    });
</script>