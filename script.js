const gameBoard=document.getElementById('gameBoard');
const ctx=gameBoard.getContext('2d');
const scoreText=document.getElementById('scoreText');
const resetBtn=document.getElementById('resetBtn');
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const boardBackground='black';
const snakeColor='#32a850';
const snakeBorder='black';
const foodColor='red';
const unitSize=25
let highScore=document.querySelector('#highScore')
let running=false;
let xVelocity=unitSize;
let yVelocity=0;
let foodX;
let foodY;
let score=0;
let highScoreCount=0;
let snake=[
    {x:unitSize*4,y:0},
    {x:unitSize*3,y:0},
    {x:unitSize*2,y:0},
    {x:unitSize,y:0},
    {x:0,y:0}
]

window.addEventListener("keydown",changeDirection);
resetBtn.addEventListener('click',resetGame);
gameStart();

function gameStart(){
    running=true;
    scoreText.textContent=score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            isGameOver();
            nextTick();
        },300)
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function createFood(){
    function randomFood(min,max){
        const randomNum=Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        return randomNum;
    }
    foodX=randomFood(0,gameWidth-unitSize);
   foodY=randomFood(0,gameWidth-unitSize);
};
function drawFood(){
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize)
};
function moveSnake(){
    const head={x:snake[0].x+xVelocity,
                y:snake[0].y+yVelocity
    };
    snake.unshift(head);
    
    if(snake[0].x==foodX&&snake[0].y==foodY){
        score++;
        if(score>highScoreCount){
            highScoreCount++;
            highScore.textContent=highScoreCount;
            
        }
        scoreText.textContent=score;
        createFood();
    }else{
        snake.pop();

    }
};
function drawSnake(){
    ctx.fillStyle=snakeColor;
    ctx.strokestyle=snakeBorder;
    snake.forEach((snakePart)=>{
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);


    })
};
function changeDirection(event){
    const keyPressed=event.keyCode;
    const LEFT=37;
    const RIGHT=39;
    const UP=38;
    const DOWN=40;

    const goUp=(yVelocity==-unitSize);
    const goDown=(yVelocity==unitSize);
    const goRight=(xVelocity==unitSize);
    const goLeft=(xVelocity==-unitSize);

    switch(true){
        case(keyPressed==LEFT&&!goRight):
        xVelocity=-unitSize;
        yVelocity=0;
        break;
        case(keyPressed==UP&&!goDown):
        xVelocity=0;
        yVelocity=-unitSize;
        break;
        case(keyPressed==RIGHT&&!goLeft):
        xVelocity=unitSize;
        yVelocity=0;
        break;
        case(keyPressed==DOWN&&!goUp):
        xVelocity=0;
        yVelocity=unitSize;
        break;
        
    }


};
function isGameOver(){
    switch(true){
        case(snake[0].x<0):
        running=false;
        break;
        case(snake[0].x>=gameWidth):
        running=false;
        break;
        case(snake[0].y<0):
        running=false;
        break;
        case(snake[0].y>=gameHeight):
        running=false;
        break;
    }
    for(let i=1;i<snake.length;i++){
        if(snake[i].x==snake[0].x&&snake[i].y==snake[0].y){
            running=false;
        }
    }
};
function displayGameOver(){
    ctx.font='50px MV Boli';
    ctx.fillStyle='blue';
    ctx.textAlign='center';
    ctx.fillText('Game Over!',gameWidth/2,gameHeight/2);
    running=false;
}
function resetGame(){
    score=0;
    xVelocity=unitSize;
    yVelocity=0;
     snake=[
        {x:unitSize*4,y:0},
        {x:unitSize*3,y:0},
        {x:unitSize*2,y:0},
        {x:unitSize,y:0},
        {x:0,y:0}
    ]
    gameStart();
};
