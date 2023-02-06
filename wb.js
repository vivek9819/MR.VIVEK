let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let brushSize = document.getElementById('brushSize');
let plus = document.getElementById('plus');
let minus = document.getElementById('minus');
let setColor = document.getElementById('setColor');
let cleanCanvas=document.getElementById('clean');
let eraser=document.getElementById('eraser');

let x = undefined;
let y = undefined;
let size = 20;
let isPressed = false;
// canvas.width=window.innerWidth;

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});
canvas.addEventListener('mouseup', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (mousePos) => {
    if (isPressed) 
    {
        const x2 = mousePos.offsetX;
        const y2 = mousePos.offsetY;
        drawLine(x, y, x2, y2);
        drawCircle(x2, y2);
        x = x2;
        y = y2;
    }
});

drawCircle = (x, y) => 
{
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fill();
    context.fillStyle=setColor;
    context.stroke();
}
drawLine = (x1, y1, x2, y2) => 
{
    context.moveTo(x1, y1);
    context.lineTo(x2,y2);
    context.strokeStyle=setColor;
    context.linewidth = size;
    context.stroke();
}
plus.addEventListener('click', () => 
{
    size += 2;

    if(size > 24) {
        size = 24;
    }
    brushSizeUpdate();
});

minus.addEventListener('click', () => 
{
    size -= 2;

    if (size < 2) {
        size = 2;
    }
    brushSizeUpdate();
});

brushSizeUpdate = () => {
    brushSize.innerHTML = size;
}

setColor.addEventListener('change', (color) => 
{
    setColor = color.target.value;
});

cleanCanvas.addEventListener('click',()=>
{
  context.clearRect(0,0,canvas.width,canvas.height);
}
);
eraser.addEventListener('click',()=>
{
    context.globalCompositeOperation='destination-out';
});

