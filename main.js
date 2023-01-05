var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = window.innerHeight*0.6;
var context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
var restore = new Array();
var resloc = -1;
var strokeColor = 'black';
var strokeWidth = "2";

function strokeCOLOR(a) {
  strokeColor = a.style.background;
}

function strokeWIDTH(a) {
  strokeWidth = a.innerHTML
}

function iniciar(event) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(getX(event), getY(event));
  event.preventDefault();
}

function draw(event) {
  if (isDrawing) {
    context.lineTo(getX(event), getY(event));
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
}

function parar(event) {
  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
  }
  event.preventDefault();
  restore.push(context.getImageData(0, 0, canvas.width, canvas.height));
  resloc += 1;
}

function getX(event) {
  if (event.pageX == undefined) {return event.targetTouches[0].pageX - canvas.offsetLeft}
  else {return event.pageX - canvas.offsetLeft}
  }


function getY(event) {
  if (event.pageY == undefined) {return event.targetTouches[0].pageY - canvas.offsetTop}
  else {return event.pageY - canvas.offsetTop}
}

canvas.addEventListener("touchstart", iniciar, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", parar, false);
canvas.addEventListener("mousedown", iniciar, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", parar, false);
canvas.addEventListener("mouseout", parar, false);

function Desfazer() {
  if (resloc <= 0) {
    Limpar()
  } else {
    resloc += -1;
    restore.pop();
    context.putImageData(restore[resloc], 0, 0);
  }
}

function Limpar() {
  var confirmLimpar = confirm('Tem certeza que quer apagar seu desenho?');
  if (confirmLimpar == true) {
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    restore = new Array();
    resloc = -1;
  } else {}
}