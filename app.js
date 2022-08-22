/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
const min = 1;
const max = 10;
const winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', (e) => {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', () => {
  const guess = parseInt(guessInput.value);

  // Validate input
  if (Number.isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    // Game over - WON
    gameOver(true, `${winningNum} is correct! YOU WIN!`);
  } else {
    // Wrong number
    guessesLeft--;

    if (guessesLeft === 0) {
      // Game over - LOST
      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNum}`
      );
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear the input
      guessInput.value = '';
      // Tell user its the wrong number
      setMessage(
        `${guess} is not correct, ${guessesLeft} guesses left!`,
        'red'
      );
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set win message
  setMessage(msg);

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(minVal, maxVal) {
  return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
