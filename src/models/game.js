// Class Game manipulates the canvas
class Game {
    constructor(hands) {
        this.hands = hands;
        this.players = {};
        this.playWithAI = false;
        this.twoPlayers = false;
    }

    initializeGame() {
        canvas.drawTemplate();
    }

    singlePlayer() {
        this.playWithAI = true;

        const player1 = new Player("Player1");
        player1.ready = true;
        player1.attack =  true; // user starts the game attacking
        this.players["Player1"] = {...player1}
        
        const AIPlayer = new Player("Player2");
        AIPlayer.ready = true;
        this.players["Player2"] = {...AIPlayer}
        
        canvas.renderPlayScreen();
    }

    multiPlayer(playerName) {
        const player = new Player(playerName);
        player.ready = true;

        this.players[playerName] = {...player}
        // this.players.push(player);
        
        console.log(this.players)
        if(this.players["Player1"] && this.players["Player2"]) {
            if(this.players["Player1"].ready && this.players["Player2"].ready) {
                this.players["Player1"].attack = true;
                canvas.renderPlayScreen();
            }
        }
    }

    player1Attack() {
        let retreatChance = Math.random();

        if (retreatChance < 0.5) {
            canvas.stretchLeftHand();
            canvas.retreatRightHand();

            setTimeout(() => {
                canvas.restoreLeftStretch();
                canvas.restoreRightRetreat();
            }, 500)
            this.pcTurn(); // pc will try to attack randomly
        } else {
            canvas.stretchLeftHand();
            setTimeout(() => {
                canvas.restoreLeftStretch()
            }, 500)
        }
    }

    player1Retreat() {
        canvas.retreatLeftHand();
        setTimeout(() => {
            canvas.restoreLeftRetreat();
        }, 500)
    }

    pcTurn() {
        setInterval(function () {
            if(game.players["Player2"].attack) {
                let randomTime = Math.floor((Math.random() * 3))
                if(randomTime === 2 && canvas.rightHandCoords.x === 746 && canvas.toggleEvent) {
                    canvas.stretchRightHand();
                    setTimeout(() => {
                        canvas.restoreRightStretch();
                    }, 500)
                }
            } else {
                return
            }
        }, 2000)
    }
}
