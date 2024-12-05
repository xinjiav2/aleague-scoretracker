---
layout: post 
title: Paris Activity Planner
permalink: /travel/Paris/activity
menu: nav/paris_hotbar.html
---
<div class="container">
    <div class="card">
        <a href="{{site.baseurl}}/travel/Paris/activity/chat">
            <img src="{{site.baseurl}}/images/eiffel_paris.jpg" alt="Eiffel Tower">
            <p>Eiffel Tower</p>
        </a>
    </div>
    <div class="card">
        <a href="{{site.baseurl}}/travel/Paris/activity/chat">
            <img src="{{site.baseurl}}/images/louvre_paris.jpeg" alt="Louvre Museum" height="100" width="500">
            <p>Louvre Museum</p>
        </a>
    </div>
    <div class="card">
        <a href="{{site.baseurl}}/travel/Paris/activity/chat">
            <img src="{{site.baseurl}}/images/notre_dame_paris.jpeg" alt="Notre-Dame Cathedral">
            <p>Notre-Dame Cathedral</p>
        </a>
    </div>
    <div class="card">
        <a href="{{site.baseurl}}/travel/Paris/activity/chat">
            <img src="{{site.baseurl}}/images/palace_versailles_paris.jpg" alt="Palace of Versailles">
            <p>Palace of Versailles</p>
        </a>
    </div>
    <div class="card">
        <a href="{{site.baseurl}}/travel/Paris/activity/chat">
            <img src="{{site.baseurl}}/images/champs-elysees.jpeg" alt="Champs-Élysées">
            <p>Champs-Élysées</p>
        </a>
    </div>
</div>


<style>
h1 {
    text-align: center;
    font-size: 2rem;
    color: #007bff;
    margin: 20px 0;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}

.card {
    text-align: center;
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s;
}

.card:hover {
    transform: scale(1.05);
}

.card img {
    width: 100%;
    height: auto;
}

.card p {
    margin: 10px 0;
    font-size: 1rem;
    color: #333;
}

.card a {
    text-decoration: none;
    color: #007bff;
}

.card a:hover {
    color: #0056b3;
}
</style>