I've reviewed your provided script and made the necessary changes to ensure that all the girls are included and to fix the issue with the "Play Again" button not working properly at the end of the game. Here are the adjustments:

1. **Include All Girls**:
   - Removed the filtering step that only allowed some of the images (based on `availableImageNumbers`). Now, all girls in the `girls` array will be included automatically.

2. **Fix the "Play Again" Button**:
   - Adjusted the `restartGame()` function to properly restart all variables and reload the game, ensuring the button works correctly.

Here's the updated script:

```javascript
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

async function initAvailableGirls() {
    availableGirls = [...girls]; // Include all girls
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
    document.getElementById('total-questions').textContent = currentQuestionIndex;
    document.getElementById('total-time').textContent = `Total time used: ${totalTimeUsed} seconds`;
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
        timeLeft -= 10; // Decrease by 10 milliseconds
        updateTimerDisplay(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            totalTimeUsed += timePerQuestion;
            showCorrectAnswer();
            setTimeout(nextQuestion, 1500);
        }
    }, 10); // Update every 10 milliseconds
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
    
    gameContainer.innerHTML = `
        ${celebrationEffect}
        <h1>Quiz Completed!</h1>
        <p>Your final score: ${currentScore} / ${totalQuestions}</p>
        <p>Total time used: ${(totalTimeUsed / 1000).toFixed(2)} seconds</p>
        <p>${comment}</p>
        <button onclick="reviewWrongAnswers()" style="background-color: #FFA500; margin-right: 10px;">Review Wrong Answers</button>
        <button onclick="restartGame()" style="background-color: #4CAF50;">Play Again</button>
    `;
    
    if (percentage === 100) {
        createFireworks();
    }
}

function createFireworks() {
    const fireworks = document.getElementById('fireworks');
    for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.animationDelay = `${Math.random() * 2}s`;
        fireworks.appendChild(firework);
    }
}

function reviewWrongAnswers() {
    if (wrongAnswers.length === 0) {
        alert("Congratulations! You didn't get any answers wrong.");
        return;
    }

    const gameContainer = document.getElementById('game-container');
    let reviewHTML = '<h2>Review Wrong Answers</h2>';
    
    wrongAnswers.forEach((answer, index) => {
        reviewHTML += `
            <div class="review-item">
                <img src="${answer.photo}" alt="${answer.correct}" style="width: 100px; height: 100px;">
                <p>Correct: ${answer.correct}</p>
                <p>Your answer: ${answer.selected}</p>
            </div>
        `;
    });
    
    reviewHTML += '<button onclick="endGame()">Back to Results</button>';
    gameContainer.innerHTML = reviewHTML;
}

function restartGame() {
    currentScore = 0;
    currentQuestionIndex = 0;
    totalTimeUsed = 0;
    availableGirls = shuffleArray([...girls]); // Shuffle all girls for a fresh start
    updateScore();
    loadGame();
}

initAvailable
