class Player {

    constructor(ctx, sizes) {
        this.img = new Image()
        this.img.src = "./images/pink-neon-circle.svg"
        this.ctx = ctx
        this.keys = {
            TOP_KEY: 38,
            SPACE: 32
          }
        this.canvasSizes = {
            w: sizes.w,
            h: sizes.h
        }

        this.posX = 200
        this.posY = 200

        this.velX = 5
        this.velY = 1

        this.gravity = .05
    }
    setListeners() {
        document.onkeydown = function(event) {
            console.log(event)
          if (event.keyCode === this.keys.TOP_KEY) {
            this.ball.speedUp()
          } 
        }.bind(this);
    }

    draw() {
        this.posX += this.velX
        this.posY += this.velY
        this.velY += this.gravity

        if (this.posY <= 0 || this.posY > this.canvasSizes.h - 100) this.changeY()
        if (this.posX <= 0 || this.posX > this.canvasSizes.w - 100) this.changeX()

        this.ctx.drawImage(this.img, this.posX, this.posY, 100, 100)
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