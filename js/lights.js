class Light{
    constructor(ctx, sizes) {
        
        this.ctx = ctx
        
        this.canvasSize = {
            w: sizes.w,
            h: sizes.h
        }

        this.img1 = new Image()
        this.img1.src = "./images/white-light.svg"
        this.img2 = new Image()
        this.img2.src = "./images/pink-light.svg"
        this.img3 = new Image()
        this.img3.src = "./images/yellow-light.svg"
        this.img4 = new Image()
        this.img4.src = "./images/green-light.svg"
        this.img5 = new Image()
        this.img5.src = "./images/orange-light.svg"
        this.images = [this.img1,this.img2,this.img3,this.img4,this.img5]

        this.img = this.images[Math.floor(Math.random() * this.images.length)]

        this.height = 100
        this.width = 100

        this.posXmin = 50
        this.posXmax = 200

        this.posX = Math.floor(Math.random() * (200 - 100) + 100)
        this.posY = Math.floor(Math.random() * (500 - 100) + 100)

        this.posYmin = 50
        this.posYmax = 200

        this.velX = Math.floor(Math.random() * (5 - (-5)) + (-5))
        this.velY = 1
        
        this.gravity = .05
    }

    draw() {
       
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    }
    
    move() {
        if (this.velX===0){
            this.velX === 1
        }
        this.posX += this.velX
        this.posY += this.velY
        this.velY += this.gravity

        if (this.posY <= 0 || this.posY > this.canvasSize.h - 100) this.changeY()
        if (this.posX <= 0 || this.posX > this.canvasSize.w - 100) this.changeX()
    }
    changeY() {
        this.velY *= -1
    }

    changeX() {
        this.velX *= -1
    }

    speedUp() {
        this.velX *= 1.1
        this.velY *= 1.1
    }

    speedDown() {
        this.velX *= .9
        this.velY *= .9
    }

    bounceNow() {
        this.changeX()
        this.changeY()
    }

    addGravity() {
        this.gravity *= 1.1
    }
}