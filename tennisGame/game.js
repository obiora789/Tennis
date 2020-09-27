  let canvasContext;
  let canvas;
  
  let ballX = 50;
  let ballSpeedX = 10;
  let ballY = 50;
  let ballSpeedY = 5;
  
  let paddle1Y = 250;
  let paddle2Y = 100;
  
  const PADDLE_HEIGHT = 100;
  let paddleThickness = 10;
  
  let player1Score = 0;
  let computerScore = 0;
  const WINNING_SCORE = 20;
  let displayWinner = false;
  let playerName = prompt("Please enter your name.");
  
  function onMouseClick(evt) {
    if (displayWinner) {
      player1Score = 0;
      computerScore = 0;
      displayWinner = false;
    }
  }
  
  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    let framesPerSecond = 30;
    setInterval(function() {
    drawEverything();
    moveEverything();
  }, 900/framesPerSecond);
    
    canvas.addEventListener('mousedown', onMouseClick);
    canvas.addEventListener('mousemove', function(evt) {
      let mousePos = calculateMousePosition(evt);
      /*if (ballX < canvas.width/2) {
      paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
      } else {
      paddle2Y = mousePos.y - (PADDLE_HEIGHT / 2);
      }*/
      paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
      
    });
  };
  
  function resetBall() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    
    if (player1Score >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
      displayWinner = true;
    }
  }
  
  function calculateMousePosition(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY
    };
  }
  
  function paddleChasing() {
    let paddle2YCentre = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCentre < ballY - 25) {
      paddle2Y += 7;
    } else if (paddle2YCentre > ballY + 25) {
      paddle2Y -= 7;
    }
  }
  
  function moveEverything() {
    if (displayWinner) {
      return;
    }
    paddleChasing();
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    
    if (ballX < 12) {
      if (ballY > paddle1Y && ballY < (paddle1Y + PADDLE_HEIGHT)) {
        ballSpeedX = -ballSpeedX;
        let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
        ballSpeedY = deltaY * 0.35;
      }
    }
    if (ballX < 0) {
        computerScore += 5; // must be before resetBall()
        resetBall();
    }
    
    if (ballX > canvas.width) {
      player1Score += 5; // must be before resetBall()
      resetBall();
    }
    
    if (ballX > canvas.width - 12) {
      if (ballY > paddle2Y && ballY < (paddle2Y + PADDLE_HEIGHT)) {
        ballSpeedX = -ballSpeedX;
        let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
        ballSpeedY = deltaY * 0.35;
      }
    }
    if (ballY < 0) {
      ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }
  }
  
  function drawNet() {
    for (let i=0; i < canvas.height; i+=30) {
      colorRect((canvas.width/2) - 1,i,2,20,'black');
    }
  }
  function drawEverything() {
    console.log(ballX,ballY,ballSpeedX);
    //canvas
    colorRect(0,0,canvas.width,canvas.height,'pink');
    
    if (displayWinner) {
      canvasContext.fillStyle = 'black';
       if (player1Score >= WINNING_SCORE){        
          canvasContext.fillText(playerName+" Won!", 350,270);
       }else if (computerScore >= WINNING_SCORE){
          canvasContext.fillText("Computer Won!", 350,270); 
       }
       canvasContext.fillText("Click To Continue", 345,500);
      return;
       
    }
     
    //draw Net
    drawNet();
    
    //left player paddle
    colorRect(0,paddle1Y,paddleThickness,PADDLE_HEIGHT, 'black');
    
    //next line draws the ball itself
    colorCircle(ballX, ballY, 10, 'black');
    
    //right player paddle
    colorRect((canvas.width - paddleThickness),paddle2Y,paddleThickness,PADDLE_HEIGHT, 'black');
    
    //ScoreBoard
    canvasContext.fillText(playerName+ "'s Score: " + player1Score, 100,50);
    canvasContext.fillText("Computer Score: " + computerScore, (canvas.width - 200),50);
  }
  
  //function for drawEverything
  function colorCircle(centreX, centreY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centreX, centreY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
  }
  
  function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
  }
  
  
