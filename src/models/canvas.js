class Canvas {
    constructor() {
        this.canvas = document.createElement("canvas")
        this.canvas.width = 1364;
        this.canvas.height = 655;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.ctx = this.canvas.getContext("2d");
        this.rightHandCoords = {x: 716, y: 510};
        this.leftHandCoords = {x: 650, y: 160}
        this.leftObstacleCoords = {x: 450, y: 310};
        this.rightObstacleCoords = {x: 914, y: 310};
    }

    drawTemplate () {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, document.body.clientWidth / 2 - 10, this.canvas.height);
        // console.log(document.body.clientWidth / 2 - 10)
        this.ctx.fillStyle = '#6259B2';
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.rect(1364, 0, -document.body.clientWidth / 2 + 10, this.canvas.height);
        // console.log(-document.body.clientWidth / 2 + 10)
        this.ctx.fillStyle = '#8E182C';
        this.ctx.fill();
        this.ctx.closePath();
    }

    clearCanvas() {
        // this.ctx.save();

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // this.ctx.restore();
    }

    render1PlayerScreen() {
        $(".start-game").hide();
        $("#1player-screen").removeClass("hide");
    
        this.drawHands();
    }

    render2PlayersScreen() {
        $(".start-game").hide();
        $("#2players-screen").removeClass("hide");
    
        this.drawHands();
    }

    renderPlayScreen() {
        $("#1player-screen").addClass("hide");
        $("#2players-screen").addClass("hide");
        this.clearCanvas();
        this.drawTemplate();
        this.moveHands();
    }

    drawHands() {
        this.ctx.save();

        this.ctx.drawImage(loadedImages[0], 180, 40); //left

        this.ctx.translate(693, 0)
        this.ctx.drawImage(loadedImages[0], 180, 40); //right

        this.ctx.restore();
    }

    drawTargets() {
        this.drawLeftTarget();
        this.drawRightTarget();
    }

    drawLeftTarget() {
        this.ctx.save();      

        this.ctx.translate(this.leftObstacleCoords.x, 310);

        this.ctx.beginPath();
        this.ctx.rect(0, 0, 40, 40);
        this.ctx.fillStyle = 'transparent';
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.restore();
    }

    drawRightTarget() {
        this.ctx.save();

        this.ctx.translate(this.rightObstacleCoords.x, 310);

        this.ctx.beginPath();
        this.ctx.rect(0, 0, -40, 40);
        this.ctx.fillStyle = 'transparent';
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.restore();
    }

    moveHands() {
        this.moveLeftHand();
        this.moveRightHand();
    }

    moveLeftHand() {
        this.ctx.save();
        
        this.ctx.translate(this.leftHandCoords.x, 160);
        this.ctx.rotate(Math.PI / 2);
        this.ctx.drawImage(loadedImages[0], 0, 0);
        
        this.ctx.restore();

        // move the target
        this.drawLeftTarget();
    }

    moveRightHand() {
        this.ctx.save();

        this.ctx.translate(this.rightHandCoords.x, 510);// half (red part)
        this.ctx.rotate(-Math.PI / 2)
        this.ctx.drawImage(loadedImages[0], 0, 0);

        this.ctx.restore();

        this.drawRightTarget()
    }

    stretchLeftHand(rightRetreat) {
        let i = 0;
        setInterval(() => {
            if(i === 110) return
            this.leftHandCoords.x += i;
            this.leftObstacleCoords.x += i;

            this.clearCanvas();
            this.drawTemplate();
            if(rightRetreat) {
                this.rightHandCoords.x += i
                this.moveRightHand();
            } else {
                this.moveRightHand();
            }
            this.moveLeftHand();
            this.checkCollision();
            i += 10
        }, 40)
    }

    stretchRightHand(leftRetreat) {
        let i = 0;
        setInterval(() => {
            if(i === 110) return;
            this.rightHandCoords.x -= i;
            this.rightObstacleCoords.x -= i;

            this.clearCanvas();
            this.drawTemplate();

            if(leftRetreat) {
                this.leftHandCoords.x -= i;
                this.moveLeftHand();
            } else {
                this.moveLeftHand();
            }

            this.moveRightHand(i);
            this.checkCollision();
            i += 10
        }, 40)
    }

    retreatLeftHand() {
        let i = 0;
        setInterval(() => {
            if(i === 100) return;
            this.leftHandCoords.x -= i;
            this.leftObstacleCoords.x -= i;

            this.clearCanvas();
            this.drawTemplate();
            this.moveRightHand();
            this.moveLeftHand();
            this.checkCollision();
            i += 10
        }, 40)
    }

    retreatRightHand() {
        let i = 0;
        setInterval(() => {
            if(i === 100) return
            this.rightHandCoords.x += i;
            this.rightObstacleCoords.x += i;

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand();
            this.checkCollision();
            i += 10
        }, 40)
    }

    restoreRightRetreat() {
        let i = 90;
        setInterval(() => {
            if(i === 0) return
            this.rightHandCoords.x -= i;
            this.rightObstacleCoords.x -= i;

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand();
            this.checkCollision();
            i -= 10
        }, 40)
    }

    restoreLeftRetreat() {
        let i = 90  
        setInterval(() => {
            if(i === 0) return
            this.leftHandCoords.x += i;
            this.leftObstacleCoords.x += i;

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand();
            this.checkCollision();
            i -= 10
        }, 40)
    }

    restoreLeftStretch() {
        let i = 100;
        setInterval(() => {
            if(i === 0) return
            this.leftHandCoords.x -= i;
            this.leftObstacleCoords.x -= i;

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand();
            this.checkCollision();
            i -= 10
        }, 40)
    }

    restoreRightStretch() {
        let i = 100
        setInterval(() => {
            if(i === 0) return
            this.rightHandCoords.x += i;
            this.rightObstacleCoords.x += i;

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand();
            this.checkCollision();
            i -= 10
        }, 40)
    }

    checkCollision() {
        if(this.leftObstacleCoords.x >= this.rightObstacleCoords.x) {
            console.log("Collideeee")
        }
    }
}
