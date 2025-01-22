---
layout: post 
title: Fair Fares
search_exclude: true
permalink: /travel/paris/paris_fair_fares
menu: nav/paris_hotbar.html
---

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

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

<div>
    <form id="flightForm" class="form">
        <input type="text" id="origin" name="origin" placeholder="Origin IATA" required>
        <input type="text" id="destination" name="destination" placeholder="Destination IATA" required>
        <button type="submit">Search Flights</button>
    </form>
    <div class="info-card">
        <div id="flightResults"></div>
    </div>
</div>

<div class="footer">
    <p>&copy; Fair Fares is Fairly Fantastic</p>
</div>

<style>
    .form {
        display: flex;
        flex-direction: column;
    }
    .info-card {
        border: 1px solid #ccc;
        padding: 20px;
        margin-top: 20px;
        border-radius: 5px;
        background-color: #f9f9f9;
        max-height: 300px; /* Set max height for scrollable content */
        overflow-y: auto; /* Enable vertical scrolling if needed */
    }
    .footer {
        text-align: center;
        padding: 10px;
        background-color: #001F3F;
        color: #000; /* Footer text is black */
        border-top: 5px solid #004080;
    }
</style>

<script type="module">
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';
    document.getElementById('flightForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        await fetchFlightData();
    });

    async function fetchFlightData() {
        try {
            const origin = document.getElementById('origin').value;
            const destination = document.getElementById('destination').value;
            console.log(`Fetching flights from ${origin} to ${destination}`);
            const response = await fetch(`http://127.0.0.1:8887/api/flight?origin=${origin}&destination=${destination}`);
            const flightResults = document.getElementById('flightResults');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response Data:', data);

            if (data && data.data && data.data.length > 0) {
                flightResults.innerHTML = `<h3>Results:</h3>${data.data.map(
                    flight => `<p>Flight ${flight.flight.iata}: ${flight.airline.name} - Departure: ${flight.departure.scheduled}, Arrival: ${flight.arrival.scheduled}</p>`
                ).join('')}`;
            } else {
                flightResults.innerHTML = `<h3>Results:</h3><p>No flights found for the provided details.</p>`;
            }
        } catch (error) {
            flightResults.innerHTML = `<h3>Results:</h3><p>Error: ${error.message}</p>`;
        }
    }
// Initialize variables
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
expenses = expenses.filter(exp => exp && typeof exp.amount === 'number'); // Ensure all entries are valid
const form = document.getElementById('expense-form');
const ctx = document.getElementById('expenseChart').getContext('2d');
const expenseList = document.getElementById('expense-list');

// Initialize Chart
let expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            label: 'Expenses',
            data: [],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        }
    }
});

// Load existing data on page load
window.onload = () => {
    displayExpenses();
    updateChart();
};

// Event Listeners
document.getElementById('btn').addEventListener('click', (e) => {
    e.preventDefault();
    addExpense();
});

document.getElementById('btn1').addEventListener('click', clearExpenses);

// Add a new expense
function addExpense() {
    const item = document.getElementById('item').value.trim();
    const amount = parseFloat(document.getElementById('amount').value.trim());
    const description = document.getElementById('description').value.trim();

    if (!item || isNaN(amount) || !description) {
        alert('Please fill in all fields with valid values.');
        return;
    }

    const expense = { item, amount, description };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    form.reset();
    updateChart();
    displayExpenses();
    submitPost(item, amount, description);
}


// Display all expenses
function displayExpenses() {
    expenseList.innerHTML = expenses
        .map(exp => {
    const amount = parseFloat(exp.amount) || 0; // Ensure amount is a valid number
    return `<li>${exp.item} - ${exp.description}: $${amount.toFixed(2)}</li>`;
})

        .join('');
}

// Clear all expenses
function clearExpenses() {
    expenses = [];
    localStorage.removeItem('expenses');
    displayExpenses();
    updateChart();
}

// Update the chart
function updateChart() {
    expenseChart.data.labels = expenses.map(exp => exp.item);
    expenseChart.data.datasets[0].data = expenses.map(exp => exp.amount);
    expenseChart.update();
}

// Change chart type
function changeChartType() {
    const selectedType = document.getElementById('chart-type').value;
    expenseChart.destroy();

    expenseChart = new Chart(ctx, {
        type: selectedType,
        data: {
            labels: expenses.map(exp => exp.item),
            datasets: [{
                label: 'Expenses',
                data: expenses.map(exp => exp.amount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
            }
        }
    });
}
    async function submitPost(item, amount, description) {
    const channel_id = 1;
    const postData = {
        title: "title",
        comment: `${item}, ${amount}, ${description}`,
        channel_id: channel_id
    };

    try {
        const response = await fetch(`${pythonURI}/api/post`, {
            ...fetchOptions,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('Failed to add channel: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error adding channel:', error);
        alert('Error adding channel: ' + error.message);
    }
}

</script>

<h1>Travel Fare Expense Tracker</h1>
<form id="expense-form">
    <label for="item">Item:</label>
    <input id="item" type="text" placeholder="Enter Item:"><br>
    <label for="amnt">Amount:</label>
    <input id="amount" type="text" placeholder="Enter Amount:"><br>
    <label for="description">Description:</label>
    <input id="description" type="text" placeholder="Enter Description:"><br>
</form>
<button id="btn" type="submit">Submit</button>
<button id="btn1" type="submit">Clear</button>


<h2>Expense Breakdown</h2>
<h4>Select Chart Type</h4>
<select id="chart-type" onchange="changeChartType()">
    <option value="pie">Pie</option>
    <option value="bar">Bar</option>
</select>

<canvas id="expenseChart" width="400" height="400"></canvas>

<h2>Expense List</h2>
<ul id="expense-list"></ul>
