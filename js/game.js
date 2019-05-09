window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      document.getElementById("start-button").style.display = "none"
      document.getElementById("init").style.display = "none"
      
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
                if (this.framesCounter % 155 === 0) {
                    this.generateLights();
                }

                // this.controlBarrier()


                // if (this.changes <= 10){
                    if (this.framesCounter % 200 === 0){
                    this.player.barrier = !this.player.barrier
                    this.changes++
                    }
                // } else if (this.changes <= 20){
                //     if (this.framesCounter % 50 === 0){
                //     this.player.barrier = !this.player.barrier
                //     this.changes++
                //     }
                // } else if (this.changes <= 50){
                //     bla bla
                //     this.changes++
                // }
                this.drawAll()
                this.moveAll();

                if (!this.player.gameOver){
                    this.isCollision()
                }
                
                if (this.player.w <= 20 && this.player.h <=20){
                        this.player.gameOver = true
                        this.player.img.src = "images/white-light.svg"
                        this.player.w = 100
                        this.player.h = 100

                    setTimeout (this.gameOver,3000)

                console.log("igual a 10px")
                }
                
                
        }, 1000 / 60)
    },

    stop: function() {
        clearInterval(this.interval);
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
        
        document.onclick =  (event) => {
            console.log(event.clientX, event.clientY)
            if(event.clientX < this.canvasSize.w * .33) {
                if(this.player.posX -150 > 0)  this.player.goLeft()
            }else if (event.clientX > this.canvasSize.w * .33 && event.clientX < this.canvasSize.w * .66){
                if(this.player.posY - 150 < this.canvasSize.h) this.player.goUp()
            } else if (event.clientX > this.canvasSize.w * .66 && event.clientX < this.canvasSize.w){
                if(this.player.posX + 150 < this.canvasSize.w) this.player.goRight()
            }
            
        }
        
    },
    isCollision: function() {
        

        if(!this.player.barrier) {

            console.log("Barrier down")

            this.lights.forEach((light, index) => {

                        if(
                                this.player.posX < light.posX + light.width/3 &&
                                this.player.posX + this.player.w/3 > light.posX &&
                                this.player.posY < light.posY + light.height/3 &&
                                this.player.posY + this.player.h/3 > light.posY
                            ){
                                this.lights.splice(index, 1)
                                this.player.w +=10
                                this.player.h +=10
                            }

                });
        } else {
     
                console.log("Barrier up")
     
                this.lights.forEach((light) => {
     
                    if (light.posY < this.player.posY + this.player.h/3 &&
                        light.posY + light.height/3 > this.player.posY &&
                        this.player.posX < light.posX + light.width/3 &&
                        this.player.posX + this.player.w > light.posX) {
                        this.player.changeX()
                        this.player.w -=10
                        this.player.h -=10
                        
                        
                        }
                    if (this.player.posY < light.posY + light.height/3 &&
                        this.player.posY + this.player.h/3 > light.posY &&
                        light.posX < this.player.posX + this.player.w/3 &&
                        light.posX + light.width/3 > this.player.posX)
                        {
                        
                        this.player.changeY()
                        
                        }
                })
        }
        
      
    },

   

    gameOver: function() {
        this.stop()
        
        document.getElementById("you-loose").style.position = "absolute"
        document.getElementById("you-loose").style.display = "block"
        document.getElementById("play-again-btn").style.display = "block"
        const exit = document.getElementById("exit-btn").style.display = "block"
        document.getElementById("play-again-btn").onclick =() =>{
            
            this.start()
            
        }
        
        
        
    },
    youWin: function(){

    }

}


