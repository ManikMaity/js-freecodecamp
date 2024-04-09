class Game {
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
}


window.addEventListener("load", ()=>{
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    console.log(ctx);
})