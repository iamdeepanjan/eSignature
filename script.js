const textColor = document.getElementById('textColor');
const bgColor = document.getElementById('bgColor');
const fontSize = document.getElementById('fontSize');
const canvas = document.getElementById('canvas');
const clearbtn = document.getElementById('clearbtn');
const savebtn = document.getElementById('savebtn');
const retrivebtn = document.getElementById('retrivebtn');
let isDrawing = false;

const ctx = canvas.getContext('2d');

textColor.addEventListener('change', (event)=>{
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
});

bgColor.addEventListener('change', (event)=>{
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, 600, 400);
});

fontSize.addEventListener('change', (event)=>{
    ctx.lineWidth = event.target.value;
});

//drawing
canvas.addEventListener('mousedown', (event)=>{
    isDrawing = true;
    x = event.offsetX;
    y = event.offsetY;
});

canvas.addEventListener('mousemove', (event)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        x = event.offsetX;
        y = event.offsetY;
    }
})

canvas.addEventListener('mouseup', ()=>{
    isDrawing = false;
});

canvas.addEventListener('contextmenu', (event)=>{
    event.preventDefault();
});

clearbtn.addEventListener('click', ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

savebtn.addEventListener('click', ()=>{
    localStorage.setItem('canvasItem', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
});

retrivebtn.addEventListener('click', ()=>{
    if(localStorage.getItem('canvasItem')){
        let img = new Image();
        img.src = localStorage.getItem('canvasItem');
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
});

