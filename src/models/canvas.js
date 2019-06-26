class Canvas {
    constructor() {
        this.canvas = document.createElement("canvas")
        this.canvas.width = 1364;
        this.canvas.height = 655;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.ctx = this.canvas.getContext("2d");
        this.rightHandCoords = {x: 746, y: 510};
        this.leftHandCoords = {x: 620, y: 160}
        this.leftObstacleCoords = {x: 440, y: 310};
        this.rightObstacleCoords = {x: 924, y: 310};
        this.canvasRotated = false;
        this.toggleEvent = true;
        this.livesTextPosition = {
            leftHandLives: {x: 600, y: 50},
            rightHandLives: {x: 702, y: 50}
        }
        this.leftHandMoving = false;
        this.rightHandMoving = false;
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
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.restore();
    }

    drawRightTarget() {
        this.ctx.save();

        this.ctx.translate(this.rightObstacleCoords.x, 310);

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

    moveLeftHand() {
        this.leftHandMoving = false;

        this.ctx.save();
        
        this.ctx.translate(this.leftHandCoords.x, 160);
        this.ctx.rotate(Math.PI / 2);
        this.ctx.drawImage(loadedImages[0], 0, 0);
        
        this.ctx.restore();

        // move the target
        this.drawLeftTarget();
        this.drawLeftHandLives();

        if(this.leftHandCoords.x === 1070) {
            this.leftHandMoving = true;
        }
    }

    moveRightHand() {
        this.rightHandMoving = false;

        this.ctx.save();

        this.ctx.translate(this.rightHandCoords.x, 510);// half (red part)
        this.ctx.rotate(-Math.PI / 2)
        this.ctx.drawImage(loadedImages[0], 0, 0);

        this.ctx.restore();

        this.drawRightTarget();
        this.drawRightHandLives();

        if(this.rightHandCoords.x === 296) {
            this.rightHandMoving = true;
        }
    }

    drawLeftHandLives() {
        if(this.canvasRotated) {
            this.ctx.save();
            this.ctx.translate(this.livesTextPosition.leftHandLives.x + 55, this.livesTextPosition.leftHandLives.y - 50);
            this.ctx.rotate(-Math.PI);
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(game.players["Player1"].lives, 0, 0);
            this.ctx.restore();
        } else {
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(game.players["Player1"].lives, this.livesTextPosition.leftHandLives.x, this.livesTextPosition.leftHandLives.y);
        }
    }

    drawRightHandLives() {
        if(this.canvasRotated) {
            this.ctx.save();
            this.ctx.translate(this.livesTextPosition.rightHandLives.x + 70, this.livesTextPosition.rightHandLives.y - 50);
            this.ctx.rotate(-Math.PI);
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(game.players["Player2"].lives, 0, 0);
            this.ctx.restore();
        } else {
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(game.players["Player2"].lives, this.livesTextPosition.rightHandLives.x, this.livesTextPosition.rightHandLives.y);
        }
    }
 
    stretchLeftHand(rightRetreat) {
        let i = 0;
        setInterval(() => {
            if(i === 100) return
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
            this.checkRightCollision()
            i += 10
        }, 40)
    }

    stretchRightHand(leftRetreat) {
        let i = 0;
        setInterval(() => {
            if(i === 100) return;
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
            this.checkLeftCollision();
            i += 10
        }, 40)
    }

    retreatLeftHand() {
        let i = 0;
        setInterval(() => {
            if(i === 90) return;
            this.leftHandCoords.x -= i;
            this.leftObstacleCoords.x -= i;

            this.clearCanvas();
            this.drawTemplate();
            this.moveRightHand();
            this.moveLeftHand();
            // this.checkCollision();
            i += 10
        }, 40)
    }

    retreatRightHand() {
        let i = 0;
        setInterval(() => {
            if(i === 90) return
            this.rightHandCoords.x += i;
            this.rightObstacleCoords.x += i;

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand();
            // this.checkCollision();
            i += 10
        }, 40)
    }

    restoreRightRetreat() {
        let i = 80;
        setInterval(() => {
            if(i === 0) return
            this.rightHandCoords.x -= i;
            this.rightObstacleCoords.x -= i;

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand();
            // this.checkCollision();
            i -= 10
        }, 40)
    }

    restoreLeftRetreat() {
        let i = 80  
        setInterval(() => {
            if(i === 0) return
            this.leftHandCoords.x += i;
            this.leftObstacleCoords.x += i;

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand();
            // this.checkCollision();
            i -= 10
        }, 40)
    }

    restoreLeftStretch() {
        let i = 90;
        setInterval(() => {
            if(i === 0) return
            this.leftHandCoords.x -= i;
            this.leftObstacleCoords.x -= i;

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand();
            // this.checkCollision();
            i -= 10
        }, 40)
    }

    restoreRightStretch() {
        let i = 90
        setInterval(() => {
            if(i === 0) return
            this.rightHandCoords.x += i;
            this.rightObstacleCoords.x += i;
            // console.log(this.rightHandCoords.x);

            this.clearCanvas();
            this.drawTemplate();
            this.moveLeftHand()
            this.moveRightHand();
            // this.checkCollision();
            i -= 10
        }, 40)
    }

    checkLeftCollision() {
        if(this.leftObstacleCoords.x >= this.rightObstacleCoords.x - 40) {
            // substract lives for left hand
            slapEffect.play()
            game.players["Player1"].lives--
            return
        } else {
            if(this.rightObstacleCoords.x - 40 > this.leftObstacleCoords.x  && this.rightHandMoving) {
                console.log("Hey Missed")

                setTimeout(() => {
                    this.canvasRotated = false;
                    this.rotateCanvas();
                }, 500)
                console.log("left collision");

                game.players["Player1"].attack = true;
                game.players["Player2"].attack = false;
            }
        }
    }

    checkRightCollision() {
        if(this.leftObstacleCoords.x >= this.rightObstacleCoords.x - 40) {
            // substract lives for right hand
            // console.log("right collision");
            // console.log(game.players["Player1"].attack);
            slapEffect.play()
            game.players["Player2"].lives--
            // return true
        } else {
            console.log(this.leftHandMoving)
            if(this.leftObstacleCoords.x < this.rightObstacleCoords.x - 40 && this.leftHandMoving) {
                console.log("Missed")
                setTimeout(() => {
                    this.canvasRotated = true;
                    this.rotateCanvas();
                }, 500)
                // console.log("Changing player1 attack");

                game.players["Player1"].attack = false;
                game.players["Player2"].attack = true;
            }
        }
    }

    rotateCanvas() {
        this.toggleEvent = false;
        if(this.canvasRotated) {
            const canvas = $("canvas")
            canvas.css("transform", "rotate(180deg)")
            canvas.css("transition", "transform 1000ms ease")
            this.livesTextPosition.leftHandLives.y = this.canvas.height -10;
            this.livesTextPosition.rightHandLives.y = this.canvas.height -10;
    
            this.clearCanvas();
            this.drawTemplate();
            setTimeout(() => {
                this.moveLeftHand();
                this.moveRightHand();
            }, 1100)
            setTimeout(() => {
                this.toggleEvent = true;
            }, 1500);
        } else {
            const canvas = $("canvas")
            canvas.css("transform", "rotate(0)")
            canvas.css("transition", "transform 1000ms ease")
            this.livesTextPosition.leftHandLives.y = 50;
            this.livesTextPosition.rightHandLives.y = 50;
        
            this.clearCanvas();
            this.drawTemplate();
            setTimeout(() => {
                this.moveLeftHand();
                this.moveRightHand();
            }, 1100)
            setTimeout(() => {
                this.toggleEvent = true;
            }, 1500);
        }
    }

    // drawAttackText() {}
}
