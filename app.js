const board = document.querySelector('#board');
const screens = document.querySelectorAll('.screen');
const startBn = document.querySelector('#start');
const canvas = document.getElementById('life');
const ctx = canvas.getContext('2d');
const width = 100;
const height = 100;
let mas=[];
let count = 0;
let timer;

// Переключение экраннов
startBn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
});

// координаты мышки на игровом поле
canvas.onclick = function(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  x = Math.floor(x / 5); // 500 / 5 = 100  
  y = Math.floor(y / 5); // 500 / 5 = 100  
  mas [y][x] = 1;
  drawField();
};

goLife();

function goLife () {
  mas = [];
  for (let i=0; i < width; i++) {
    mas [i] = [];
    for (let j=0; j < height; j++) {
      mas [i][j] = 0;
    }  
  }
}

// Отрисовываем точки
function drawField () {
  ctx.clearRect (0, 0, width * 5, height * 5);
  for (let i=0; i < width; i++) {
    for (let j=0; j < height; j++) {
        if (mas[i][j]==1) {
          ctx.fillStyle = '#35aeff';
          ctx.fillRect(j * 5, i * 5, 5, 5);
        }
      }
   }
}

// Модерация  жизни
function getAliveNeighbors(x, y, field) {
  let prevX = x - 1;
  if (x === 0) {
    prevX = width - 1;
  }
  let nextX = x + 1;
  if (x === width - 1) {
    nextX = 0;
  }
  let prevY = y - 1;
    if (y === 0) {
      prevY = height - 1;
  }
  let nextY  = y + 1;
    if (y ===  height - 1) {
      nextY = 0
    }
  if (!field[prevX] || !field[nextX]) {
    console.error('ERROR', x, y, field);
    return 0;
  }
  let neighbors = 0;
  if (field[prevX][y]) neighbors++; // проверка слева
  if (field[nextX][y]) neighbors++; // проверка справа
  if (field[x][prevY]) neighbors++; // проверка сверху
  if (field[x][nextY]) neighbors++; // проверка снизу
  if (field[prevX][prevY]) neighbors++; // проверка слева сверху
  if (field[nextX][prevY]) neighbors++; // проверка справа сверху
  if (field[prevX][nextY]) neighbors++; // проверка слева снизу
  if (field[nextX][nextY]) neighbors++; // проверка справа снизу
  return  neighbors;
}

// проверка условий игры
function runner() {
  const mas2 = [];
  // console.log(mas);
  for (let i = 0; i < width; i++) {
    mas2[i] = [];
    for (let j = 0; j < height; j++) {
      // console.log('i, j', i, j);
      const neighbors = getAliveNeighbors(i, j, mas);
      if (neighbors === 3) {
        mas2[i][j] = 1;
      } else if (mas[i][j] === 1 && neighbors === 2) {
        mas2[i][j] = 1;
      } else {
        mas2[i][j] = 0;
      }
    }
  }
  mas = mas2;
  drawField();
  count++;
  document.getElementById('count').innerHTML = count;
}

function startLife() {
  timer = setInterval(runner, 100);
  startGame.disabled = true;
}

document.getElementById('startGame').onclick = startLife;
document.getElementById('endGame').onclick = endLife;

function endLife() {
  clearInterval(timer);
  startGame.disabled = false;
}