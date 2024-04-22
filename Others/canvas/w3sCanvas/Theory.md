# Canvas

## Intro
- The HTML `<canvas>` element is used to draw graphics on a web page.
- We have to use js to draw in canvas.
- Canvas has several methods for drawing paths, boxes, circles, text, and adding images.
- The `<canvas>` element is only a container for graphics.
- canvas can be animated

### Simple canvas example -
```html
<canvas id="myCanvas" width="200" height="100"></canvas>
<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>
```
- we have to set height and weight to canvas (or default size of the canvas is 300px (width) x 150px (height) be applied.)
- By default, the `<canvas>` element has no border and no content.

## Draw in canvas
- done using js
- canvas is initialy blanck;

### Example - 
```js
// finding the canvas ele.
const canvas = document.getElementById("myCanvas");
// creatng a drawing obj using .getContext();
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
//Drawing on canvas
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 100, 50);
```
```
/** @type {CanvasRenderingContext2D} */ 
// this helps in vs code canvas intelligence to work 
```

## Canvas Coordinates
- The HTML canvas is a two-dimensional grid
- The upper-left corner of the canvas has the coordinates (0,0).

- Drawing a rectagle - fillRect(x, y, width, height)

### Dwaing line 
- moveTo(0, 0); is the strating point and lineTo(100, 100) is ending point.
```js 
ctx.moveTo(0, 0);
ctx.lineTo(100, 100);
ctx.stroke();
```

### Dwaing a circle 
- beginPath() - begins a path
- arc(x, y, r, startangle, endangle) - startangle = 0 | endangle = 2*Math.PI | x , y -> center position of circle | r -> radius
- ctx.stroke(); - at end

#### Example - 
```js
ctx.beginPath();
ctx.arc(50, 50, 30, 0, 2*Math.PI);
ctx.stroke();
```

### Line styleing 

```js
// line width to 10
ctx.lineWidth = 10;
// line color to blue
ctx.strokeStyle = "blue";
// line border radius to rounded
ctx.lineCap = "round";
```

### draw bordered rectangle rectagle -
```js
ctx.fillStyle = "blue";
ctx.fillRect(100, 20, 140, 70);
ctx.strokeStyle = "orange";
ctx.lineWidth = 5;
ctx.strokeRect(100, 20, 140, 70);
```

### Drawing shapes -
ctx2.beginPath() - to bigin
```js
ctx2.beginPath();
ctx2.moveTo(50, 50);
ctx2.lineTo(180, 50);
ctx2.lineTo(220, 100);
ctx2.lineTo(50, 100)
ctx2.lineTo(50, 50);
ctx2.strokeStyle = "black";
ctx2.stroke();
```

```js
// Drawing a "M"
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
```

## Clear react
- The clearRect() method is used to clear a rectangular area of the canvas. The cleared rectangle is transparent.