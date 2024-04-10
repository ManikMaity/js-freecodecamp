class Game {
    constructor(canvas, context){
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        window.addEventListener("resize", (e)=>{
           this.canvas.width=  e.currentTarget.innerWidth;
           this.canvas.height = e.currentTarget.innerHeight;
           this.height = this.canvas.height;
           this.width = this.canvas.width;
         })
    }

    render(){
        this.ctx.fillStyle = "Red";
        this.player.update();
        this.player.draw();
    }
    
}


window.addEventListener("load", ()=>{
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 720;
    canvas.height = 720;
    const game = new Game(canvas, ctx);


    const animate = ()=>{
        ctx.clearRect(0, 0, canvas.height, canvas.width);
        game.render();
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
})