// Helper for showing colored messages
function showMessage(text, isError = false) {
  const message = document.getElementById('message');
  if (!message) return;
  message.textContent = text;
  message.className = 'message ' + (isError ? 'error' : 'success');
}

// User registration
function register() {
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value;

  if (!username || !password) {
    showMessage('Please enter username and password.', true);
    return;
  }

  if (localStorage.getItem('user_' + username)) {
    showMessage('Username already taken.', true);
    return;
  }

  localStorage.setItem('user_' + username, password);
  showMessage('Registration successful! You can now login.', false);

  // Clear fields
  document.getElementById('regUsername').value = '';
  document.getElementById('regPassword').value = '';
}

// User login
function login() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!username || !password) {
    showMessage('Please enter username and password.', true);
    return;
  }

  const savedPass = localStorage.getItem('user_' + username);
  if (!savedPass || savedPass !== password) {
    showMessage('Invalid username or password.', true);
    return;
  }

  localStorage.setItem('loggedInUser', username);
  showMessage('Login successful! Welcome, ' + username + '.', false);

  // Clear fields
  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';
}

// Slots game logic
function playSlots() {
  const user = localStorage.getItem('loggedInUser');
  if (!user) {
    showMessage('You must be logged in to play.', true);
    return;
  }

  const symbols = ['🍀', '⭐', '🍒', '💎', '7️⃣'];
  const slot1 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot2 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot3 = symbols[Math.floor(Math.random() * symbols.length)];

  const resultElem = document.getElementById('slotsResult');
  resultElem.textContent = `${slot1} - ${slot2} - ${slot3}`;

  if (slot1 === slot2 && slot2 === slot3) {
    showMessage(`🎉 Jackpot! You won! ${slot1} x3`, false);
  } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
    showMessage('Nice! Two symbols matched!', false);
  } else {
    showMessage('Try again!', true);
  }
}

// Dice game logic
function playDice() {
  const user = localStorage.getItem('loggedInUser');
  if (!user) {
    showMessage('You must be logged in to play.', true);
    return;
  }

  const guessInput = document.getElementById('diceGuess');
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 6) {
    showMessage('Please enter a valid guess (1-6).', true);
    return;
  }

  const roll = Math.floor(Math.random() * 6) + 1;
  const resultElem = document.getElementById('diceResult');
  resultElem.textContent = `🎲 Rolled: ${roll}`;

  if (guess === roll) {
    showMessage('🎉 You guessed it right! You win!', false);
  } else {
    showMessage('Better luck next time!', true);
  }
}