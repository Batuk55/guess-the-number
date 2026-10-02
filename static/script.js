const guessInput = document.getElementById("guess");

const guessButton = document.getElementById("guess-button");

const newGameButton = document.getElementById("new-game-button");

const message = document.getElementById("message");

const attemptsDisplay = document.getElementById("attempts");

const bestScoreDisplay = document.getElementById("best-score");

const gameCard = document.getElementById("game-card");

const gameIcon = document.getElementById("game-icon");

const gameTitle = document.getElementById("game-title");

/* =========================
   BEST SCORE
   ========================= */

let bestScore = localStorage.getItem("bestScore");

if (bestScore !== null) {
  bestScoreDisplay.textContent = bestScore;
}

/* =========================
   GUESS BUTTON
   ========================= */

guessButton.addEventListener("click", makeGuess);

/* =========================
   ENTER KEY
   ========================= */

guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    makeGuess();
  }
});

/* =========================
   MAKE GUESS
   ========================= */

async function makeGuess() {
  const guess = Number(guessInput.value);

  /* Empty input */

  if (!guess) {
    showError("Please enter a number.");

    return;
  }

  /* Invalid range */

  if (guess < 1 || guess > 50) {
    showError("Enter a number between 1 and 50.");

    return;
  }

  /* Disable while processing */

  guessButton.disabled = true;

  try {
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

    /* Update attempts */

    attemptsDisplay.textContent = data.attempts;

    /* Remove old states */

    message.classList.remove("high", "low", "correct");

    /* =====================
           TOO HIGH
           ===================== */

    if (data.status === "high") {
      message.textContent = "📈 Too high! Try a smaller number.";

      message.classList.add("high");
    } else if (data.status === "low") {
      /* =====================
           TOO LOW
           ===================== */
      message.textContent = "📉 Too low! Try a greater number.";

      message.classList.add("low");
    } else if (data.status === "correct") {
      /* =====================
           CORRECT
           ===================== */
      handleWin(data.attempts);
    }
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";

    message.classList.remove("high", "low", "correct");
  }

  guessInput.value = "";

  guessInput.focus();

  /* Re-enable button */

  if (!gameCard.classList.contains("win")) {
    guessButton.disabled = false;
  }
}

/* =========================
   WIN
   ========================= */

function handleWin(attempts) {
  message.textContent = "🎉 You guessed it!";

  message.classList.add("correct");

  gameIcon.textContent = "🏆";

  gameIcon.classList.add("win-icon");

  gameTitle.textContent = "You Got It!";

  gameCard.classList.add("win");

  guessButton.disabled = true;

  guessInput.disabled = true;

  /* =====================
       BEST SCORE
       ===================== */

  if (bestScore === null || attempts < Number(bestScore)) {
    bestScore = attempts;

    localStorage.setItem("bestScore", bestScore);

    bestScoreDisplay.textContent = bestScore;

    message.textContent = "🏆 New Best Score!";
  }
}

/* =========================
   NEW GAME
   ========================= */

newGameButton.addEventListener("click", startNewGame);

async function startNewGame() {
  newGameButton.disabled = true;

  try {
    await fetch("/new-game", {
      method: "POST",
    });

    /* Reset UI */

    attemptsDisplay.textContent = "0";

    message.textContent = "Make your first guess!";

    message.classList.remove("high", "low", "correct");

    gameCard.classList.remove("win");

    gameIcon.textContent = "🎯";

    gameIcon.classList.remove("win-icon");

    gameTitle.textContent = "Guess The Number";

    guessInput.disabled = false;

    guessButton.disabled = false;

    guessInput.value = "";

    guessInput.focus();
  } catch (error) {
    message.textContent = "Could not start a new game.";
  }

  newGameButton.disabled = false;
}

/* =========================
   ERROR
   ========================= */

function showError(text) {
  message.textContent = text;

  message.classList.remove("high", "low", "correct");

  gameCard.classList.remove("shake");

  /*
       Force browser to restart
       the animation.
    */

  void gameCard.offsetWidth;

  gameCard.classList.add("shake");

  guessInput.focus();
}
