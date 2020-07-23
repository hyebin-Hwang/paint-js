const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById('jsRange');
const fillBtn = document.getElementById('jsMode');
const saveBtn = document.getElementById(`jsSave`);

const CANVAS_SIZE = 500;


strokeStyle = `#2#2#2`;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


let painting = false;
let filling = false;

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
    const changeColor = event.target.style.backgroundColor;
    ctx.strokeStyle = changeColor;
    ctx.fillStyle = changeColor;
}

function handleRangeChange(event){
    const line =event.target.value;
    ctx.lineWidth = line;
}

function handleFillClick(){
    if(filling === true){
        fillBtn.innerText = `Fill`;
        filling = false;
    }else{
        fillBtn.innerText = `Paint`;
        filling = true;
    }
}

function fillColor(){
    if(filling){
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
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseout", stopPainting);
    canvas.addEventListener("click",fillColor);
}

Array.from(colors).forEach((color)=>{
    color.addEventListener('click',handleColorClick)
})

if(range){
    range.addEventListener('click',handleRangeChange)
}

if(fillBtn){
    fillBtn.addEventListener("click",handleFillClick)
}
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick)
}
