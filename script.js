'use strict';

// Players
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const playerActiveEl = document.querySelector('.player--active');

// New Game
const newGame = document.querySelector('.btn--new');

// Dice Operatives
const dice = document.querySelector('.dice');
const diceRoll = document.querySelector('.btn--roll');
const diceHold = document.querySelector('.btn--hold');

// Scores
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');

// Player Switch
const switchPlayer = function () {
  document.getElementById(`current--${activePlayerEl}`).textContent = 0;
  currentScore = 0;
  activePlayerEl = activePlayerEl === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

let scores, currentScore, activePlayerEl, gameActive;

// Starting condition
const startingCondition = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayerEl = 0;
  gameActive = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
  dice.classList.remove('hidden');
};

startingCondition();

// Roll dice
diceRoll.addEventListener('click', () => {
  if (gameActive) {
    const number = Math.trunc(Math.random() * 6) + 1;
    //Display Dice
    dice.classList.remove('hidden');
    dice.src = `dice-${number}.png`;

    // Check for Rolled "1"-- SWITCH TO NEXT PLAYER
    if (number !== 1) {
      currentScore += number;
      document.getElementById(`current--${activePlayerEl}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

diceHold.addEventListener('click', () => {
  if (gameActive) {
    scores[activePlayerEl] += currentScore;

    document.getElementById(`score--${activePlayerEl}`).textContent =
      scores[activePlayerEl];

    // If Score Hits 100
    if (scores[activePlayerEl] >= 100) {
      gameActive = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayerEl}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayerEl}`)
        .classList.remove('player--active');
    } else {
      // Switch to Next Player
      switchPlayer();
    }
  }
});

// New Game Start
newGame.addEventListener('click', startingCondition);
