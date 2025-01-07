---
layout: post 
title: Lodging Listings
search_exclude: true
permalink: /travel/paris/lodging_listings_paris
menu: nav/paris_hotbar.html
---
<head>
  <link rel="stylesheet" href="../../assets/css/travel/lodging.css">
</head>
<body id="body">
  <div class="container">
    <main class="main-content">
      <header>
        <h1>Lodging Listings</h1>
        <hr>
        <div class="search-bar">
          <input type="text" placeholder="Search for a place...">
          <button>Go</button>
        </div>
      </header>
      <div class="filters">
        <div class="filter" data-filter="price">Price</div>
        <div class="filter" data-filter="rating">Rating</div>
        <div class="filter" data-filter="nearby">Nearby</div>
        <div class="filter" data-filter="food">Food</div>
        <div class="vertical-line"></div>
        <div class="apply" data-filter="apply">Apply</div>
      </div>
      <div class="filter-options">
        <div id="price-filter" class="filter-input hidden">
          <label for="price">Enter maximum price:</label>
          <input type="number" id="price" placeholder="e.g., 100">
        </div>
        <div id="rating-filter" class="filter-input hidden">
          <label for="rating">Select minimum rating:</label>
          <select id="rating">
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div id="nearby-filter" class="filter-input hidden">
          <label for="nearby">Enter maximum distance (miles):</label>
          <input type="number" id="nearby" placeholder="e.g., 10">
        </div>
        <div id="food-filter" class="filter-input hidden">
          <label for="food">Select dietary preference:</label>
          <select id="food">
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="lactose">Lactose Intolerant</option>
          </select>
        </div>
      </div>
      <p id="destination">Holiday Inn</p>
      <p id="place">San Diego</p>
      <div class="listings">
        <div class="listing">
          Holiday Inn Paris - Gare Lyon Bastille
          <img src="https://digital.ihg.com/is/image/ihg/holiday-inn-paris-7645687329-4x3">
        </div>
        <div class="listing">
          Hilton Paris Opera
          <img src="https://www.hilton.com/im/en/PAROPHI/6197839/parop-legrandsalon-106.jpg?impolicy=crop&cw=4500&ch=2519&gravity=NorthWest&xposition=0&yposition=240&rw=768&rh=430">
        </div>
        <div class="listing">
          Motel 6 Paris
          <img src="https://www.motel6.com/bin/g6/image.g6PropertyDetailSlider.jpg/content/dam/g6/hotel-assets/hotel-images/TX/8662/Motel_6_Paris_TX_Exterior-3.jpg">
        </div>
        <div class="listing">
          InterContinental Paris - Le Grand Hotel
          <img src="https://digital.ihg.com/is/image/ihg/intercontinental-paris-7402998247-2x1">
        </div>
        <div class="listing">
          NH Paris de l'Est
          <img src="https://img.nh-hotels.net/4BMr8a/6MXbM3/original/NH_Gare_De_L%E2%80%99Est_Bar_Interior_Empty.jpg?output-quality=70&resize=555:*&composite-to=center,center|555:280&background-color=white">
        </div>
      </div>
    </main>
  </div>
</body>

<script src="../../assets/js/travel/lodging.js"></script>