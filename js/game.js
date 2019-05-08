window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      document.getElementById("start-button").style.display = "none"
      document.getElementById("init").style.display = "none"
      document.getElementById("direction-buttons").style.position = "absolute"
      document.getElementById("direction-buttons").style.display = "inline-block"
      startGame()
    };
  }
function startGame() {
    catchTheLight.init('mycanvas')
}
const catchTheLight = {
    version: 1.0,
    author: 'María',
    description: 'Cuantas más luces mejor',
    canvasDom: undefined,
    ctx: undefined,
    player: undefined,
    light:undefined,
    
    canvasSize: {
        w: undefined,
        h: undefined
    },
    init: function (id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.canvasSize.w = 375
        this.canvasSize.h = 667
        this.setDimensions()
        this.setHandlers()
        this.start()
        this.setEventListeners()
    },
    setDimensions: function () {
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },
    setHandlers: function () {
        window.onresize = () => this.setDimensions()
    },
    start: function (){
        this.reset();
        setInterval(() => {
                this.clear()
                this.framesCounter++;
                if (this.framesCounter % 150 === 0) {
                    this.generateLights();
                }

                if (this.framesCounter % 30 === 0){
                    this.player.barrier = !this.player.barrier
                }
                this.isCollision()
                
                this.drawAll()
                this.moveAll();
        }, 30)
    },
    
    reset: function(){
        this.framesCounter = 0;
        this.player = new Player(this.ctx,this.canvasSize) 
        this.lights = []
    },
    generateLights: function() {
        this.lights.push(new Light(this.ctx, this.canvasSize));
        console.log(this.lights)
    },
    drawAll: function() {
        this.player.draw();
        this.lights.forEach(function(light) {
            light.draw()
            
          })
    },
    moveAll: function() {
        this.lights.forEach(function(light) {
        light.move()
        })
    },
    clear: function () {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    setEventListeners: function () {
        const upBtn = document.getElementById('up-btn')
        const rightBtn = document.getElementById('to-right-btn')
        const leftBtn = document.getElementById('to-left-btn')
        
        // const toRightBtn = document.getElementsById('to-right-btn')
        // const toLeftBtn = document.getElementsById('to-left-btn')
        upBtn.onclick =  () => {
            
            if(this.player.posY - 150 < this.canvasSize.h) this.player.goUp()
        }
        rightBtn.onclick =  () => {
            
            if(this.player.posX + 150 < this.canvasSize.w) this.player.goRight()
        }
        leftBtn.onclick =  () => {
            
            if(this.player.posX -150 > 0) this.player.goLeft()

        }
       
        // buttons[1].onclick = () => this.ball.speedDown()
        // buttons[2].onclick = () => this.ball.bounceNow()
        // buttons[3].onclick = () => this.ball.addGravity()
    },
    isCollision: function() {
        
        this.lights.forEach((light, index) => {
                
                  if (this.player.barrier && 
                     this.player.posX < light.posX + light.width/3 &&
                     this.player.posX + this.player.w/3 > light.posX){
                        
                        light.changeX()

                         }
                    if (this.player.barrier &&
                    this.player.posY < light.posY + light.height/3 &&
                    this.player.posY + this.player.h/3 > light.posY){
                        light.changeY()
                    }
                    // if(
                    //      this.player.posX < light.posX + light.width/3 &&
                    //      this.player.posX + this.player.w/3 > light.posX &&
                    //      this.player.posY < light.posY + light.height/3 &&
                    //      this.player.posY + this.player.h/3 > light.posY
                    //  ){
                    //      console.log("choca")
                    //      // alert("Pum!")
                    //      this.lights.splice(index, 1)
                    //  }
           
         });
       },
}
