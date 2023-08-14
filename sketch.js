// Script.js

// Variáveis iniciais
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const snake = [];
const food = {
  x: Math.floor(Math.random() * canvas.width),
  y: Math.floor(Math.random() * canvas.height),
};

// Função para desenhar a cobra
function drawSnake() {
  ctx.beginPath();
  for (let i = 0; i < snake.length; i++) {
    const segment = snake[i];
    ctx.lineTo(segment.x, segment.y);
  }
  ctx.stroke();
}

// Função para atualizar a posição da cobra
function updateSnake() {
  // Verificar se a cobra comer si mesma
  if (snake.some((segment) => segment.x === snake[0].x && segment.y === snake[0].y)) {
    alert('Game Over!');
    return;
  }

  // Atualizar a posição da cobra
  snake.unshift({ x: snake[0].x, y: snake[0].y });
  snake.pop();
}

// Função para desenhar os alimentos
function drawFood() {
  ctx.beginPath();
  ctx.arc(food.x, food.y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
}

// Função para verificar se a cobra encontrou comida
function checkFood() {
  if (snake.some((segment) => segment.x === food.x && segment.y === food.y)) {
    // Cobra encontrou comida
    food = {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
    };
  }
}

// Loop principal do jogo
function gameLoop() {
  updateSnake();
  drawSnake();
  drawFood();
  checkFood();
  requestAnimationFrame(gameLoop);
}

// Iniciar o loop do jogo
requestAnimationFrame(gameLoop);