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

$("#player1-ready").click(function() {
    game.multiPlayer("Player1")
})

$("#player2-ready").click(function() {
    game.multiPlayer("Player2")
})
