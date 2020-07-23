const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // HTML 의요소이다.
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const CANVAS_SIZE = 500;
const INITIAL_COLOR = `#2c2c2c`;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE; 
//default 값 = 기본값
ctx.fillStyle =`white`;
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; //선을 그리는 것
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
//default값ㄴ

let painting = false;
let fill = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false; 
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y); 
        ctx.stroke(); 
    } 
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function fillColor(){
    if(fill){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleRangeChange(event){
    const line = event.target.value;
    ctx.lineWidth = line;
}



function handleModeClick(){
    if(fill === true){
        mode.innerText = `Fill`;
        fill = false;
    }else{
        mode.innerText = `Paint`;
        fill = true;
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download ="PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove)
    canvas.addEventListener("mousedown",startPainting)
    canvas.addEventListener("mouseup",stopPainting)
    canvas.addEventListener("mouseleave",stopPainting)
    canvas.addEventListener("click",fillColor)
    canvas.addEventListener("contextmenu",handleCM)//우클릭막기
}

Array.from(colors).forEach(color=> 
    color.addEventListener("click",handleColorClick)  
)

if(range){
    range.addEventListener("input",handleRangeChange)
}

if(mode){
    mode.addEventListener("click",handleModeClick)
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick) 
}

