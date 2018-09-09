/*jshint esversion: 6 */

//
// FEND memory game project
// Chuck Huffman - 201800908
//
// game.js
//

// variable declarations

// create cards
const cards = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'];
let icons = ['fontawesome-globe', 'fontawesome-lightbulb', 'fontawesome-music', 'fontawesome-home', 'fontawesome-camera-retro', 'fontawesome-beaker', 'fontawesome-gift', 'fontawesome-key', 'fontawesome-globe', 'fontawesome-lightbulb', 'fontawesome-music', 'fontawesome-home', 'fontawesome-camera-retro', 'fontawesome-beaker', 'fontawesome-gift', 'fontawesome-key'];
let stars = 3;
let moves = 0;
let cardSlotA = "";
let cardIconA = "";
let cardSlotB = "";
let cardIconB = "";
let totalTime = 0;
let list = {};
let matches = 0;
let sec = document.getElementById('time');
let clock = "";


// function declarations

// init star count and display function
function starCount (s) {
    s2 = document.getElementById('star2');
    s3 = document.getElementById('star3');

    if (s < 3) {
        document.getElementById("star3").classList.add('fontawesome-star-empty');
        document.getElementById("star3").classList.remove('fontawesome-star');
    }

    if (s < 2) {
        document.getElementById("star2").classList.add('fontawesome-star-empty');
        document.getElementById("star2").classList.remove('fontawesome-star');
    }
}


// init restart option
const redo = document.getElementById('redo');
redo.addEventListener('click', function() {
    location.reload();
}, false);


// randomization of cards - from https://stackoverflow.com/a/2450976
// plus additional code to create object list
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  for(let i=0; i < array.length; i += 1) {
    list[cards[i]] = icons[i];
  }

}


// init event listeners on table cells (cards)
cards.forEach(function(crd) {
    document.getElementById(crd).addEventListener('click', takeTurn);
});


// learned and using delay found here https://stackoverflow.com/a/24953
// (what a pain to wrap my head around - but I got!!!)
function noMatch (a,b,c,d) {
    return function(){
        document.getElementById(a).style.cssText = "";
        document.getElementById(b).style.cssText = "";
        document.getElementById(a).classList.remove(c);
        document.getElementById(b).classList.remove(d);
    };
}


function makeTimer() {
    totalTime += 1;
    sec.textContent = totalTime + "s";
}


function takeTurn(event) {

    if (document.getElementById(event.target.id).classList.contains('match')) {
        return;
    }
    else {
        document.getElementById(event.target.id).classList.add(list[event.target.id]);

        if (event.target.id === cardSlotA)  {
            return;
        }

        if (cardSlotA === "") {
            cardSlotA = (event.target.id);
            cardIconA = list[event.target.id];
            document.getElementById(cardSlotA).style.cssText = "box-shadow: 0 0 0 #c66;  transform: translate(4px, 4px);";

        }
        else {
            cardSlotB = (event.target.id);
            cardIconB = list[event.target.id];
            document.getElementById(cardSlotB).style.cssText = "box-shadow: 0 0 0 #c66;  transform: translate(4px, 4px);";
        }

        if (cardIconA === cardIconB) {
            moves += 1;
            matches += 1;
            document.getElementById(cardSlotA).classList.add('match');
            document.getElementById(cardSlotB).classList.add('match');
            document.getElementById(cardSlotA).style.cssText = "background: linear-gradient(to right bottom, #3f3, #090);box-shadow: 0 0 0 #c66;transform: translate(4px, 4px);";
            document.getElementById(cardSlotB).style.cssText = "background: linear-gradient(to right bottom, #3f3, #090);box-shadow: 0 0 0 #c66;transform: translate(4px, 4px);";
            cardSlotA = "";
            cardSlotB = "";
            cardIconA = "";
            cardIconB = "";

            // check for win if all 8 pairs guessed
            // display status modal if so
            if (matches === 8) {
                gameTime = totalTime;
                clearInterval(clock);
                document.getElementById('modalContent').innerHTML = "<p>Congratualtions you win!</p><p>It took you " + gameTime + " seconds.<br>You did it in " + moves + " moves and earned a star rating of " + stars + ".</p><p>Would you like to play again?</p>";
                let mod = document.getElementById('theModal');
                mod.style.cssText = "display: block;";
                mod.addEventListener('click', function() {
                    location.reload();
                }, false);

            }
        }

        else if (cardSlotB === "") {
            return;
        }

        else {
            moves += 1;
            document.getElementById(cardSlotA).style.cssText = "background: linear-gradient(to right bottom, #f66, #c00);box-shadow: 0 0 0 #c66;transform: translate(4px, 4px);";
            document.getElementById(cardSlotB).style.cssText = "background: linear-gradient(to right bottom, #f66, #c00);box-shadow: 0 0 0 #c66;transform: translate(4px, 4px);";

            // learned and using delay found here https://stackoverflow.com/a/24953
            // (what a pain to wrap my head around - but I got!!!)
            setTimeout(noMatch(cardSlotA, cardSlotB, cardIconA, cardIconB), 1000);

            cardSlotA = "";
            cardSlotB = "";
            cardIconA = "";
            cardIconB = "";
        }

        document.getElementById('move').textContent = moves;
        if (moves === 15) {
            stars = 2;
            starCount(stars);
        }
        else if (moves === 20) {
            stars = 1;
            starCount(stars);
        }

        if (moves === 1) {
            clock = setInterval(makeTimer, 1000);
        }

    }

}

// randomize cards
shuffle(icons);

// print list of card values
console.log(list);
