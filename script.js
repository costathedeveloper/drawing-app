const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEL = document.getElementById('color');
const clearBtn = document.getElementById('clear');
const toggleModeBtn = document.getElementById('toggleMode');
const ctx = canvas.getContext('2d');

let size = 10;
let isDrawing = false;
let color = colorEL.value;

toggleModeBtn.addEventListener('click', toggleMode);
canvas.addEventListener('mousedown', startDrawing);
document.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

increaseBtn.addEventListener('click', () => updateSize(5));
decreaseBtn.addEventListener('click', () => updateSize(-5));
colorEL.addEventListener('input', updateColor);
clearBtn.addEventListener('click', clearCanvas);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;

    const x = e.offsetX;
    const y = e.offsetY;

    ctx.lineWidth = size * 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function updateSize(amount) {
    size += amount;
    if (size < 2) size = 2;
    if (size > 50) size = 50;
    updateSizeOnScreen();
}

function updateColor() {
    color = colorEL.value;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateSizeOnScreen() {
    sizeEL.innerText = size;
}

function toggleMode() {
    canvas.classList.toggle('dark-mode');
}
