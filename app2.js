const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById('jsRange');
const fillBtn = document.getElementById(`jsMode`);
const saveBtn = document.getElementById(`jsSave`);

canvas.width = 500;
canvas.height = 500;

let painting = false;
let fBtn = false;

ctx.strokeStyle = `#2c2c2c`;
ctx.lineWidth = 2.5;

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
    console.log(color)
}

function handleRangeChange(event){
    const line = event.target.value;
    ctx.lineWidth = line;
}

function handleFillClick(){
    if(fBtn === true){
        fillBtn.innerText = `Fill`;
        fBtn = false;
    }else{
        fillBtn.innerText = `Paint`;
        fBtn = true;
    }
}

function fillColor(){
    if(fBtn){
    ctx.fillRect(0,0,500,500);
    }
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
}

Array.from(colors).forEach(color =>{
    color.addEventListener(`click`,handleColorClick)
})

if(range){
    range.addEventListener("input",handleRangeChange)
}

if(fillBtn){
    fillBtn.addEventListener("click",handleFillClick)
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick)
}
