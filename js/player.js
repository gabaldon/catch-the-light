class Player {

    constructor(ctx, sizes) {
        this.img = new Image()
        this.img.src = "./images/pink-neon-circle.svg"
        this.ctx = ctx
        this.barrier = false
        this.gameOver = false
       
        this.canvasSizes = {
            w: sizes.w,
            h: sizes.h
        }

        this.posX = 200
        this.posY = 200
        this.w = 100
        this.h = 100

        // this.playerRadio = this.w /2
        // this.cx1 =  this.posX + (this.w/2)
        // this.cy1 =  this.posY + (this.h/2)

        this.velX = 2
        this.velY = 1

        this.directionX = "R"
        this.directionY = "Dw"

        this.gravity = .05
    }

    draw() {
        this.posX += this.velX
        this.posY += this.velY
        this.velY += this.gravity

        if (this.posY <= 5) this.posY = 5
        if (this.posY > this.canvasSizes.h - 100) this.changeY()
        if (this.posX <= 0 || this.posX > this.canvasSizes.w - 100) this.changeX()

        if (!this.gameOver) {
            if (this.barrier) {
                this.img.src = "./images/white-neon-circle.svg"
            }
            else this.img.src = "./images/pink-neon-circle.svg"
        }
       
        //change player image when almost game is over
      

        this.ctx.drawImage(this.img, this.posX, this.posY, this.w, this.h)
    }

    changeY() {
        this.velY *= -1
        if (this.directionX === "Dw") this.directionX = "Up"
        else this.directionX = "Dw"
    }



    changeX() {
        this.velX *= -1
        if (this.directionX === "R") this.directionX = "L"
        else this.directionX = "R"
    }

    // speedUp() {
    //     this.velX *= 1.1
    //     this.velY *= 1.1
    // }
    
    goUp() {
        this.posY -= 20

         if (this.directionY === "Dw") this.changeY()
        
    }
    goRight(){
       
        this.posX += 20
        if (this.directionX === "L") this.changeX()
        // if (this.posX <= 0 || this.posX > this.canvasSizes.w - 100) this.changeX()
    }
    goLeft(){
        this.posX -= 20
        if (this.directionX === "R") this.changeX()
        // if (this.posX <= 0 || this.posX > this.canvasSizes.w - 100) this.changeX()
    }

    // speedDown() {
    //     this.velX *= .9
    //      this.velY *= .9
    // }

    // bounceNow() {
    //     this.changeX()
    //     this.changeY()
    // }

    addGravity() {
        this.gravity *= 1.1
    }

}
