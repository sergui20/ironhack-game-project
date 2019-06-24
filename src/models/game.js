// Class Game manipulates the canvas
class Game {
    constructor(hands) {
        this.hands = hands;
        this.players = [];
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
        
        const AIPlayer = new Player("AIPlayer");
        AIPlayer.ready = true;
        
        this.players.push(player1, AIPlayer);
        canvas.renderPlayScreen();
        console.log(this.players)
    }

    multiPlayer(playerName) {
        const player = new Player(playerName);
        player.ready = true;
        this.players.push(player);

        if(this.players.length === 2) {
            if(this.players[0].ready && this.players[1].ready) {
                canvas.renderPlayScreen();
            }
        }
    }

    player1Attack() {
        if(this.players[0].attack) {
            if(this.singlePlayer) {
                let retreatChance = Math.random();

                if (retreatChance < 0.30) {
                    canvas.stretchLeftHand();
                    canvas.retreatRightHand();

                    setTimeout(() => {
                        canvas.restoreLeftStretch();
                        canvas.restoreRightRetreat();
                    }, 500)

                    console.log("Missed");

                    this.players[0].attack = false;
                    this.pcTurn();
                } else {
                    canvas.stretchLeftHand();
                    setTimeout(() => {
                        canvas.restoreLeftStretch()
                    }, 500)
                }
            }
        } else { // user has to retreat the hand
            canvas.retreatLeftHand();
            setTimeout(() => {
                canvas.restoreLeftRetreat();
            }, 500)
        }
    }


    pcTurn() {
        setInterval(function () {
            let randomTime = Math.floor((Math.random() * 50))
            if(randomTime === 2 && canvas.rightHandCoords.x === 716) {
                canvas.stretchRightHand();
                setTimeout(() => {
                    canvas.restoreRightStretch();
                }, 500)
            }
        }, 50)
    }
}
