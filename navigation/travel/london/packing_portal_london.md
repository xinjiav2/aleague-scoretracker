---
layout: post 
title: Packing Portal
search_exclude: true
permalink: /travel/London/packing_portal
---


<body>
    <div class="container">
        <!-- Main Content -->
        <div class="main">
            <h1>Packing Portal</h1>
            <div class="packing-items">
                <div class="packing-item">Packing Item</div>
                <div class="packing-item">Packing Item</div>
                <div class="packing-item">Packing Item</div>
                <div class="packing-item">Packing Item</div>
                <div class="packing-item">Packing Item</div>
                <div class="packing-item">Packing Item</div>
                <div class="packing-item">Packing Item</div>
            </div>
        </div>
        <!-- Filters -->
        <div class="filters">
            <h3>Filters</h3>
            <button>Season</button>
            <button>Trip Duration</button>
            <button>Age</button>
            <button>Transportation</button>
            <button>Technology</button>
        </div>
    </div>
</body>

<style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f9f9f9;
            overflow-x: hidden;
        }

        .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            max-width: 1200px;
            gap: 20px;
            margin: 0;
            box-sizing: border-box;
        }

        /* Main Content */
        .main {
            flex: 2 1 600px;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
        }

        .main h1 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
            color: black;
        }


        .packing-items {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
        }

        .packing-item {
            padding: 15px;
            background: #f1f1f1;
            border-radius: 5px;
            text-align: center;
            font-size: 18px;
            color: black;
        }

        /* Filters */
        .filters {
            flex: 1 1 200px;
            background: #eaf4ff;
            padding: 20px;
            border-radius: 10px;
            box-sizing: border-box;
        }

        .filters h3 {
            text-align: center;
            margin-bottom: 20px;
            color: black;
        }

        .filters button {
            display: block;
            width: 100%;
            margin: 10px 0;
            padding: 10px;
            background-color: #d8ecff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        .filters button:hover {
            background-color: #b5dbff;
        }
    </style>
