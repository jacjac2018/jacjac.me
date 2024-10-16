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
    { "name": "Hau Yi Ting (Arie)", "photo": "Images/15.jpg" },
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
    { "name": "To Chin Yuet (Camila)", "photo": "Images/28.jpg" },
    { "name": "Tsang Po Che (Porsche)", "photo": "Images/29.jpg" },
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
const timePerQuestion = 10000; // 10 seconds per question in milliseconds
let totalTimeUsed = 0;
let wrongAnswers = [];

// At the beginning of the file, after the girls array is defined
// const debugMode = false; // Add this line
// const girlsToUse = debugMode ? girls.slice(0, 5) : girls; // Add this line

function initAvailableGirls() {
    // Use all girls
    availableGirls = [...girls];
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
    document.getElementById('current-score').textContent = currentScore;
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('total-time').textContent = `Total time used: ${(totalTimeUsed / 1000).toFixed(2)} seconds`;
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
    const timerElement = document.getElementById('time-left');
    
    clearInterval(timer);
    updateTimerDisplay(timeLeft);
    
    timer = setInterval(() => {
        timeLeft -= 100; // Decrease by 100 milliseconds instead of 10
        updateTimerDisplay(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            totalTimeUsed += timePerQuestion;
            showCorrectAnswer();
            setTimeout(nextQuestion, 1500);
        }
    }, 100); // Update every 100 milliseconds instead of 10
}

function updateTimerDisplay(timeLeft) {
    const seconds = Math.floor(timeLeft / 1000);
    const milliseconds = timeLeft % 1000;
    document.getElementById('time-left').textContent = `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
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
    setTimeout(nextQuestion, 1500); // Move to the next question after 1.5 seconds
}

function checkAnswer(selectedName, correctName) {
    clearInterval(timer);
    const timeUsed = timePerQuestion - parseInt(document.getElementById('time-left').textContent * 1000);
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
        wrongAnswers.push({
            correct: correctName,
            selected: selectedName,
            photo: availableGirls[currentQuestionIndex].photo
        });
        console.log("Added wrong answer:", wrongAnswers[wrongAnswers.length - 1]); // Debug log
        console.log("Current wrong answers:", wrongAnswers); // Debug log
    }

    updateScore();
    setTimeout(nextQuestion, 1500);
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
    if (percentage === 100) {
        return "Perfect score! You're an absolute expert on your classmates' names!";
    } else if (percentage >= 90) {
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
    
    let celebrationEffect = '';
    if (percentage === 100) {
        celebrationEffect = '<div id="fireworks"></div>';
    }
    
    let reviewButton = '';
    if (wrongAnswers.length > 0) {
        reviewButton = '<button onclick="startReview()" class="review-button" style="background-color: #FFA500; margin-right: 10px;">Review Wrong Answers</button>';
    }
    
    gameContainer.innerHTML = `
        ${celebrationEffect}
        <h1>Quiz Completed!</h1>
        <p>Your final score: ${currentScore} / ${totalQuestions}</p>
        <p>Total time used: ${(totalTimeUsed / 1000).toFixed(2)} seconds</p>
        <p>${comment}</p>
        ${reviewButton}
        <button onclick="restartGame()" class="play-again-button" style="background-color: #4CAF50;">Play Again</button>
    `;
    
    if (percentage === 100) {
        createFireworks();
    }

    console.log("Wrong Answers at end of game:", wrongAnswers); // Debug log
}

function createFireworks() {
    const fireworks = document.getElementById('fireworks');
    fireworks.innerHTML = ''; // Clear existing fireworks
    for (let i = 0; i < 20; i++) { // Reduced from 50 to 20
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        firework.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
        firework.style.setProperty('--y', `${(Math.random() - 0.5) * 200}px`);
        firework.style.animationDuration = `${1 + Math.random()}s`; // Shorter duration
        fireworks.appendChild(firework);
    }
    // Remove fireworks after 3 seconds
    setTimeout(() => {
        fireworks.innerHTML = '';
    }, 3000);
}

function startReview() {
    console.log("Starting review. Wrong Answers:", wrongAnswers); // Debug log
    if (wrongAnswers.length === 0) {
        alert("No wrong answers to review.");
        return;
    }

    currentQuestionIndex = 0;
    loadReviewQuestion();
}

function loadReviewQuestion() {
    console.log("Loading review question", currentQuestionIndex + 1, "of", wrongAnswers.length); // Debug log
    if (currentQuestionIndex >= wrongAnswers.length) {
        endReview();
        return;
    }

    const currentWrong = wrongAnswers[currentQuestionIndex];
    const gameContainer = document.getElementById('game-container');
    
    gameContainer.innerHTML = `
        <h1>Review Wrong Answers</h1>
        <div id="progress">Question <span id="current-question">${currentQuestionIndex + 1}</span> of <span id="total-girls">${wrongAnswers.length}</span></div>
        <img id="girl-photo" src="${currentWrong.photo}" alt="Girl's Photo">
        <div id="name-options"></div>
        <div id="progress-bar-container">
            <div id="progress-bar"></div>
        </div>
    `;

    const options = [currentWrong.correct, currentWrong.selected];
    while (options.length < 4) {
        const randomGirl = girls[Math.floor(Math.random() * girls.length)];
        if (!options.includes(randomGirl.name)) {
            options.push(randomGirl.name);
        }
    }
    options.sort(() => Math.random() - 0.5);

    const nameOptionsDiv = document.getElementById('name-options');
    options.forEach(name => {
        const button = document.createElement('button');
        button.textContent = name;
        button.onclick = () => checkReviewAnswer(name, currentWrong.correct, currentWrong.selected);
        nameOptionsDiv.appendChild(button);
    });

    updateReviewProgress();
}

function checkReviewAnswer(selectedName, correctName, originallySelected) {
    const buttons = document.querySelectorAll('#name-options button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctName) {
            button.style.backgroundColor = '#4CAF50'; // Green for correct answer
        } else if (button.textContent === originallySelected) {
            button.style.backgroundColor = '#f44336'; // Red for originally selected wrong answer
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        loadReviewQuestion();
    }, 1500);
}

function updateReviewProgress() {
    const progressPercentage = ((currentQuestionIndex + 1) / wrongAnswers.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
}

function endReview() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h1>Review Completed</h1>
        <p>You've reviewed all the questions you answered incorrectly.</p>
        <button onclick="restartGame()" style="background-color: #4CAF50;">Play Again</button>
    `;
}

function restartGame() {
    clearGameContainer(); // Clear the game container first
    currentScore = 0;
    currentQuestionIndex = 0;
    totalTimeUsed = 0;
    wrongAnswers = []; // Reset wrong answers

    // Reset the game container to its initial state
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h1>Guess the Girl's Name</h1>
        <div id="score">Score: <span id="current-score">0</span> / <span id="total-questions">0</span></div>
        <div id="progress">Question <span id="current-question">1</span> of <span id="total-girls">0</span></div>
        <div id="total-time">Total time used: 0 seconds</div>
        <img id="girl-photo" src="" alt="Girl's Photo">
        <div id="name-options"></div>
        <button id="next-question" style="display: none;">Next Question</button>
        <div id="progress-bar-container">
            <div id="progress-bar"></div>
        </div>
        <div id="timer">Time: <span id="time-left">10</span>s</div>
    `;
    
    // Re-initialize available girls and start a new game
    initAvailableGirls();
    updateScore();
    loadGame();
}

function clearGameContainer() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    initAvailableGirls();
});
