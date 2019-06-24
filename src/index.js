const loadedImages = [];
var hands = [
    {
        name: "black-hand",
        src: "src/images/hand1.png"
    }
]

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
        if(ev.keyCode === 32) {
            game.player1Attack()
        }
    })
});

$("#player1-ready").click(function() {
    game.multiPlayer("Player1");
    console.log($("#player1-ready"))
    $("#player1-ready").addClass("disable");

    document.addEventListener("keyup", function(ev) {
        if(ev.keyCode === 65) {
            canvas.stretchLeftHand()
            setTimeout(() => {
                canvas.restoreLeftStretch()
            }, 500)
        }
    })
});

$("#player2-ready").click(function() {
    game.multiPlayer("Player2");
    // $("#player2-ready").addClass("disable");

    document.addEventListener("keyup", function(ev) {
        if(ev.keyCode === 76) {
            canvas.retreatRightHand();
            setTimeout(() => {
                canvas.restoreRightRetreat();
            }, 500)
        }
    })
});
