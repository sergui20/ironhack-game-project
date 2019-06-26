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
        this.lockLeftHand = false;
        this.lockRightHand = false;
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

    rotateTemplate () {
        // this.ctx.rotate(-Math.PI)
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.translate(1364 / 2 + 10, 0)
        this.ctx.rect(0, 0, document.body.clientWidth, this.canvas.height);
        // console.log(document.body.clientWidth / 2 - 10)
        this.ctx.fillStyle = '#6259B2';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(0, 0)
        this.ctx.rect(0, 0, document.body.clientWidth / 2 - 10, this.canvas.height);
        // console.log(-document.body.clientWidth / 2 + 10)
        this.ctx.fillStyle = '#8E182C';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
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
        this.rotateTemplate();
        this.moveHands();
        this.drawAttackText();
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
        this.leftHandMoving = false;

        this.ctx.save();
        
        this.ctx.translate(this.leftHandCoords.x, 160);
        this.ctx.rotate(Math.PI / 2);
        this.ctx.drawImage(loadedImages[0], 0, 0);
        
        this.ctx.restore();

        // move the target
        this.drawRetreatCounter();
        this.drawLeftTarget();
        this.drawLeftHandLives();

        if(this.lockLeftHand) {
            this.checkLeftBracelet()
        }

        game.checkIfLoose();            

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
        this.drawRetreatCounter();
        game.checkIfLoose();            

        if(this.rightHandCoords.x === 296) {
            this.rightHandMoving = true;
        }
    }

    drawLeftHandLives() {
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(game.players["Player1"].lives, this.livesTextPosition.leftHandLives.x, this.livesTextPosition.leftHandLives.y);
    }

    drawRightHandLives() {
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(game.players["Player2"].lives, this.livesTextPosition.rightHandLives.x, this.livesTextPosition.rightHandLives.y);
    }
 
    stretchLeftHand() {
        let i = 0;
        setInterval(() => {
            if(i === 100) return
            this.leftHandCoords.x += i;
            this.leftObstacleCoords.x += i;

            this.clearCanvas();
            if(game.players["Player1"].attack) {
                this.rotateTemplate()
            } else {
                this.drawTemplate();
            }
            this.moveRightHand();
            this.moveLeftHand();
            this.checkRightCollision();            
            i += 10
        }, 40)
    }

    stretchRightHand() {
        let i = 0;
        setInterval(() => {
            if(i === 100) return;
            this.rightHandCoords.x -= i;
            this.rightObstacleCoords.x -= i;

            this.clearCanvas();
            if(game.players["Player1"].attack) {
                this.rotateTemplate()
            } else {
                this.drawTemplate();
            }
            this.moveLeftHand();
            this.moveRightHand(i);
            this.checkLeftCollision();            
            i += 10
        }, 40)
    }

    retreatLeftHand() {
        let i = 0;
        if(this.rightHandCoords.x === 746) {
            console.log("right hand not moving")
            game.retreats--
            this.checkLeftBracelet();
        }
        setInterval(() => {
            if(i === 90) return;
            this.leftHandCoords.x -= i;
            this.leftObstacleCoords.x -= i;

            this.clearCanvas();
            if(game.players["Player1"].attack) {
                this.rotateTemplate()
            } else {
                this.drawTemplate();
            }
            this.moveRightHand();
            this.moveLeftHand();                        
            i += 10
        }, 40)
    }

    retreatRightHand() {
        let i = 0;
        if(this.leftHandCoords.x === 620) {
            console.log("Left hand not moving")
            game.retreats--
            // console.log(game.retreats)
            this.checkRightBracelet();
        }
        setInterval(() => {
            if(i === 90) return
            this.rightHandCoords.x += i;
            this.rightObstacleCoords.x += i;

            this.clearCanvas();
            if(game.players["Player1"].attack) {
                this.rotateTemplate()
            } else {
                this.drawTemplate();
            }
            this.moveLeftHand()
            this.moveRightHand();                        
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
            if(game.players["Player1"].attack) {
                this.rotateTemplate()
            } else {
                this.drawTemplate();
            }
            this.moveLeftHand()
            this.moveRightHand();            
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
            if(game.players["Player1"].attack) {
                this.rotateTemplate()
            } else {
                this.drawTemplate();
            }
            this.moveLeftHand()
            this.moveRightHand();
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
            if(game.players["Player1"].attack) {
                this.rotateTemplate()
            } else {
                this.drawTemplate();
            }
            this.moveLeftHand()
            this.moveRightHand();            
            i -= 10
        }, 40)
    }

    restoreRightStretch() {
        let i = 90
        setInterval(() => {
            if(i === 0) return
            this.rightHandCoords.x += i;
            this.rightObstacleCoords.x += i;

            this.clearCanvas();
            if(game.players["Player1"].attack) {
                this.rotateTemplate()
            } else {
                this.drawTemplate();
            }
            this.moveLeftHand()
            this.moveRightHand();            
            i -= 10
        }, 40)
    }

    checkLeftCollision() {
        if(this.leftObstacleCoords.x >= this.rightObstacleCoords.x - 40) {
            // substract lives for left hand
            slapEffect.play()
            game.players["Player1"].lives--
            game.retreats = 3;
        } else {
            if(this.rightObstacleCoords.x - 40 > this.leftObstacleCoords.x  && this.rightHandMoving) {
                console.log("Hey Missed")
                game.retreats = 3;
                setTimeout(() => {
                    this.canvasRotated = false;
                    this.rotateCanvas();
                    game.players["Player1"].attack = true;
                    game.players["Player2"].attack = false;
                    if(game.players["Player1"].attack) {
                        this.rotateTemplate()
                    } else {
                        this.drawTemplate();
                    }
                    
                }, 500)
                console.log("left collision");
            }
        }
    }

    checkRightCollision() {
        if(this.leftObstacleCoords.x >= this.rightObstacleCoords.x - 40) {
            slapEffect.play()
            game.players["Player2"].lives--
            game.retreats = 3;
        } else {
            // console.log(this.leftHandMoving)
            if(this.leftObstacleCoords.x < this.rightObstacleCoords.x - 40 && this.leftHandMoving) {
                console.log("Missed")
                game.retreats = 3;
                setTimeout(() => {
                    this.canvasRotated = true;
                    this.rotateCanvas();
                    game.players["Player1"].attack = false;
                    game.players["Player2"].attack = true;
                    if(game.players["Player1"].attack) {
                        this.rotateTemplate()
                    } else {
                        this.drawTemplate();
                    }
                }, 500)
                
            }
        }
    }

    rotateCanvas() {
        this.toggleEvent = false;
        if(this.canvasRotated) {
            const canvas = $("canvas")  
            canvas.addClass("rotate")
            setTimeout(() => {
                canvas.removeClass("rotate")    
            }, 1010)
    
            this.clearCanvas();
            if(game.players["Player1"].attack) {
                this.rotateTemplate()
            } else {
                this.drawTemplate();
            }
            setTimeout(() => {
                this.moveLeftHand();
                this.moveRightHand();
            }, 1100)
            setTimeout(() => {
                this.toggleEvent = true;
            }, 1500);
        } else {
            const canvas = $("canvas") 
            canvas.addClass("rotate")  
            setTimeout(() => {
                canvas.removeClass("rotate")    
            }, 1010)    
        
            this.clearCanvas();
            if(game.players["Player1"].attack) {
                this.rotateTemplate()
            } else {
                this.drawTemplate();
            }
            setTimeout(() => {
                this.moveLeftHand();
                this.moveRightHand();
            }, 1100)
            setTimeout(() => {
                this.toggleEvent = true;
            }, 1500);
        }
    }

    drawLeftSadFace() {
        this.ctx.save();
        if(this.canvasRotated) {
            this.ctx.translate(this.leftHandCoords.x, 600);
            this.ctx.rotate(-Math.PI)
            this.ctx.drawImage(sadFace, 0, 0);
        } else {
            this.ctx.translate(this.leftHandCoords.x, 160);
            this.ctx.drawImage(sadFace, 0, 0);
        }


        this.ctx.restore();
    }

    drawRightSadFace() {
        this.ctx.save();
        if(this.canvasRotated) {
            this.ctx.translate(this.rightHandCoords.x, 160);
            this.ctx.rotate(-Math.PI)
            this.ctx.drawImage(sadFace, 0, 0);
        } else {
            this.ctx.translate(700, 100);
            this.ctx.drawImage(sadFace, 0, 0);
        }

        this.ctx.restore();
    }

    drawWinnerText() {
        this.ctx.save();
        if(this.canvasRotated) {
            this.ctx.translate(1200, 320);
            this.ctx.rotate(-Math.PI);
            this.ctx.font = "80px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText("WINNER", 0, 0);            
        } else {
            this.ctx.font = "80px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText("WINNER", 170, 350); 
        }
        this.ctx.restore();
    }

    drawAttackText() {
        if(game.players["Player1"].attack) {
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText("Attack", 250, 150);
            return
        }

        if(game.players["Player2"].attack) {
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText("Attack", 950, 150);
            return
        }
    }

    drawRetreatCounter() {
        if(!(game.players["Player1"].attack)) {
            let y = 0;
            for(let i = 0; i < game.retreats; i++) {
                this.ctx.save();
        
                this.ctx.translate(635, this.leftHandCoords.y - y)
                this.ctx.beginPath();
    
                this.ctx.arc(0, 0, 15, 0, 2 * Math.PI);
                this.ctx.fillStyle = 'white';
                this.ctx.fill();
                this.ctx.stroke();
    
                this.ctx.closePath();
                this.ctx.restore();
                y += 35
            } 
        } else {
            let y = 0;
            for(let i = 0; i < game.retreats; i++) {
                this.ctx.save();
        
                this.ctx.translate(725, this.leftHandCoords.y - y)
                this.ctx.beginPath();
    
                this.ctx.arc(0, 0, 15, 0, 2 * Math.PI);
                this.ctx.fillStyle = 'white';
                this.ctx.fill();
                this.ctx.stroke();
    
                this.ctx.closePath();
                this.ctx.restore();
                y += 35
            }
        }
    }

    checkLeftBracelet() {
        if(game.retreats === 0) {
            this.lockLeftHand = true;
            setTimeout(() => {
                let i = 0;
                let interval = setInterval(() => {
                    if(i === 30) {
                        game.retreats = 3;
                        this.moveHands();
                        this.lockLeftHand = false;
                        clearInterval(interval);
                    } 
                    this.ctx.drawImage(bracelet, 250, 160);
                    i++
                }, 60)
            }, 1000)
        }
    }

    checkRightBracelet() {
        if(game.retreats === 0) {
            this.lockRightHand = true;
            setTimeout(() => {
                let i = 0;
                let interval = setInterval(() => {
                    if(i === 30){
                        game.retreats = 3;
                        this.moveHands();
                        this.lockRightHand = false;
                        clearInterval(interval)
                    }
                    this.ctx.drawImage(bracelet, 1000, 160);
                    i++
                }, 60)
            }, 1000)
        }
    }
}
