const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

const wordList = [];
const maxGuesses = 9;

let currentWord;
let leftGuesses = maxGuesses;
let guessedLetters = [];

const resetGame = () => {
    leftGuesses = maxGuesses;
    guessedLetters = [];
    hangmanImage.src = "images/0.png";
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);

    // Create li of word length and inserts in the wordDisplay
    const numberOfSyllabes = Hangul.d(currentWord, true).length;
    wordDisplay.innerHTML = Array(numberOfSyllabes).fill('<li class="letter"></li>').join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    if (wordList.length === 0) {
        console.error('Loading words..');
        return;
    }
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;

    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    // Create li of word length and inserts in the wordDisplay
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter">*</li>`).join("");
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? "You found the word:" : "The correct word was:";
        gameModal.querySelector("img").src = `images/${isVictory ? 'end': 'game-over'}.png`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Woof woof!': 'Nooopee....'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const updateWordDisplay = () => {
    const splitWord = Hangul.d(currentWord, true);

    const assembledBySyllables = splitWord.map((syllable) => {
        // Check if all characters in the syllable are guessed
        const isSyllableGuessed = syllable.every(char => guessedLetters.includes(char));
        return isSyllableGuessed ? Hangul.a(syllable) : '*';
    }).join("");

    wordDisplay.innerHTML = assembledBySyllables.split("").map(letter => `<li class="letter">${letter}</li>`).join("");
    return assembledBySyllables;
}

// function showWordBasedOnInput(input) {
//     const syllables = Hangul.d(currentWord, true);
//     const revealedSyllables = [];

//     // Check each syllable (in syllables) = array of chars
//     syllables.forEach(syllable => {
//         let isCompleted = true;

//         // Check if each char is included in the input
//         const filteredSyllable = syllable.filter(char => {
//             if (input.includes(char))
//                 return true;
//             else {
//                 isCompleted = false;
//                 return false;
//             }
//         });

//         const completedSyllable = isCompleted ? Hangul.a(filteredSyllable) : '*';
//         // const color = isCompleted ? "#00FF00" : "#FF0000";
//         //`<style="color: ${isCompleted}`;">`
//         revealedSyllables.push(completedSyllable);
//     });

//     return revealedSyllables.join(" ");
// }

const initGame = (button, clickedLetter) => {
    guessedLetters.push(clickedLetter);
    
    const revealedWord = updateWordDisplay();

    // Handle guesses and game over logic
    if(Hangul.search(currentWord, clickedLetter) < 0) {
        leftGuesses--;
    }

    button.disabled = true;
    hangmanImage.src = `images/${9 - leftGuesses}.png`;
    guessesText.innerHTML = `Chances left: <b style="color: #ff0000;">${leftGuesses} / ${maxGuesses}</b>`;

    if(leftGuesses <= 0) return gameOver(false);
    if(revealedWord === currentWord) return gameOver(true);
}

const keyboard = [
    {
        kind: 'consonant',
        values: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ']
    },

    {
        kind: 'vowel',
        values: ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅔ', 'ㅒ', 'ㅖ']
    },

    {
        kind: 'double',
        values: ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ']
    }
]

// Create consonants & vowels buttons
keyboard.forEach(group => {
    group.values.forEach(char => {
        const button = document.createElement("button");
        button.innerText = char;
        keyboardDiv.appendChild(button);
        button.addEventListener("click", e => initGame(e.target, char));
    });
});

fetch('resources/words.csv')
    .then(response => response.text())
    .then(content => {
        const lines = content.split(/\r\n|\n/); // Split by new lines
        
        lines.forEach(line => {
            const [word, hint] = line.split(',');
            if (word && hint) {
                wordList.push({ word: word.trim(), hint: hint.trim() });
            }
        });

        getRandomWord();
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });