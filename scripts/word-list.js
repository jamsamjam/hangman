const wordList = [];

fetch('resources/words.csv')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(content => {
        const lines = content.split(/\r\n|\n/); // Split by new lines
        
        lines.forEach(line => {
            const [word, hint] = line.split(',');
            if (word && hint) {
                wordList.push({ word: word.trim(), hint: hint.trim() });
            }
        });

        console.log(wordList);
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });
