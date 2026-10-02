const guessInput = document.getElementById("guess");
const guessButton = document.getElementById("guess-button");
const newGameButton = document.getElementById("new-game-button");

const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");

guessButton.addEventListener("click", makeGuess);

guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    makeGuess();
  }
});

async function makeGuess() {
  const guess = Number(guessInput.value);

  if (!guess) {
    message.textContent = "Please enter a number.";

    return;
  }

  if (guess < 1 || guess > 50) {
    message.textContent = "Enter a number between 1 and 50.";

    return;
  }

  const response = await fetch("/guess", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      guess: guess,
    }),
  });

  const data = await response.json();

  message.textContent = data.message;

  attemptsDisplay.textContent = data.attempts;

  if (data.correct) {
    guessButton.disabled = true;

    guessInput.disabled = true;

    message.textContent = data.message;
  }

  guessInput.value = "";

  guessInput.focus();
}

newGameButton.addEventListener("click", async function () {
  await fetch("/new-game", {
    method: "POST",
  });

  attemptsDisplay.textContent = "0";

  message.textContent = "Make your first guess!";

  guessInput.disabled = false;

  guessButton.disabled = false;

  guessInput.value = "";

  guessInput.focus();
});
