class Canvas {
    constructor() {
        this.canvas = document.createElement("canvas")
        this.canvas.width = 1364;
        this.canvas.height = 655;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.ctx = this.canvas.getContext("2d");
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

    drawLeftTarget(move) {
        let x = move || 0;
        let translateX = 450 + x;
        this.leftObstacleCoords.x = translateX;

        this.ctx.save();

        this.ctx.translate(translateX, 310);

        this.ctx.beginPath();
        this.ctx.rect(0, 0, 40, 40);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.restore();
    }

    drawRightTarget(move) {
        let x = move || 0;
        let translateX = 914 - x;
        this.rightObstacleCoords.x = translateX;

        this.ctx.save();

        this.ctx.translate(translateX, 310);

        this.ctx.beginPath();
        this.ctx.rect(0, 0, -40, 40);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.restore();
    }

    moveHands() {
        this.moveLeftHand();
        this.moveRightHand();
    }

    moveLeftHand(move) {
        let x = move || 0;

        this.ctx.save();
        
        this.ctx.translate(650 + x, 160);
        this.ctx.rotate(Math.PI / 2)
        this.ctx.drawImage(loadedImages[0], 0, 0);
        
        this.ctx.restore();
        this.drawLeftTarget(x);
    }

    moveRightHand(move) {
        let x = move || 0;

        this.ctx.save();

        this.ctx.translate(716 - x, 510);// half (red part)
        this.ctx.rotate(-Math.PI / 2)
        this.ctx.drawImage(loadedImages[0], 0, 0);

        this.ctx.restore();
        this.drawRightTarget(x)
    }

    stretchLeftHand() {
        let i = 0;
        setInterval(() => {
            if(i === 480) return

            this.clearCanvas();
            this.drawTemplate();
            this.moveRightHand();
            this.moveLeftHand(i)
            this.checkCollision();
            i += 10
        }, 1)
    }

    stretchRightHand() {
        let i = 0;
        setInterval(() => {
            if(i === 480) return

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand(i);
            this.checkCollision();
            i += 10
        }, 1)
    }

    retreatLeftHand() {
        let i = 0;
        setInterval(() => {
            if(i === 480) return

            this.clearCanvas();
            this.drawTemplate();
            this.moveRightHand();
            this.moveLeftHand(-i)
            this.checkCollision();
            i += 10
        }, 1)
    }

    retreatRightHand() {
        let i = 0;
        setInterval(() => {
            if(i === 480) return

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand(-i);
            this.checkCollision();
            i += 10
        }, 1)
    }

    checkCollision() {
        // console.log(this.leftObstacleCoords.x)
        if(this.leftObstacleCoords.x >= this.rightObstacleCoords.x) {
            console.log("Collideeee")
        }
    }
}
