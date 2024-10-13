// Drawing Board
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const shapeSelector = document.getElementById('shape-selector');
const textInput = document.getElementById('text-input');
const fontSize = document.getElementById('font-size');
const fontFamily = document.getElementById('font-family');
const clearCanvas = document.getElementById('clear-canvas');
const strokeWidth = document.getElementById('stroke-width');
const colorPalette = document.getElementById('color-palette');
const colorAdjust = document.getElementById('color-adjust');

let currentColor = '#000000';

// Set canvas size
function resizeCanvas() {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth * 0.95;
    canvas.height = canvas.width * 0.6;
    redrawCanvas();
}

function redrawCanvas() {
    // Redraw any existing content on the canvas after resizing
    // This is just a placeholder - you'll need to implement this based on your needs
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Generate color palette
const colors = [
    '#000000', '#808080', '#C0C0C0', '#FFFFFF', '#800000', '#FF0000', '#808000', '#FFFF00',
    '#008000', '#00FF00', '#008080', '#00FFFF', '#000080', '#0000FF', '#800080', '#FF00FF',
    '#804000', '#FF8000', '#408000', '#80FF00', '#004080', '#0080FF', '#400080', '#8000FF',
    '#804040', '#FF8080', '#408040', '#80FF80', '#004080', '#0080FF', '#400080', '#8000FF',
    '#804000', '#FF8000', '#408000', '#80FF00', '#004080', '#0080FF', '#400080', '#8000FF',
    '#400000', '#800000', '#400040', '#800080', '#004000', '#008000', '#004040', '#008080'
];

colors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = color;
    swatch.addEventListener('click', () => {
        currentColor = color;
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
    });
    colorPalette.appendChild(swatch);
});

colorAdjust.addEventListener('input', () => {
    const rgb = hexToRgb(currentColor);
    const factor = colorAdjust.value / 50;
    const adjustedRgb = rgb.map(value => Math.min(255, Math.max(0, Math.round(value * factor))));
    currentColor = rgbToHex(adjustedRgb);
    document.querySelector('.color-swatch.selected').style.backgroundColor = currentColor;
});

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function rgbToHex(rgb) {
    return '#' + rgb.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

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

    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentColor;
    ctx.lineWidth = strokeWidth.value;
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
        ctx.fillStyle = currentColor;
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