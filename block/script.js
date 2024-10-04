const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');
let x = 0;
let y = 0;
const step = 10;

function movePlayer() {
    player.style.left = x + 'px';
    player.style.top = y + 'px';
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            if (x > 0) x -= step;
            break;
        case 'ArrowRight':
            if (x < gameArea.offsetWidth - player.offsetWidth) x += step;
            break;
        case 'ArrowUp':
            if (y > 0) y -= step;
            break;
        case 'ArrowDown':
            if (y < gameArea.offsetHeight - player.offsetHeight) y += step;
            break;
    }
    movePlayer();
});

// Initial position
movePlayer();