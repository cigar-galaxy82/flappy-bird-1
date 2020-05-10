var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//TO LOAD IMAGES
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipenorth.png";
pipeSouth.src = "images/pipesouth.png";

//variables
var gap = 350
var constant = pipeNorth.height + gap//to get the height we have to first load the image

var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0

//to add sound
var fly  = new Audio()//this is a constructor and new has too be used with this
var scor = new Audio()

fly.src = "sounds/fly.mp3"
scor.src = "sounds/score.mp3"
//when down keydown is pressed
document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -=25;
    fly.play();
}

//to draw pipes

var pipe = []

pipe[0]={
    x:cvs.width,//the starting of each pipe will be from 288 
    y:0
}

//console.log(pipe[0].x)
//TO DRAW IMAGES

function draw(){
    ctx.drawImage(bg,0,0);
    
    for(var i=0;i<pipe.length;i++){
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y)
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant)

        pipe[i].x--;

        if(pipe[i].x === 125){
            pipe.push({
                x:cvs.width,
                y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            })
        }
        //console.log(pipe[0].x)//this value decreases with time
       //this is for if the bird touches the pipes
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }
        
        if(pipe[i].x ===5 )
        {
            score++;
            scor.play()
        }
          
    }
    

    ctx.drawImage(fg,0,cvs.height-fg.height)

    ctx.drawImage(bird,bX,bY)

    bY +=gravity

    ctx.fillSyle = "#000"
    ctx.font = "20px Verdana"
    ctx.fillText("Score: " + score,10,cvs.height-20)

    
requestAnimationFrame(draw)
}

draw()

