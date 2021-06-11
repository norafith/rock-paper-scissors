let winCounter = 0;
let loseCounter = 0;
let roundCounter = 9;
let lang = 'ENG';

function capitalize(word) {
    return word.toUpperCase().slice(0, 1) + word.toLowerCase().slice(1);
}

function computerPlay() {
    let randomNumber = Math.floor(Math.random() * 3);
    let answer;
    if (randomNumber == 0) {
        answer = 'scissors';
    } else if (randomNumber == 1) {
        answer = 'rock';
    } else if (randomNumber == 2) {
        answer = 'paper';
    } else {
        alert('Что-то пошло не так');
    }
    return answer;
}

function convertLang(word) {
    word = word.toLowerCase();
    if (word == 'rock') return 'камень';
    if (word == 'scissors') return 'ножницы';
    if (word == 'paper') return 'бумага';
    if (word == 'камень') return 'rock';
    if (word == 'бумага') return 'paper';
    if (word == 'ножницы') return 'scissors';
    if (word == 'играть заново') return 'play again';
}

function playOneRound(playerDecision) {
    const playerScore = document.querySelector('#player-score');
    const computerScore = document.querySelector('#computer-score');
    const message = document.querySelector('#message');
    let compDecision = computerPlay()
    if (
        (compDecision == 'scissors' && playerDecision == 'paper') || 
        (compDecision == 'paper' && playerDecision == 'rock') ||
        (compDecision == 'rock' && playerDecision == 'scissors')
    ) {
        loseCounter += 1;
        computerScore.textContent = loseCounter;
        if (lang == 'RUS') message.textContent = `Вы проиграли раунд! ${capitalize(convertLang(compDecision))} побеждает ${capitalize(convertLang(playerDecision))}!`;
        else message.textContent = `You lost a round! ${capitalize(compDecision)} beats ${capitalize(playerDecision)}!`    
    } else if (compDecision == playerDecision) {
        if (lang == 'RUS') message.textContent = 'В раунде ничья!'; 
        else message.textContent = 'The round is a draw!';
    } else {
        winCounter += 1;
        playerScore.textContent = winCounter;
        if (lang == 'RUS') message.textContent = `Вы выйграли раунд! ${capitalize(convertLang(playerDecision))} побеждает ${capitalize(convertLang(compDecision))}!`
        else message.textContent = `You won a round! ${capitalize(playerDecision)} beats ${capitalize(compDecision)}!`
    }
    roundCounter--; 
}

function transition(e) {
    e.target.classList.add('pressed');
}

function transitionend(e) {
    e.target.classList.remove('pressed');
}

function checkRounds() {
    if (roundCounter == 0) {
        gameEnd();
        return;
    } else return true;
}

function getValue(e) {
    if (e.target.getAttribute('id') == 'language-change') return;
    value = e.target.getAttribute('id');
    if (checkRounds()) playOneRound(value);
}

function languageChange(e) {
    const languageButton = e.target;
    const mainDescr = document.querySelector('#descr');
    const compDescr = document.querySelector('#computer-score-descr');
    const playerDescr = document.querySelector('#player-score-descr');
    const playButtons = document.querySelectorAll('.play-buttons')
    lang = languageButton.textContent;
    if (lang == 'ENG'){
        languageButton.textContent = 'RUS';
        lang = 'RUS';
        document.title = 'Камень, Ножницы, Бумага';
        mainDescr.textContent = 'Камень, Ножницы или Бумага?';
        compDescr.textContent = 'Компьютер:';
        playerDescr.textContent = 'Вы:';
    } else {
        languageButton.textContent = 'ENG';
        lang = 'ENG';
        document.title = 'Rock, Paper, Scissors';
        mainDescr.textContent = 'Rock, Paper or Scissors?';
        compDescr.textContent = 'Computer:';
        playerDescr.textContent = 'You:';
    }
    playButtons.forEach(button => {
        button.textContent = capitalize(convertLang(button.textContent));
    })
}

function initButtons() {
    const buttons = document.querySelectorAll('button');
    const playButtons = document.querySelectorAll('.play-buttons');
    buttons.forEach(button => {
        button.addEventListener('click', transition);
        button.addEventListener('transitionend', transitionend);
    });
    playButtons.forEach(button => {
        button.addEventListener('click', getValue);
    })
    const languageButton = document.querySelector('#language-change');
    languageButton.addEventListener('click', languageChange);
}

function gameEnd() {
    const message = document.querySelector('#message');
    const playButtons = document.querySelectorAll('.play-buttons');
    if (loseCounter > winCounter) {
        if (lang == 'RUS') message.textContent = 'Вы проиграли!';
        else message.textContent = 'You lost!'
    } else if (winCounter > loseCounter) {
        if (lang == 'RUS') message.textContent = 'Вы выйграли!';
        else message.textContent = 'You won!'
    } else {
        if (lang == 'RUS') message.textContent = 'В игре ничья!';
        else message.textContent = 'The game is a draw!';
    }
    playButtons.forEach(button => {
        button.setAttribute('disabled', '');
    })
}

initButtons();