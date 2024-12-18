---
layout: post 
title: Packing Portal
search_exclude: true
permalink: /travel/paris/packing_portal_paris
menu: nav/paris_hotbar.html
---

<body>
    <div class="container">
        <!-- Main Content -->
        <div class="main">
            <h1>Packing Portal: Paris</h1>
            <div class="packing-items">
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-1" onclick="clickFunction(this, 'Comfortable Shoes')">
                    <label for="packing-item-1">Comfortable Shoes</label><br>
                </div>
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-2" onclick="clickFunction(this, 'Umbrella')">
                    <label for="packing-item-2">Umbrella</label><br>
                </div>
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-3" onclick="clickFunction(this, 'Power Bank')">
                    <label for="packing-item-3">Power Bank</label><br>
                </div>
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-4" onclick="clickFunction(this, 'Lip Balm')">
                    <label for="packing-item-4">Lip Balm</label><br>
                </div>
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-5" onclick="clickFunction(this, 'French Dictionary')">
                    <label for="packing-item-5">French Dictionary</label><br>
                </div>
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-6" onclick="clickFunction(this, 'France Guidebook')">
                    <label for="packing-item-6">France Guidebook</label><br>
                </div>
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-7" onclick="clickFunction(this, 'Smartphone Charger')">
                    <label for="packing-item-7">Smartphone Charger</label><br>
                </div>
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-8" onclick="clickFunction(this, 'Water Bottle')">
                    <label for="packing-item-8">Water Bottle</label><br>
                </div>
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-9" onclick="clickFunction(this, 'Comfortable Socks')">
                    <label for="packing-item-9">Comfortable Socks</label><br>
                </div>
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-10" onclick="clickFunction(this, 'Hat')">
                    <label for="packing-item-10">Hat</label><br>
                </div>
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-11" onclick="clickFunction(this, 'Sunglasses')">
                    <label for="packing-item-11">Sunglasses</label><br>
                </div>
                <div class="packing-item">
                    <input type="checkbox" id="packing-item-12" onclick="clickFunction(this, 'Snacks')">
                    <label for="packing-item-12">Snacks</label><br>
                </div>
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
        <div class="personal_checklist">
            <h3>Personal Packing List</h3>
            <hr>
            <ul id="checklist_area"></ul>
        </div>
    </div>
</body>
<script src="../../assets/js/travel/packing_portal.js"></script>

<script>

function clickFunction(checkbox, itemText) {
  
  // personal checklist
  const personal_checklist = document.getElementById("checklist_area");

  // logic for checkbox
  if (checkbox.checked){

    // add to personal checklist

    const personal_checklist_item = document.createElement("li");
    personal_checklist_item.textContent = itemText;
    personal_checklist_item.setAttribute("id", checkbox.id + "-item");
    personal_checklist.appendChild(personal_checklist_item);
  } else {

    // remove from personal checklist

    const personal_checklist_item = document.getElementById(checkbox.id + "-item");
    if (personal_checklist_item) {
        personal_checklist.removeChild(personal_checklist_item);
    }
  }
}

</script>


<style>

.container {
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    gap: 20px;
}

.content-wrapper {
    display: flex;
    flex: 3 1 600px;
    gap: 20px;
}

.main {
    flex: 3;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    float: left;
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

.filters {
    flex: 1;
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

.filters button:active {
    background-color: blue;
}

.personal_checklist {
    flex: 3;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.personal_checklist h3 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.personal_checklist li {
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
    color: black;
}

.personal_checklist hr {
    border: 2px solid black;
}

</style>