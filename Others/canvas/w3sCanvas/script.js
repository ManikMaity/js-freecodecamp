// finding the canvas ele.
const canvas = document.getElementById("myCanvas");
const shapeCanvas = document.getElementById("drawShapes");
const canvas3 = document.getElementById("canvas3")

// creatng a drawing obj using .getContext();
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const ctx2 = shapeCanvas.getContext("2d");
const ctx3 = canvas3.getContext("2d");


//Drawing on canvas
ctx.fillStyle = "red";
ctx.fillRect(20, 50, 100, 50);


// draw a line and line style
ctx.lineWidth = 10;
ctx.strokeStyle = "blue";
ctx.lineCap = "round";
ctx.moveTo(0, 0);
ctx.lineTo(100, 100);
ctx.stroke();


//draw a circle 
ctx.strokeStyle = "green";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.arc(50, 50, 30, 0, 2*Math.PI);
ctx.stroke();


//draw bordered rectangle rectagle 
ctx.fillStyle = "blue";
ctx.fillRect(100, 20, 140, 70);
ctx.strokeStyle = "orange";
ctx.lineWidth = 5;
ctx.strokeRect(100, 20, 140, 70);


// draw shapes 
ctx2.beginPath();
ctx2.moveTo(50, 50);
ctx2.lineTo(180, 50);
ctx2.lineTo(220, 100);
ctx2.lineTo(50, 100)
ctx2.lineTo(50, 50);
ctx2.strokeStyle = "black";
ctx2.stroke();

ctx2.beginPath();
ctx2.moveTo(60, 60);
ctx2.lineTo(70, 60);
ctx2.lineTo(80, 75);
ctx2.lineTo(90, 60);
ctx2.lineTo(100, 60);
ctx2.lineTo(100, 95)
ctx2.lineTo(90, 95);
ctx2.lineTo(90, 70);
ctx2.lineTo(80, 83)
ctx2.lineTo(70, 70);
ctx2.lineTo(70, 95);
ctx2.lineTo(60, 95);
ctx2.lineTo(60, 60);
ctx2.fillStyle = "lightblue"
ctx2.fill();


ctx3.fillStyle = "pink";
ctx3.fillRect(50, 50, 100, 100);
ctx3.clearRect(60, 60, 50, 50);
ctx3.strokeStyle = "darkgreen"
ctx3.strokeRect(20, 20, 30, 30);
ctx3.clearRect(35, 25, 20, 20);