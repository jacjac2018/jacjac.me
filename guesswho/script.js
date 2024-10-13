let girls = [
    { "name": "Adelaide Chan", "photo": "Images/1.jpg" },
    { "name": "Alexis Chan", "photo": "Images/2.jpg" },
    { "name": "Chan Chin (Kiwi)", "photo": "Images/3.jpg" },
    { "name": "Chan Doria", "photo": "Images/4.jpg" },
    { "name": "Chloe Chan", "photo": "Images/5.jpg" },
    { "name": "Atarah Cheng", "photo": "Images/6.jpg" },
    { "name": "Zoey Cheng", "photo": "Images/7.jpg" },
    { "name": "Cheng Tsz Kiu (Alyssa)", "photo": "Images/8.jpg" },
    { "name": "Cheng Yuen Wing (Karlie)", "photo": "Images/9.jpg" },
    { "name": "Mian Cheung", "photo": "Images/10.jpg" },
    { "name": "Sophie Chiu", "photo": "Images/11.jpg" },
    { "name": "Fong Hay Lam (Kayla)", "photo": "Images/12.jpg" },
    { "name": "Glory Fong", "photo": "Images/13.jpg" },
    { "name": "Chloe Fung", "photo": "Images/14.jpg" },
    { "name": "Hau Yi Ting", "photo": "Images/15.jpg" },
    { "name": "Kot Wing Lam (Sheena)", "photo": "Images/16.jpg" },
    { "name": "Hailey Lam", "photo": "Images/17.jpg" },
    { "name": "Meagan Lam", "photo": "Images/18.jpg" },
    { "name": "Lam Yu Tsit (Gianna)", "photo": "Images/19.jpg" },
    { "name": "Lau Cheuk Yau (Tiana)", "photo": "Images/20.jpg" },
    { "name": "Lau Sin Yee (Brielle)", "photo": "Images/21.jpg" },
    { "name": "Jacqueline Leung", "photo": "Images/22.jpg" },
    { "name": "Juno Li", "photo": "Images/23.jpg" },
    { "name": "Lo Chin Yu (Charlie)", "photo": "Images/24.jpg" },
    { "name": "Karley Lo", "photo": "Images/25.jpg" },
    { "name": "Sin Yan Yin (Hanna)", "photo": "Images/26.jpg" },
    { "name": "Valerie Tang", "photo": "Images/27.jpg" },
    { "name": "To Chin Yuet", "photo": "Images/28.jpg" },
    { "name": "Tsang Po Che", "photo": "Images/29.jpg" },
    { "name": "Tsui Sum Wing (Acadia)", "photo": "Images/30.jpg" },
    { "name": "Adelyn Wong", "photo": "Images/31.jpg" },
    { "name": "Hannah Wong", "photo": "Images/32.jpg" },
    { "name": "Jeannie Wong", "photo": "Images/33.jpg" },
    { "name": "Wong Wing Lam", "photo": "Images/34.jpg" },
    { "name": "Jessalyn Yim", "photo": "Images/35.jpg" },
    { "name": "Yip Pui Lam", "photo": "Images/36.jpg" }
];

let availableGirls = [];
let currentScore = 0;
let currentQuestionIndex = 0;
let totalQuestions = 0;
let timer;
const timePerQuestion = 10; // 10 seconds per question
let totalTimeUsed = 0;

async function initAvailableGirls() {
    const availableImageNumbers = [
        1, 3, 4, 5, 6, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23,
        24, 25, 26, 27, 28, 29, 31, 32, 33, 34
    ];

    availableGirls = girls.filter(girl => {
        const photoNumber = parseInt(girl.photo.match(/(\d+)\.jpg$/)[1]);
        return availableImageNumbers.includes(photoNumber);
    });

    availableGirls = shuffleArray(availableGirls);

    totalQuestions = availableGirls.length;
    updateTotalGirls();
    if (totalQuestions > 0) {
        loadGame();
    } else {
        document.getElementById('game-container').innerHTML = '<p>No images available. Please add some images and try again.</p>';
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateTotalGirls() {
    document.getElementById('total-girls').textContent = totalQuestions;
}

function updateScore() {
    const currentScoreElement = document.getElementById('current-score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const totalTimeElement = document.getElementById('total-time');

    if (currentScoreElement) {
        currentScoreElement.textContent = currentScore;
    }
    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = currentQuestionIndex;
    }
    if (totalTimeElement) {
        totalTimeElement.textContent = `Total time used: ${totalTimeUsed} seconds`;
    }
}

function updateProgress() {
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
}

function loadGame() {
    updateProgress();
    const currentGirl = availableGirls[currentQuestionIndex];

    const imgElement = document.getElementById('girl-photo');
    imgElement.src = currentGirl.photo;

    const options = [currentGirl.name];

    while (options.length < 4) {
        const randomGirl = availableGirls[Math.floor(Math.random() * availableGirls.length)];
        if (!options.includes(randomGirl.name)) {
            options.push(randomGirl.name);
        }
    }

    options.sort(() => Math.random() - 0.5);

    const nameOptionsDiv = document.getElementById('name-options');
    nameOptionsDiv.innerHTML = '';

    options.forEach(name => {
        const button = document.createElement('button');
        button.textContent = name;
        button.onclick = () => checkAnswer(name, currentGirl.name);
        nameOptionsDiv.appendChild(button);
    });

    startTimer();
}

function startTimer() {
    let timeLeft = timePerQuestion;
    document.getElementById('time-left').textContent = timeLeft;
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            totalTimeUsed += timePerQuestion;
            showCorrectAnswer();
            setTimeout(nextQuestion, 1500); // Move to the next question after 1.5 seconds
        }
    }, 1000);
}

function showCorrectAnswer() {
    const currentGirl = availableGirls[currentQuestionIndex];
    const buttons = document.querySelectorAll('#name-options button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentGirl.name) {
            button.style.backgroundColor = '#4CAF50';
        }
    });
    setTimeout(nextQuestion, 1000); // Move to the next question after 1 second
}

function checkAnswer(selectedName, correctName) {
    clearInterval(timer);
    const timeUsed = timePerQuestion - parseInt(document.getElementById('time-left').textContent);
    totalTimeUsed += timeUsed;

    const buttons = document.querySelectorAll('#name-options button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctName) {
            button.style.backgroundColor = '#4CAF50';
        }
    });

    if (selectedName === correctName) {
        currentScore++;
    } else {
        const selectedButton = Array.from(buttons).find(button => button.textContent === selectedName);
        selectedButton.style.backgroundColor = '#f44336';
    }

    updateScore();
    setTimeout(nextQuestion, 1000); // Move to the next question after 1 second
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        loadGame();
    } else {
        endGame();
    }
}

function getPerformanceComment(percentage) {
    if (percentage >= 90) {
        return "Excellent! You remember most of the girls' names. You're a true class expert!";
    } else if (percentage >= 80) {
        return "Great job! You have a very good memory of the girls in your class.";
    } else if (percentage >= 70) {
        return "Good work! You remember quite a few of the girls' names.";
    } else if (percentage >= 60) {
        return "Not bad! You're familiar with many of the girls in your class.";
    } else if (percentage >= 50) {
        return "You're getting there! Keep practicing to improve your memory of the class.";
    } else {
        return "There's room for improvement. Don't worry, with more practice you'll get better at remembering names!";
    }
}

function endGame() {
    const percentage = (currentScore / totalQuestions) * 100;
    const comment = getPerformanceComment(percentage);
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your final score: ${currentScore} / ${totalQuestions}</p>
        <p>Total time used: ${totalTimeUsed} seconds</p>
        <p>${comment}</p>
        <button onclick="restartGame()">Play Again</button>
    `;
}

function restartGame() {
    currentScore = 0;
    currentQuestionIndex = 0;
    totalTimeUsed = 0;
    availableGirls = shuffleArray(availableGirls);
    updateScore();
    loadGame();
}

initAvailableGirls();
