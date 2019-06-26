const loadedImages = [];
var hands = [
    {
        name: "black-hand",
        src: "src/images/hand1.png"
    }
]

const slapEffect = new Audio('src/slap.mp3');

const canvas = new Canvas();
const game = new Game(hands)

window.addEventListener("DOMContentLoaded", function() {
    game.hands.forEach(img => {
       let image = new Image();
       image.src = img.src
       image.onload = function() {
        loadedImages.push(image)
       } 
    });

    game.initializeGame();
});

$("#singleplayer-ready").click(function() {
    game.singlePlayer();

    document.addEventListener("keyup", function(ev) {
        if(ev.keyCode === 32 && canvas.leftHandCoords.x === 620 && canvas.toggleEvent) {
            if (game.players["Player1"].attack) {
                game.player1Attack();
            } else {
                game.player1Retreat();
            }
        }
    })
});

$("#player1-ready").click(function() {
    game.multiPlayer("Player1");
    $(this).addClass("disabled");

    document.addEventListener("keyup", function(ev) {
        if(ev.keyCode === 65 && canvas.leftHandCoords.x === 620 && canvas.toggleEvent) {
            if(game.players["Player1"].attack) { // toggle player 1 attack
                canvas.stretchLeftHand()
                setTimeout(() => {
                    canvas.restoreLeftStretch()
                }, 500)
            } else {
                canvas.retreatLeftHand()
                setTimeout(() => {
                    canvas.restoreLeftRetreat()
                }, 500) 
            }
        }
    })
});

$("#player2-ready").click(function() {
    game.multiPlayer("Player2");
    $(this).addClass("disabled");

    document.addEventListener("keyup", function(ev) {
        console.log(canvas.toggleEvent)
        if(ev.keyCode === 76 && canvas.rightHandCoords.x === 746 && canvas.toggleEvent) {
            if(game.players["Player2"].attack) {
                canvas.stretchRightHand();
                setTimeout(() => {
                    canvas.restoreRightStretch();
                }, 500)
            } else {
                canvas.retreatRightHand();
                setTimeout(() => {
                    canvas.restoreRightRetreat();
                }, 500)
            }
        }
    })
});
