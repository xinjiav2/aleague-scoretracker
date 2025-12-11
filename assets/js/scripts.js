const playerList = [
  'Jacob Wu', 'Srijan Atti', 'Saaras Kodali', 'Amy Yuan', 'Ryan Gonzalez', 'Preston Foster', "Advik Garg", "Aryan Shrimali", 
  "Anish Degalmadikar",  "Liam Vinson",  "Aashray Rajagopalan", "Vasanth Rajasekaran", "Kiruthic Selvakumar", "Derek Kang", 
  "Dylan Zhang", "Kasra Kermani", "Bryan Chen", "Adhav Selvan", "Nikhil Maturi","Rishab Shyamal", "Meryl Chen", "Michelle Yu", 
  'Nathan Do', 'Hamin Park', 'Ian Huang', "Santhosh Karthik", "Zhengji Li", 'Sahith Bobba', "Caleb Park", "Advait Deshpande", 
  "Skandan Sundar", "Akhil Kulkarni", 'Roxana Khamooshian', 'Aarav Wadhwani', 'Oliver Zhang', 'Rigved Reddy Gaddam', 'Narumi Yoshida', 
  'Aaron Tambiah', 'Ribhav Deep', 'Ryan Gui', 'Isaac Tsai', 'Aarav Sriramagiri', 'Pracheth Vitthaladevuni', 'Kaylen Tong', 'Vincent Pan', 
  'Zipei Qin', 'Aiden Shim', 'Nicholas Chi', 'Ribhav Deep'
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
        <div class="checkbox-item">
          <input type="checkbox" class="modern-checkbox" data-type="dead" data-team="A">
          <span class="checkbox-label dead-label">Dead</span>
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
        <div class="checkbox-item">
          <input type="checkbox" class="modern-checkbox" data-type="dead" data-team="B">
          <span class="checkbox-label dead-label">Dead</span>
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
    const dead = row.querySelector('.dead-checkbox');
    
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

    if (dead.checked) {
      scoreA += 0;
      scoreB += 0;
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
