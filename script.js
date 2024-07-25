document.addEventListener('DOMContentLoaded', () => {
    const consonantsContainer = document.getElementById('consonants');
    const consonants = [
        'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ',
        'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
        'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ',
        'ㅋ', 'ㅌ', 'ㅍ', 'ㅊ'
    ];

    consonants.forEach(consonant => {
        const button = document.createElement('button');
        button.textContent = consonant;
        button.classList.add('all-button');
        consonantsContainer.appendChild(button);
    });
});
