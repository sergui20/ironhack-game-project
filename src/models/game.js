// Class Game manipulates the canvas

class Game {
    constructor(hands) {
        this.hands = hands;
        this.players = [];
    }

    initializeGame() {
        // document.addEventListener("keyup", function(ev) {
        //     if(ev.keyCode === 32) {
        //         console.log("hey")
        //     }
        // })
        canvas.drawTemplate();
    }

    singlePlayer() {
        const player1 = new Player("Player1");
        this.players.push(player1);
        canvas.renderPlayScreen();
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
}
