---
layout: post
title: Academic League Scoretracker
search_exclude: true
hide: true
show_reading_time: false
menu: nav/home.html
---

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <title>Academic League Scoretracker</title>
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">Academic League; Reimagined</h1>
      <h1 class="title"></h1>
      <p class="subtitle">Advanced Competition Scoretracker</p>
    </div>
    
    <div class="setup-section" id="setupSection">
      <div class="team-setup">
        <div class="team-card">
          <div class="team-label">
            <div class="team-icon">A</div>
            Team Alpha
          </div>
          <div class="input-group">
            <input type="text" class="modern-input" id="teamANameInput" placeholder="Enter team name..." />
          </div>
          <div class="players-checkbox-container" id="teamAPlayersContainer"></div>
          <button class="add-player-btn" onclick="loadPlayers('A')">Load Players</button>
        </div>
        
        <div class="team-card">
          <div class="team-label">
            <div class="team-icon" style="background: linear-gradient(45deg, var(--accent-secondary), var(--accent-tertiary));">B</div>
            Team Beta
          </div>
          <div class="input-group">
            <input type="text" class="modern-input" id="teamBNameInput" placeholder="Enter team name..." />
          </div>
          <div class="players-checkbox-container" id="teamBPlayersContainer"></div>
          <button class="add-player-btn" onclick="loadPlayers('B')">Load Players</button>
        </div>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="start-button" onclick="startMatch()">
           Initialize Match
        </button>
        <button class="start-button" onclick="loadSavedMatch()" style="background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary));">
           Load Saved
        </button>
        <button class="start-button" onclick="clearSavedData()" style="background: linear-gradient(135deg, #ff6b6b, #ff8c42); min-width: 150px;">
           Clear Data
        </button>
      </div>
    </div>

    <div class="match-section hidden" id="matchSection">
      <div class="score-header">
        <div class="team-score">
          <div class="team-name" id="displayTeamA">Team Alpha</div>
          <div class="score-display" id="scoreA">0</div>
        </div>
        <div class="score-divider"></div>
        <div class="team-score">
          <div class="team-name" id="displayTeamB">Team Beta</div>
          <div class="score-display" id="scoreB">0</div>
        </div>
      </div>

      <div class="questions-container" id="questionsContainer">
        <!-- Dynamic question rows will be added here -->
      </div>
    </div>

    <div class="stats-section hidden" id="statsSection">
      <div class="stats-header">
        <h2 class="stats-title">Player Performance Analytics</h2>
        <p class="stats-subtitle">Real-time statistics and category breakdown</p>
      </div>
      
      <div class="player-stats-grid" id="playerStatsGrid">
        <!-- Dynamic player cards will be added here -->
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
  <script src="assets/js/scripts.js"></script>
</body>
</html>