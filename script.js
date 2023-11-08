let randomNumber = Math.floor(Math.random() * 100) + 1;

const gameContainer = document.querySelector(".gameContainer");

const form = document.querySelector(".form");

const guessInput = document.querySelector(".guessInput");
const guessSubmit = document.querySelector(".guessSubmit");
const error = document.querySelector(".error");

const results = document.querySelector(".results");
const lastGuess = document.querySelector(".lastGuess");
const guesses = document.querySelector(".guesses");

const lastGuessActive = "active";
const lastGuessSuccess = "success";
const lastGuessCritical = "critical";
const lastGuessClasses = [lastGuessActive, lastGuessSuccess, lastGuessCritical];
const guessesShow = "show";

let guessCount = 1;
let hintText;
let resetButton;

guessInput.focus();

function setLastGuessText() {
    lastGuess.textContent = "Your results will show here."
}

setLastGuessText();

function checkGuess() {
    const userGuess = Number(guessInput.value);
    const isValidGuess = /^[1-9]/.test(userGuess);

    let errorMessage;

    if (!isValidGuess) {
        errorMessage = document.createElement("p");
        errorMessage.textContent = "Enter a number between 1 and 100.";
        !error.hasChildNodes() ? error.appendChild(errorMessage) : null;

    } else if (isValidGuess) {
        errorMessage = error.querySelector("p");
        errorMessage ? error.removeChild(errorMessage) : null;

        if (guessCount === 1) {
            guesses.textContent = "Previous guesses:";
            guesses.classList.add(guessesShow);
        }
        guesses.textContent = `${guesses.textContent} ${userGuess}`;

        if (userGuess === randomNumber) {
            lastGuess.textContent = "Congratulations! You guessed it 🎉";
            if (lastGuess.classList.contains(lastGuessActive, lastGuessCritical)) {
                lastGuess.classList.remove(lastGuessActive, lastGuessCritical);
            }
            lastGuess.classList.add(lastGuessSuccess);
            setGameOver();
        } else if (guessCount === 10) {
            lastGuess.textContent = "Game over! You're out of guesses 🤷‍♀️";
            lastGuess.classList.add(lastGuessCritical);
            setGameOver();
        } else {
            hintText = userGuess < randomNumber ? "Your last guess was too low." : "Your last guess was too high.";
            lastGuess.textContent = `Nope! ${hintText}`;
            lastGuess.classList.add(lastGuessActive);
        }

        guessCount++;
        guessInput.value = "";
        guessInput.focus();
    }
}

guessInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        guessSubmit.click();
    }
});
guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
    guessInput.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Play Again";
    gameContainer.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    guessCount = 1;

    for (item of lastGuessClasses) {
        lastGuess.classList.remove(item);
    }
    setLastGuessText();

    if (guesses.classList.contains(guessesShow)) {
        guesses.classList.remove(guessesShow);
    }
    guesses.textContent = "";

    resetButton.parentNode.removeChild(resetButton);

    guessInput.disabled = false;
    guessSubmit.disabled = false;
    guessInput.value = "";
    guessInput.focus();

    randomNumber = Math.floor(Math.random() * 100) + 1;
}