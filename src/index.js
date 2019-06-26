const loadedImages = [];
var hands = [
    {
        name: "black-hand",
        src: "src/images/hand1.png"
    }
]

const sadFace = new Image();
sadFace.src = "src/images/sad-face.png";

const bracelet = new Image();
bracelet.src = "src/images/bracelet.png";

const slapEffect = new Audio('src/slap.mp3');

const canvas = new Canvas();
const game = new Game(hands)

window.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

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
        if(ev.keyCode === 32 && canvas.leftHandCoords.x === 620 && canvas.toggleEvent && (game.players["Player2"].lives > 0) && (!canvas.lockLeftHand)) {
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
        if(ev.keyCode === 65 && canvas.leftHandCoords.x === 620 && canvas.toggleEvent && (game.players["Player2"].lives > 0) && (!canvas.lockLeftHand)) {
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
        if(ev.keyCode === 76 && canvas.rightHandCoords.x === 746 && canvas.toggleEvent && (game.players["Player1"].lives > 0) && (!canvas.lockRightHand)) {
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

function removeAddsLoader() {
    setTimeout(() => {
        $(".loader").addClass("hide");
        $(".h4-loader").removeClass("hide");
    }, 3000)
}
