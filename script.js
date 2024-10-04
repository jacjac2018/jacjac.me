// Drawing Board
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const shapeSelector = document.getElementById('shape-selector');
const textInput = document.getElementById('text-input');
const fontSize = document.getElementById('font-size');
const fontFamily = document.getElementById('font-family');
const clearCanvas = document.getElementById('clear-canvas');

// Set canvas size
canvas.width = 500;
canvas.height = 300;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

clearCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;

    ctx.strokeStyle = colorPicker.value;
    ctx.fillStyle = colorPicker.value;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    const shape = shapeSelector.value;

    switch (shape) {
        case 'freehand':
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
            break;
        case 'line':
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            break;
        case 'rectangle':
            ctx.strokeRect(lastX, lastY, e.offsetX - lastX, e.offsetY - lastY);
            break;
        case 'circle':
            const radius = Math.sqrt(Math.pow(e.offsetX - lastX, 2) + Math.pow(e.offsetY - lastY, 2));
            ctx.beginPath();
            ctx.arc(lastX, lastY, radius, 0, 2 * Math.PI);
            ctx.stroke();
            break;
    }
}

function stopDrawing() {
    isDrawing = false;
}

textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        ctx.font = `${fontSize.value}px ${fontFamily.value}`;
        ctx.fillStyle = colorPicker.value;
        ctx.fillText(textInput.value, lastX, lastY);
        textInput.value = '';
    }
});

// Chatbot
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendMessage = document.getElementById('send-message');

sendMessage.addEventListener('click', handleUserMessage);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

function handleUserMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessageToChat('User', message);
        userInput.value = '';
        setTimeout(() => {
            const response = getJacJacResponse(message);
            addMessageToChat('Jac Jac', response);
        }, 1000);
    }
}

function addMessageToChat(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getJacJacResponse(message) {
    // This is a simple response system. You can expand this to make it more intelligent.
    const responses = [
        "That's interesting! I love learning new things.",
        "Wow, I never thought about it that way!",
        "Did you know that I love programming? It's so much fun!",
        "I'm only 6, but I think that's a great idea!",
        "Hong Kong is such an amazing place to live and learn!",
        "I'd love to hear more about that. Can you tell me more?",
        "That reminds me of a cool coding project I did recently!",
        "I'm always excited to try new things. What do you like to do?",
        "Learning is my favorite thing to do. What have you learned recently?",
        "That's so cool! I can't wait to tell my friends about it!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}