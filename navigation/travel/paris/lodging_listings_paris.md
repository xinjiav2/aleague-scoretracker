---
layout: post 
title: Lodging Listings
search_exclude: true
permalink: /travel/paris/lodging_listings_paris
menu: nav/paris_hotbar.html
---

<body>
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
        <div class="filter">Price</div>
        <div class="filter">Rating</div>
        <div class="filter">Nearby</div>
        <div class="filter">Food</div>
      </div>
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
<style>
  @import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
  body {
    font-family: "Poppins", sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    background-color: #f9f9f9;
  }
  .container {
    width: 80vw;
    padding: 20px;
  }
  .main-content {
    text-align: center;
  }
  header {
    margin-bottom: 10px;
  }
  .search-bar {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  .search-bar input {
    width: 60%;
    padding: 8px;
    margin-right: 5px;
    border: 1px solid #767676;
  }
  .search-bar button {
    padding: 8px 15px;
    border: 1px solid #767676;
  }
  .filters {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 10px 0;
    padding: 10px 0;
    background-color: #222;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .filter {
    padding: 10px 15px;
    background-color: #121212;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
  }
  .filter:hover {
    background-color: #e7e7e7;
  }
  .listings {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  .listing {
    padding: 15px;
    background-color: #222;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform .2s;
  }
  .listing:hover {
    transform: scale(1.02);
  }
  .listing img {
    max-width: 100%;
    border-radius: 5px;
    margin-top: 10px;
  }
</style>
