const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");

const wordList = [];
let currentWord = [];
let revealedWord = [];

const getRandomWord = () => {
    if (wordList.length === 0) {
        console.error('Loading words..');
        return;
    }
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = Hangul.disassemble(word);
    revealedWord = currentWord.map(() => "");
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    // Create li of word length and inserts in the wordDisplay
    wordDisplay.innerHTML = Hangul.assemble(currentWord).split("").map(() => `<li class="letter"></li>`).join("");
}

const initGame = (button, clickedLetter) => {
    // Check if clickedLetter is included in the currentWord
    if(Hangul.search(currentWord, clickedLetter) >= 0) {
        // Update the revealedWord array
        currentWord.forEach((letter, index) => {
            if(letter === clickedLetter) {
                revealedWord[index] = letter;
            }
        })
        // Reassemble the word and update the display
        const reassembledWord = Hangul.assemble(revealedWord);
        reassembledWord.split("").forEach((letter, index) => {
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            if (letter !== "") {
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        console.log("no");
    }
}

const keyboard = [
    {
        kind: 'consonant',
        values: ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
    },
    {
        kind: 'vowel',
        values: ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅔ', 'ㅒ', 'ㅖ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ']
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