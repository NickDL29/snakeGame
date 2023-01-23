let score = 0;
let foodCounter = 0;



document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    pauseGame();
  }
});


// canvas setup
const canvas = document.getElementById("snake-game");
const ctx = canvas.getContext("2d");

// game variables
let snake = [{x: 150, y: 150}];
let food = {x: 300, y: 300};
let dx = 10;
let dy = 0;

let gameLoop;

if(gameLoop) clearInterval(gameLoop);
gameLoop = setInterval(moveSnake, 100);



// move snake
function moveSnake() {

  // let gameLoop;

// if(gameLoop) clearInterval(gameLoop);
// gameLoop = setInterval(moveSnake, 100 - (speed * 100));

  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  if (snake[0].x === food.x && snake[0].y === food.y) {
    foodCounter++;
    // other food collision logic
  }
  
  
  // check for collision with food
  if (snake[0].x >= food.x-10 && snake[0].x <= food.x+10 && snake[0].y >= food.y-10 && snake[0].y <= food.y+10) {

    food = {x: Math.floor(Math.random() * canvas.width), 
            y: Math.floor(Math.random() * canvas.height)};
    score++;
    speed += 0.05;    
  } else {
    snake.pop();
  }

  
  
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "black" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
  
  // draw food
  // ctx.fillStyle = "red";
  // ctx.fillRect(food.x, food.y, 10, 10);

  // draw circle food
  ctx.beginPath();
  ctx.arc(food.x + 5, food.y + 5, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();


  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  
  // check for game over
  if(head.x < 0 || head.y < 0 || head.x >= 500 || head.y >= 500 ) {
    alert("Game over! Score: " + score);
    clearInterval(gameLoop);
    restartGame();
    console.log("Any message")
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      alert("Game over! Score: " + score);
      clearInterval(gameLoop);
      restartGame();
    }
  }

  
  // change direction based on arrow keys
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37:
        dx = -10;
        dy = 0;
        break;
      case 38:
        dx = 0;
        dy = -10;
        break;
      case 39:
        dx = 10;
        dy = 0;
        break;
      case 40:
        dx = 0;
        dy = 10;
        break;
    }
  };
}


//function to pause game upon called
function pauseGame() {
  if (gameLoop) {
      clearInterval(gameLoop);
      gameLoop = null;
      document.getElementById("pause").innerHTML = "Play";
  } else {
      gameLoop = setInterval(moveSnake, 100);
      document.getElementById("pause").innerHTML = "Pause";
  }
}

//funtion to restart game upon called
function restartGame() {
  snake = [{x: 250, y: 250}];
  dx = 10;
  dy = 0;
  food = {x: Math.floor(Math.random() * (canvas.width - 10)), 
        y: Math.floor(Math.random() * (canvas.height - 10))};

  score = 0;
  gameLoop = setInterval(moveSnake, 100);
  document.getElementById("pause").innerHTML = "Pause";
}

