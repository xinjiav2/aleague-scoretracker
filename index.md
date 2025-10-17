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
  <title></title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    :root {
      --primary-bg: #0a0a0f;
      --secondary-bg: #1a1a2e;
      --card-bg: rgba(30, 30, 60, 0.4);
      --glass-bg: rgba(255, 255, 255, 0.05);
      --accent-primary: #00d4ff;
      --accent-secondary: #7c3aed;
      --accent-tertiary: #06ffa5;
      --text-primary: #ffffff;
      --text-secondary: #a8b3cf;
      --text-muted: #6b7280;
      --border-color: rgba(255, 255, 255, 0.1);
      --shadow-glow: 0 0 40px rgba(0, 212, 255, 0.3);
      --shadow-subtle: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      color: inherit !important;
      text-decoration: none !important;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, var(--primary-bg) 0%, var(--secondary-bg) 50%, #0f0f23 100%);
      min-height: 100vh;
      color: var(--text-primary) !important;
      overflow-x: hidden;
      position: relative;
    }

    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(ellipse at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                  radial-gradient(ellipse at 40% 80%, rgba(6, 255, 165, 0.1) 0%, transparent 50%);
      pointer-events: none;
      z-index: -1;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      position: relative;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
      animation: slideDown 1s ease-out;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-50px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .title {
      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
      animation: gradientShift 4s ease-in-out infinite;
      filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
    }

    @keyframes gradientShift {
      0%, 100% { filter: hue-rotate(0deg); }
      50% { filter: hue-rotate(30deg); }
    }

    .subtitle {
      color: var(--text-secondary) !important;
      font-size: 1.1rem;
      font-weight: 400;
      opacity: 0.8;
    }

    .setup-section {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 2.5rem;
      margin-bottom: 3rem;
      box-shadow: var(--shadow-subtle);
      animation: slideUp 1s ease-out 0.2s both;
      position: relative;
      overflow: hidden;
    }

    .setup-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
      animation: shimmer 3s ease-in-out infinite;
    }

    @keyframes shimmer {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .team-setup {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
      .team-setup {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    .team-card {
      background: var(--card-bg);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .team-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .team-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-glow);
      border-color: var(--accent-primary);
    }

    .team-card:hover::before {
      opacity: 1;
    }

    .team-label {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary) !important;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .team-icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--primary-bg) !important;
    }

    .input-group {
      margin-bottom: 1rem;
    }

    .modern-input {
      width: 100%;
      padding: 12px 16px;
      background: var(--glass-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      color: var(--text-primary) !important;
      font-size: 1rem;
      font-weight: 400;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .modern-input:focus {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
      background: rgba(255, 255, 255, 0.08);
    }

    .modern-select {
      width: 100%;
      padding: 10px 16px;
      background: var(--glass-bg);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      color: var(--text-primary) !important;
      font-size: 0.9rem;
      backdrop-filter: blur(10px);
      min-height: 100px;
      transition: all 0.3s ease;
    }

    .modern-select:focus {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
    }

    .modern-select option {
      background: var(--secondary-bg) !important;
      color: var(--text-primary) !important;
      padding: 8px;
    }

    .players-checkbox-container {
      max-height: 200px;
      overflow-y: auto;
      padding: 12px;
      background: var(--glass-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      backdrop-filter: blur(10px);
      margin-bottom: 0.5rem;
    }

    .players-checkbox-container::-webkit-scrollbar {
      width: 4px;
    }

    .players-checkbox-container::-webkit-scrollbar-track {
      background: var(--glass-bg);
      border-radius: 2px;
    }

    .players-checkbox-container::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 2px;
    }

    .player-checkbox-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem;
      margin-bottom: 0.25rem;
      border-radius: 8px;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .player-checkbox-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .player-checkbox {
      appearance: none;
      width: 18px;
      height: 18px;
      border: 2px solid var(--border-color);
      border-radius: 4px;
      background: var(--glass-bg);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      flex-shrink: 0;
    }

    .player-checkbox:checked {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-color: var(--accent-primary);
    }

    .player-checkbox:checked::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--primary-bg) !important;
      font-size: 11px;
      font-weight: 700;
    }

    .player-label {
      font-size: 0.9rem;
      font-weight: 400;
      color: var(--text-primary) !important;
      cursor: pointer;
      flex: 1;
    }

    .add-player-btn {
      width: 100%;
      padding: 10px 16px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border: none;
      border-radius: 10px;
      color: var(--primary-bg) !important;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 0.5rem;
    }

    .add-player-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
      filter: brightness(1.1);
    }

    .start-button {
      display: block;
      margin: 0 auto;
      padding: 16px 48px;
      background: linear-gradient(135deg, var(--accent-tertiary), var(--accent-primary));
      border: none;
      border-radius: 50px;
      color: var(--primary-bg) !important;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.4s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      overflow: hidden;
      min-width: 200px;
    }

    .start-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.6s ease;
    }

    .start-button:hover::before {
      left: 100%;
    }

    .start-button:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 15px 40px rgba(6, 255, 165, 0.4);
      filter: brightness(1.2);
    }

    .match-section {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 2rem;
      box-shadow: var(--shadow-subtle);
      animation: slideUp 1s ease-out 0.4s both;
      overflow: hidden;
    }

    .score-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1rem 2rem;
      background: var(--card-bg);
      border-radius: 16px;
      border: 1px solid var(--border-color);
    }

    .team-score {
      text-align: center;
      flex: 1;
    }

    .team-name {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-primary) !important;
      margin-bottom: 0.5rem;
    }

    .score-display {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transition: all 0.3s ease;
    }

    .score-divider {
      width: 2px;
      height: 60px;
      background: linear-gradient(180deg, var(--accent-primary), var(--accent-secondary));
      margin: 0 2rem;
      border-radius: 2px;
    }

    .questions-container {
      max-height: 60vh;
      overflow-y: auto;
      padding-right: 1rem;
    }

    .questions-container::-webkit-scrollbar {
      width: 6px;
    }

    .questions-container::-webkit-scrollbar-track {
      background: var(--glass-bg);
      border-radius: 3px;
    }

    .questions-container::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 3px;
    }

    .question-row {
      display: grid;
      grid-template-columns: 60px 1fr 150px 100px 1fr;
      gap: 1rem;
      align-items: center;
      padding: 1rem;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      margin-bottom: 1rem;
      transition: all 0.3s ease;
    }

    .question-row:hover {
      transform: translateX(4px);
      border-color: var(--accent-primary);
      box-shadow: 0 4px 20px rgba(0, 212, 255, 0.2);
    }

    .question-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 50%;
      font-weight: 700;
      color: var(--primary-bg) !important;
      font-size: 0.9rem;
    }

    .team-controls {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .player-select {
      width: 100%;
      padding: 8px 12px;
      background: var(--glass-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-primary) !important;
      font-size: 0.9rem;
      backdrop-filter: blur(10px);
    }

    .player-select option {
      background: var(--secondary-bg) !important;
      color: var(--text-primary) !important;
    }

    .checkbox-group {
      display: flex;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .modern-checkbox {
      appearance: none;
      width: 20px;
      height: 20px;
      border: 2px solid var(--border-color);
      border-radius: 4px;
      background: var(--glass-bg);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .modern-checkbox:checked {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-color: var(--accent-primary);
    }

    .modern-checkbox:checked::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--primary-bg) !important;
      font-size: 12px;
      font-weight: 700;
    }

    .checkbox-label {
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--text-secondary) !important;
    }

    .correct-label {
      color: var(--accent-tertiary) !important;
    }

    .neg-label {
      color: #ff6b6b !important;
    }

    .category-select, .bonus-input {
      padding: 8px 12px;
      background: var(--glass-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-primary) !important;
      font-size: 0.9rem;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }

    .category-select option {
      background: var(--secondary-bg) !important;
      color: var(--text-primary) !important;
    }

    .bonus-input {
      width: 80px;
      text-align: center;
    }

    .bonus-input:focus, .category-select:focus, .player-select:focus {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.1);
    }

    .score-animation {
      animation: scoreGlow 0.6s ease-in-out;
    }

    @keyframes scoreGlow {
      0%, 100% { transform: scale(1); }
      50% { 
        transform: scale(1.1); 
        filter: drop-shadow(0 0 15px var(--accent-primary));
      }
    }

    .loading-spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid var(--border-color);
      border-radius: 50%;
      border-top-color: var(--accent-primary);
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 1024px) {
      .question-row {
        grid-template-columns: 1fr;
        gap: 0.5rem;
        text-align: center;
      }
      
      .score-header {
        flex-direction: column;
        gap: 1rem;
      }

      .score-divider {
        width: 60px;
        height: 2px;
        margin: 0;
      }
    }

    .hidden {
      display: none;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(100px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .stats-section {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 2rem;
      margin-top: 2rem;
      box-shadow: var(--shadow-subtle);
      animation: slideUp 1s ease-out 0.6s both;
    }

    .stats-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .stats-title {
      font-size: 1.8rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }

    .stats-subtitle {
      color: var(--text-secondary) !important;
      font-size: 1rem;
      opacity: 0.8;
    }

    .player-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .player-card {
      background: var(--card-bg);
      backdrop-filter: blur(15px);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 1.5rem;
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
    }

    .player-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .player-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 60px rgba(0, 212, 255, 0.2);
      border-color: var(--accent-primary);
    }

    .player-card:hover::before {
      opacity: 1;
    }

    .player-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .player-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .player-avatar {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--primary-bg) !important;
      box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
    }

    .player-details h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-primary) !important;
      margin-bottom: 0.2rem;
    }

    .team-badge {
      padding: 4px 12px;
      background: linear-gradient(135deg, var(--accent-tertiary), var(--accent-primary));
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary-bg) !important;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stats-content {
      display: grid;
      grid-template-columns: 1fr 200px;
      gap: 1.5rem;
      align-items: center;
    }

    .stats-numbers {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .stat-item {
      text-align: center;
      padding: 1rem;
      background: var(--glass-bg);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
    }

    .stat-item:hover {
      transform: translateY(-2px);
      border-color: var(--accent-primary);
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.3rem;
    }

    .stat-label {
      font-size: 0.8rem;
      color: var(--text-secondary) !important;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    .chart-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chart-canvas {
      max-width: 180px;
      max-height: 180px;
    }

    .chart-legend {
      margin-top: 1rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: var(--text-secondary) !important;
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    @media (max-width: 768px) {
      .player-stats-grid {
        grid-template-columns: 1fr;
      }
      
      .stats-content {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .stats-numbers {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">Academic League by Kiruthic</h1>
      <h1 class="title">Vote Kiruthic For VP</h1>
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
          🚀 Initialize Match
        </button>
        <button class="start-button" onclick="loadSavedMatch()" style="background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary));">
          📂 Load Saved
        </button>
        <button class="start-button" onclick="clearSavedData()" style="background: linear-gradient(135deg, #ff6b6b, #ff8c42); min-width: 150px;">
          🗑️ Clear Data
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
  <script>
    const playerList = [
      'Jacob Wu', 'Srijan Atti', 'Saaras Kodali', 'Amy Yuan', 'Ryan Gonzalez', 'Preston Foster', "Advik Garg", "Aryan Shrimali", "Anish Degalmadikar",  "Liam Vinson",  "Aashray Rajagopalan", "Vasanth Rajasekaran", "Kiruthic Selvakumar", "Derek Kang", "Dylan Zhang", "Kasra Kermani", "Bryan Chen", "Adhav Selvan", "Nikhil Maturi",
      "Rishab Shyamal", "Meryl Chen", "Michelle Yu", 'Nathan Do', 'Hamin Park', 'Ian Huang', "Santhosh Karthik", "Zhengji Li", 'Sahith Bobba', "Caleb Park", "Advait Deshpande", "Skandan Sundar", "Akhil Kulkarni", 'Roxana Khamooshian', 'Aarav Wadhwani', 'Oliver Zhang', 'Rigved Reddy Gaddam', 'Narumi Yoshida', 'Aaron Tambiah', 'Ribhav Deep', 'Ryan Gui', 'Isaac Tsai', 'Aarav Sriramagiri', 'Pracheth (Kirby one)', 'Aarav Sriramagiri', 'ssprinkle1'
    ];

    const categories = ["Math", "Science", "History", "Literature", "Art", "Geography", "Current Events"];
    
    let state = {
      teamA: "",
      teamB: "",
      playersA: [],
      playersB: [],
      scoreA: 0,
      scoreB: 0,
      questionCount: 0,
      playerStats: {} // Track individual player statistics
    };

    const categoryColors = {
      "Math": "#00d4ff",
      "Science": "#7c3aed", 
      "History": "#06ffa5",
      "Literature": "#ff6b6b",
      "Art": "#ffd93d",
      "Geography": "#ff8c42",
      "Current Events": "#a78bfa"
    };
    
    const StorageManager = {
      STORAGE_KEY: 'academicLeagueData',
      
      saveState() {
        const dataToSave = {
          state: state,
          timestamp: Date.now(),
          version: '1.0'
        };
        try {
          const jsonData = JSON.stringify(dataToSave);
          localStorage.setItem(this.STORAGE_KEY, jsonData);
          this.showNotification('Data saved successfully!', 'success');
        } catch (error) {
          console.error('Failed to save data:', error);
          this.showNotification('Failed to save data', 'error');
        }
      },
      
      loadState() {
        try {
          const savedData = localStorage.getItem(this.STORAGE_KEY);
          if (!savedData) return null;
          
          const parsedData = JSON.parse(savedData);
          return parsedData.state;
        } catch (error) {
          console.error('Failed to load data:', error);
          return null;
        }
      },
      
      clearData() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.showNotification('Data cleared successfully!', 'success');
      },
      
      showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 24px;
          background: ${type === 'success' ? 'linear-gradient(135deg, var(--accent-tertiary), var(--accent-primary))' : 'linear-gradient(135deg, #ff6b6b, #ff8c42)'};
          color: var(--primary-bg);
          border-radius: 12px;
          font-weight: 600;
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.remove();
        }, 3000);
      }
    };

    function loadPlayers(team) {
      const container = document.getElementById(`team${team}PlayersContainer`);
      container.innerHTML = "";
      
      playerList.forEach(name => {
        const checkboxItem = document.createElement("div");
        checkboxItem.className = "player-checkbox-item";
        
        checkboxItem.innerHTML = `
          <input type="checkbox" class="player-checkbox" id="${team}-${name.replace(/\s+/g, '-')}" value="${name}" onchange="StorageManager.saveState()">
          <label class="player-label" for="${team}-${name.replace(/\s+/g, '-')}">${name}</label>
        `;

        
        container.appendChild(checkboxItem);
      });
    }

    function startMatch() {
      const teamAName = document.getElementById("teamANameInput").value.trim() || "Team Alpha";
      const teamBName = document.getElementById("teamBNameInput").value.trim() || "Team Beta";
      
      const teamACheckboxes = document.querySelectorAll('#teamAPlayersContainer .player-checkbox:checked');
      const teamBCheckboxes = document.querySelectorAll('#teamBPlayersContainer .player-checkbox:checked');
      
      state.teamA = teamAName;
      state.teamB = teamBName;
      state.playersA = Array.from(teamACheckboxes).map(cb => cb.value);
      state.playersB = Array.from(teamBCheckboxes).map(cb => cb.value);
      
      if (state.playersA.length === 0 || state.playersB.length === 0) {
        alert("Please select players for both teams before starting the match.");
        return;
      }
      
      // Initialize player stats
      [...state.playersA, ...state.playersB].forEach(player => {
        state.playerStats[player] = {
          correct: 0,
          negs: 0,
          categories: {},
          team: state.playersA.includes(player) ? 'A' : 'B'
        };
      });
      
      document.getElementById("displayTeamA").textContent = teamAName;
      document.getElementById("displayTeamB").textContent = teamBName;
      
      document.getElementById("setupSection").classList.add("hidden");
      document.getElementById("matchSection").classList.remove("hidden");
      document.getElementById("statsSection").classList.remove("hidden");
      
      updatePlayerStats();
      addQuestionRow();
      StorageManager.saveState();
    }

    function loadSavedMatch() {
      const savedState = StorageManager.loadState();
      if (!savedState) {
        StorageManager.showNotification('No saved data found', 'error');
        return;
      }
      
      // Restore state
      // Restore state more carefully
      state.teamA = savedState.teamA || "";
      state.teamB = savedState.teamB || "";  
      state.playersA = savedState.playersA || [];
      state.playersB = savedState.playersB || [];
      state.scoreA = savedState.scoreA || 0;
      state.scoreB = savedState.scoreB || 0;
      state.questionCount = savedState.questionCount || 0;
      state.playerStats = savedState.playerStats || {};
      
      // Update UI elements
      document.getElementById("teamANameInput").value = state.teamA;
      document.getElementById("teamBNameInput").value = state.teamB;
      document.getElementById("displayTeamA").textContent = state.teamA;
      document.getElementById("displayTeamB").textContent = state.teamB;
      document.getElementById("scoreA").textContent = state.scoreA;
      document.getElementById("scoreB").textContent = state.scoreB;
      
      // Load players and restore selections
      loadPlayers('A');
      loadPlayers('B');
      
      // Check the selected players
      setTimeout(() => {
        state.playersA.forEach(player => {
          const checkbox = document.getElementById(`A-${player.replace(/\s+/g, '-')}`);
          if (checkbox) checkbox.checked = true;
        });
        
        state.playersB.forEach(player => {
          const checkbox = document.getElementById(`B-${player.replace(/\s+/g, '-')}`);
          if (checkbox) checkbox.checked = true;
        });
      }, 200);
      
      // Show match section
      document.getElementById("setupSection").classList.add("hidden");
      document.getElementById("matchSection").classList.remove("hidden");
      document.getElementById("statsSection").classList.remove("hidden");
      
      // Restore questions (this requires rebuilding the question rows)
      rebuildQuestionRows();
      updatePlayerStats();
      
      StorageManager.showNotification('Match loaded successfully!', 'success');
    }

    function clearSavedData() {
      if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
        StorageManager.clearData();
        // Reset current state
        location.reload();
      }
    }

    function rebuildQuestionRows() {
      const container = document.getElementById("questionsContainer");
      container.innerHTML = "";
      
      // Reset question count and rebuild from scratch
      const savedQuestionCount = state.questionCount;
      state.questionCount = 0;
      
      // Add first question row
      addQuestionRow();
      
      // If there were more questions, restore the count but don't add more rows
      // They'll be added automatically as the user interacts
      if (savedQuestionCount > 1) {
        state.questionCount = 1; // Keep it at 1 for now
      }
    }

    function addQuestionRow() {
      const container = document.getElementById("questionsContainer");
      const questionNum = ++state.questionCount;
      
      const row = document.createElement("div");
      row.className = "question-row";
      row.style.animationDelay = `${questionNum * 0.1}s`;
      
      row.innerHTML = `
        <div class="question-number">${questionNum}</div>
        
        <div class="team-controls">
          <select class="player-select" data-team="A">
            <option value="">Select Player</option>
            ${state.playersA.map(player => `<option value="${player}">${player}</option>`).join('')}
          </select>
          <div class="checkbox-group">
            <div class="checkbox-item">
              <input type="checkbox" class="modern-checkbox" data-type="correct" data-team="A">
              <span class="checkbox-label correct-label">Correct</span>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" class="modern-checkbox" data-type="neg" data-team="A">
              <span class="checkbox-label neg-label">NEG</span>
            </div>
          </div>
        </div>
        
        <select class="category-select">
          <option value="">Category</option>
          ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
        </select>
        
        <input type="number" class="bonus-input" min="0" max="30" value="0" placeholder="Bonus">
        
        <div class="team-controls">
          <select class="player-select" data-team="B">
            <option value="">Select Player</option>
            ${state.playersB.map(player => `<option value="${player}">${player}</option>`).join('')}
          </select>
          <div class="checkbox-group">
            <div class="checkbox-item">
              <input type="checkbox" class="modern-checkbox" data-type="correct" data-team="B">
              <span class="checkbox-label correct-label">Correct</span>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" class="modern-checkbox" data-type="neg" data-team="B">
              <span class="checkbox-label neg-label">NEG</span>
            </div>
          </div>
        </div>
      `;
      
      container.appendChild(row);
      
      // Add event listeners for scoring
      const checkboxes = row.querySelectorAll('.modern-checkbox');
      const bonusInput = row.querySelector('.bonus-input');
      
      [...checkboxes, bonusInput].forEach(element => {
        element.addEventListener('change', () => {
          recalculateScores();
          StorageManager.saveState(); // Auto-save on any change
          // Auto-add next row when current row is used
          if (isRowUsed(row) && questionNum === state.questionCount) {
            setTimeout(() => addQuestionRow(), 300);
          }
        });
      });
    }

    function isRowUsed(row) {
      const checkboxes = row.querySelectorAll('.modern-checkbox[data-type="correct"]');
      return Array.from(checkboxes).some(cb => cb.checked);
    }

    function recalculateScores() {
      let scoreA = 0, scoreB = 0;
      
      // Reset player stats
      Object.keys(state.playerStats).forEach(player => {
        state.playerStats[player].correct = 0;
        state.playerStats[player].negs = 0;
        state.playerStats[player].categories = {};
      });
      
      document.querySelectorAll('.question-row').forEach(row => {
        const correctA = row.querySelector('.modern-checkbox[data-type="correct"][data-team="A"]');
        const correctB = row.querySelector('.modern-checkbox[data-type="correct"][data-team="B"]');
        const negA = row.querySelector('.modern-checkbox[data-type="neg"][data-team="A"]');
        const negB = row.querySelector('.modern-checkbox[data-type="neg"][data-team="B"]');
        const bonus = row.querySelector('.bonus-input');
        const category = row.querySelector('.category-select');
        const playerSelectA = row.querySelector('.player-select[data-team="A"]');
        const playerSelectB = row.querySelector('.player-select[data-team="B"]');
        
        const bonusPoints = parseInt(bonus.value) || 0;
        const selectedCategory = category.value;
        const selectedPlayerA = playerSelectA.value;
        const selectedPlayerB = playerSelectB.value;
        
        if (correctA.checked && !correctB.checked) {
          scoreA += 3 + bonusPoints;
          if (selectedPlayerA && state.playerStats[selectedPlayerA]) {
            state.playerStats[selectedPlayerA].correct++;
            if (selectedCategory) {
              state.playerStats[selectedPlayerA].categories[selectedCategory] = 
                (state.playerStats[selectedPlayerA].categories[selectedCategory] || 0) + 1;
            }
          }
        }
        if (correctB.checked && !correctA.checked) {
          scoreB += 3 + bonusPoints;
          if (selectedPlayerB && state.playerStats[selectedPlayerB]) {
            state.playerStats[selectedPlayerB].correct++;
            if (selectedCategory) {
              state.playerStats[selectedPlayerB].categories[selectedCategory] = 
                (state.playerStats[selectedPlayerB].categories[selectedCategory] || 0) + 1;
            }
          }
        }
        
        if (negA.checked && selectedPlayerA && state.playerStats[selectedPlayerA]) {
          scoreA -= 1;
          state.playerStats[selectedPlayerA].negs++;
        }
        if (negB.checked && selectedPlayerB && state.playerStats[selectedPlayerB]) {
          scoreB -= 1;
          state.playerStats[selectedPlayerB].negs++;
        }
      });
      
      const scoreAElement = document.getElementById("scoreA");
      const scoreBElement = document.getElementById("scoreB");
      
      if (state.scoreA !== scoreA) {
        scoreAElement.classList.add("score-animation");
        setTimeout(() => scoreAElement.classList.remove("score-animation"), 600);
      }
      if (state.scoreB !== scoreB) {
        scoreBElement.classList.add("score-animation");
        setTimeout(() => scoreBElement.classList.remove("score-animation"), 600);
      }
      
      state.scoreA = scoreA;
      state.scoreB = scoreB;
      scoreAElement.textContent = scoreA;
      scoreBElement.textContent = scoreB;
      
      updatePlayerStats();
      StorageManager.saveState();
    }

    function updatePlayerStats() {
      const container = document.getElementById("playerStatsGrid");
      container.innerHTML = "";
      
      const allPlayers = [...state.playersA, ...state.playersB];
      
      allPlayers.forEach((player, index) => {
        const stats = state.playerStats[player];
        const isTeamA = stats.team === 'A';
        
        const card = document.createElement("div");
        card.className = "player-card";
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Calculate total questions answered
        const totalAnswered = stats.correct + stats.negs;
        
        // Prepare chart data
        const categories = Object.keys(stats.categories);
        const chartData = categories.map(cat => stats.categories[cat]);
        const chartColors = categories.map(cat => categoryColors[cat] || '#ffffff');
        
        card.innerHTML = `
          <div class="player-header">
            <div class="player-info">
              <div class="player-avatar" style="background: linear-gradient(135deg, ${isTeamA ? 'var(--accent-primary), var(--accent-secondary)' : 'var(--accent-secondary), var(--accent-tertiary)'})">
                ${player.split(' ').map(n => n[0]).join('')}
              </div>
              <div class="player-details">
                <h3>${player}</h3>
                <div class="team-badge" style="background: linear-gradient(135deg, ${isTeamA ? 'var(--accent-primary), var(--accent-secondary)' : 'var(--accent-secondary), var(--accent-tertiary)'})">
                  ${isTeamA ? state.teamA : state.teamB}
                </div>
              </div>
            </div>
          </div>
          
          <div class="stats-content">
            <div class="stats-numbers">
              <div class="stat-item">
                <div class="stat-value">${stats.correct}</div>
                <div class="stat-label">Correct</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${stats.negs}</div>
                <div class="stat-label">NEGs</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${totalAnswered}</div>
                <div class="stat-label">Total</div>
              </div>
            </div>
            
            <div class="chart-container">
              <canvas class="chart-canvas" id="chart-${index}" width="180" height="180"></canvas>
            </div>
          </div>
          
          <div class="chart-legend" id="legend-${index}">
            <!-- Legend will be populated by JavaScript -->
          </div>
        `;
        
        container.appendChild(card);
        
        // Create pie chart
        setTimeout(() => {
          createPieChart(`chart-${index}`, categories, chartData, chartColors, `legend-${index}`);
        }, 100);
      });
    }

    function createPieChart(canvasId, labels, data, colors, legendId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      
      // Only create chart if there's data
      if (data.length === 0 || data.every(d => d === 0)) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(90, 90, 70, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('No data yet', 90, 95);
        return;
      }
      
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: colors,
            borderColor: colors.map(color => color + '80'),
            borderWidth: 2,
            hoverBorderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(10, 10, 15, 0.9)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(0, 212, 255, 0.5)',
              borderWidth: 1,
              cornerRadius: 8,
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.parsed} questions`;
                }
              }
            }
          },
          animation: {
            animateRotate: true,
            duration: 1000
          }
        }
      });
      
      // Create custom legend
      const legendContainer = document.getElementById(legendId);
      if (legendContainer) {
        legendContainer.innerHTML = labels.map((label, index) => 
          `<div class="legend-item">
            <div class="legend-color" style="background-color: ${colors[index]}"></div>
            <span>${label} (${data[index]})</span>
          </div>`
        ).join('');
      }
    }

    // Initialize player dropdowns on load
    document.addEventListener('DOMContentLoaded', () => {
      loadPlayers('A');
      loadPlayers('B');
      
      // Add auto-save for team name inputs
      document.getElementById("teamANameInput").addEventListener('input', () => {
        StorageManager.saveState();
      });

      document.getElementById("teamBNameInput").addEventListener('input', () => {
        StorageManager.saveState();
      });
    });
  </script>
</body>
</html>