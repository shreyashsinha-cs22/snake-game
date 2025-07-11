let inputDir = {x: 0, y: 0};  // taki staring me snake move n kre
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 15;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

function main(ctime) {
    musicSound.play()
    window.requestAnimationFrame(main);// isme flicker dekhne nhi milta h, it help javascript engine to understand what we want to achieve. ye humlogo ko highest fps dega
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){ // har 0.5 sec ke baad mere screen ko paint krega agar usse kam h tho nhi chahiye
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
            return true
        
    }
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0) // snake collision on the wall
        return true
    return false
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){ // khana kha liya snake ka size badhao or khane ko random jagah generate karo
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("High score", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
    
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for (let i = snakeArr.length - 2; i>=0; i--) { // piche wale hisse ko 1 1 krke age krege mtlb uske age jo element h waha pe or or uske age ke element ko uske age
        snakeArr[i+1] = {...snakeArr[i]}; // head ke hum naya object banaye h kyuki usko kaha add krege
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    board.innerHTML = ""; // phele board jo khali krde kya pta usme phele kuch ho
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; // vertical
        snakeElement.style.gridColumnStart = e.x; // horizontal
        // snake khata jayega uske 
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}








 

musicSound.play()
let hiscore=localStorage.getItem("hiscore")
if(hiscore===null){
    hiscoreval=0
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore) 
    hiscoreBox.innerHTML="High Score: "+ hiscore
}
window.requestAnimationFrame(main) //argument function leta h as a timestamp
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game by pressing any key
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0; // kyuki upper ke taraf ja rha h or or x horizontally postive hota left to right
            inputDir.y = -1; // niche positive rehta h upper ayege tho negative ho jayega
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});