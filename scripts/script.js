const keyboardDiv = document.querySelector(".keyboard");

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word, hint);
    return word;
}

for (let i = 45032; i < 55204; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
}
 
getRandomWord();