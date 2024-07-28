// const initGame = (button, clickedLetter) => {
//     guessedLetters.push(clickedLetter);

//     let wordUpdated = false;

//     // Update the revealedWord array based on the guessed letters
//     disassembledCurrentWord.forEach((syllable, index) => {
//         syllable.forEach((jamo, jamoIndex) => {
//             if (guessedLetters.includes(jamo)) {
//                 revealedWord[index][jamoIndex] = jamo;
//                 wordUpdated = true;
//             }
//         });
//     });

//     if (wordUpdated) {
//         // Reassemble the word and update the display
//         const reassembledWord = disassembledCurrentWord.map((syllable) => Hangul.assemble(syllable));
//         reassembledWord.forEach((syllable, index) => {
//             wordDisplay.querySelectorAll("li")[index].innerText = syllable;
//             if (syllable !== "") {
//                 wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
//             }
//         });

//     // // Check if clickedLetter is included in the currentWord
//     // if(Hangul.search(currentWord, clickedLetter) >= 0) {
//     //     // Update the revealedWord array
//     //     disassembledCurrentWord.forEach((letter, index) => {
//     //         if(letter === clickedLetter) {
//     //             revealedWord[index] = letter;
//     //         } 
//     //     })
//     //     // Reassemble the word and update the display
//     //     const reassembledWord = Hangul.assemble(revealedWord);
//     //     reassembledWord.split("").forEach((letter, index) => {
//     //         wordDisplay.querySelectorAll("li")[index].innerText = letter;
//     //         if (letter !== "") {
//     //             wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
//     //         }
//     //     });
//     } else {
//         leftGuesses--;
//         //if(leftGuesses === 0) return gameOver(false);
//         hangmanImage.src = `images/${9 - leftGuesses}.png`;
//     }
//     button.disabled = true;
//     guessesText.innerText = `Chances left: ${leftGuesses} / ${maxGuesses}`;

//     if (leftGuesses === 0) return gameOver(false);
//     if (reassembledWord.join("") === currentWord) return gameOver(true);
//     //if(revealedWord.length === currentWord.length) return gameOver(true);
// }




// const resetGame = () => {
//     hangmanImage.src = `images/0.png`;
//     leftGuesses = maxGuesses;
//     guessedLetters = [];
//     revealedWord = disassembledCurrentWord.map(syllable => new Array(syllable.length).fill(""));

//     guessesText.innerText = `Chances left: ${leftGuesses} / ${maxGuesses}`;
//     keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    
//     wordDisplay.innerHTML = disassembledCurrentWord.split("").map(() => `<li class="letter"></li>`).join("");
//     gameModal.classList.remove("show");
// }

// const gameOver = (isVictory)=> {
//     setTimeout(() => {
//         const modalText = isVictory ? `You found the word:` : `The correct word was:`;
//         gameModal.querySelector("img").src = `images/${isVictory ? 'end': 'game-over'}.png`;
//         gameModal.querySelector("h4").innerText = `${isVictory ? 'Woof woof!': 'Nooopee....'}`;
//         gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
//         gameModal.classList.add("show");
//     }, 300);
// }

// //playAgainBtn.addEventListener("click", getRandomWord);


// const initGame1 = (button, clickedLetter) => {
//     guessedLetters.push(clickedLetter);

//     let wordUpdated = false;

//     if (wordUpdated) {
        

//     } else {
//         leftGuesses--;
//         hangmanImage.src = `images/${9 - leftGuesses}.png`;
//     }
//     button.disabled = true;
//     guessesText.innerHTML = `Chances left: ${leftGuesses} / ${maxGuesses}`;
// }
