const board = document.querySelector('#board');
const screens = document.querySelectorAll('.screen');
const startBn = document.querySelector('#start');
const canvas = document.getElementById('life');
const ctx = canvas.getContext('2d');
let mas=[];
let count = 0;
let timer;

let time = 0

// Переключение экраннов
startBn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
});

// координаты мышки на игровом поле
canvas.onclick = function(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  console.log(x);
  console.log(y);
  x = Math.floor(x/5); // 500 / 5 = 100  
  y = Math.floor(y/5); // 500 / 5 = 100  
  mas [y][x] = 1;
  console.log(mas);
  drawField();
}

function goLife () {
  const n=100, m=100;
  for (let i=0; i<m; i++) {
    mas [i] = [];
    for (let j=0; j<n; j++) {
      mas [i][j] = 0;
    }  
  }
}
goLife();

// Отрисовываем точки
function drawField () {
  ctx.clearRect (0, 0, 500, 500);
  for (let i=0; i<100; i++) {
    for (let j=0; j<100; j++) {
        if (mas[i][j]==1) {
          ctx.fillStyle = '#35aeff';
          ctx.fillRect(j*5, i*5, 5, 5);
        }
      }
   }
}

// Модерация  жизни
function startLife () {
  let mas2 = [];
  for (let i=0; i<100; i++) {
    mas2[i]=[];
    for (let j=0; j<100; j++) {
      let  neighbors = 0;
      let result = false;
      if (mas[fpm(i)-1][j]==1) neighbors++; // проверка соседей сверху
      if (mas[i][fpp(j)+1]==1) neighbors++; // проверка соседей справа
      if (mas[fpp(i)+1][j]==1) neighbors++; // проверка соседей снизу
      if (mas[i][fpm(j)-1]==1) neighbors++; // проверка соседей слева
      if (mas[fpm(i)-1][fpp(j)+1]==1) neighbors++; // проверка соседей справа сверху
      if (mas[fpp(i)+1][fpp(j)+1]==1) neighbors++; // проверка соседей справа снизу
      if (mas[fpp(i)+1][fpm(j)-1]==1) neighbors++; // проверка соседей справа снизу
      if (mas[fpm(i)-1][fpm(j)-1]==1) neighbors++; // проверка соседей справа снизу
      (neighbors==2 || neighbors==3) ? mas2[i][j]=1 : mas2[i][j]=0;
    }
  }
  mas = mas2;
  drawField();
  count++;
  document.getElementById('count').innerHTML = count;
  timer = setTimeout(startLife, 300);
  startGame.disabled = true;
}

// Выход за пределы поля
function fpm (i) {
  if(i==0) return 100;
  else return i;
}

// Выход за пределы поля
function fpp (i) {
  if(i==99) return -1;
  else return i;
}

document.getElementById('startGame').onclick = startLife;
document.getElementById('endGame').onclick = endtLife;

function endtLife () {
  mas = 0;
  startGame.disabled = false;
}