/*jshint esversion: 6 */

//
// FEND memory game project
// Chuck Huffman - 201800908
//
// game.js
//

// variable declarations

// create card  cell reference
const cards = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'];
// create icon names in a set for ease of use
let icons = ['fontawesome-globe', 'fontawesome-lightbulb', 'fontawesome-music', 'fontawesome-home', 'fontawesome-camera-retro', 'fontawesome-beaker', 'fontawesome-gift', 'fontawesome-key', 'fontawesome-globe', 'fontawesome-lightbulb', 'fontawesome-music', 'fontawesome-home', 'fontawesome-camera-retro', 'fontawesome-beaker', 'fontawesome-gift', 'fontawesome-key'];
let list = {};

// track gameplay markers
let stars = 3;
let moves = 0;
let totalTime = 0;
let matches = 0;
let sec = document.getElementById('time');
let clock = "";

// create slots for card selection
let cardSlotA = "";
let cardIconA = "";
let cardSlotB = "";
let cardIconB = "";

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
// (what a pain to wrap my head around - but I got it!!!)
// this delay is to pause game while cards are red and then set them back to yellow
function noMatch (a,b,c,d) {
    return function(){
        document.getElementById(a).style.cssText = "";
        document.getElementById(b).style.cssText = "";
        document.getElementById(a).classList.remove(c);
        document.getElementById(b).classList.remove(d);
    };
}

// create function to count seconds
function makeTimer() {
    totalTime += 1;
    sec.textContent = totalTime + "s";
}

// when a user clicks a card the listeners run this function
function takeTurn(event) {

    // start timer if this is the user's first click
    if (moves === 0 && cardSlotA === "") {
        clock = setInterval(makeTimer, 1000);
    }

    // is user clicked a card already matched then exit otherwise process
    if (document.getElementById(event.target.id).classList.contains('match')) {
        return;
    }
    else {
        // get card that was clicked
        document.getElementById(event.target.id).classList.add(list[event.target.id]);

        // if user clicked the same card they already clicked in this turn then exit
        if (event.target.id === cardSlotA)  {
            return;
        }

        // if this is the user's first card this turn store card and show onscreen
        if (cardSlotA === "") {
            cardSlotA = (event.target.id);
            cardIconA = list[event.target.id];
            document.getElementById(cardSlotA).style.cssText = "box-shadow: 0 0 0 #c66;  transform: translate(4px, 4px);";

        }
        // if this is the user's second card this turn store card and show onscreen
        else {
            cardSlotB = (event.target.id);
            cardIconB = list[event.target.id];
            document.getElementById(cardSlotB).style.cssText = "box-shadow: 0 0 0 #c66;  transform: translate(4px, 4px);";
        }

        // if card types match then change cell styling to green and set class as 'match'
        // update moves and matches counter
        if (cardIconA === cardIconB) {
            moves += 1;
            matches += 1;
            document.getElementById(cardSlotA).classList.add('match');
            document.getElementById(cardSlotB).classList.add('match');
            document.getElementById(cardSlotA).style.cssText = "background: linear-gradient(to right bottom, #3f3, #090);box-shadow: 0 0 0 #c66;transform: translate(4px, 4px);";
            document.getElementById(cardSlotB).style.cssText = "background: linear-gradient(to right bottom, #3f3, #090);box-shadow: 0 0 0 #c66;transform: translate(4px, 4px);";
            // clear card storage for next turn
            cardSlotA = "";
            cardSlotB = "";
            cardIconA = "";
            cardIconB = "";

            // check for a win if all 8 pairs matched
            // display game ending modal if this is so
            if (matches === 8) {
                gameTime = totalTime;
                // stop timer
                clearInterval(clock);
                // format modal display text with html
                document.getElementById('modalContent').innerHTML = "<p>Congratulations you win!</p><p>It took you " + gameTime + " seconds.<br>You did it in " + moves + " moves and earned a star rating of " + stars + ".</p><p>Click this window to play again!</p>";
                let mod = document.getElementById('theModal');
                // reveal modal
                mod.style.cssText = "display: block;";
                // add listener for click on modal
                mod.addEventListener('click', function() {
                    location.reload();
                }, false);

            }
        }

        // if this is the user's first card then exit further evaluation
        else if (cardSlotB === "") {
            return;
        }

        // if options above are not true then the cards do not match. Act accordingingly.
        else {
            moves += 1;
            document.getElementById(cardSlotA).style.cssText = "background: linear-gradient(to right bottom, #f66, #c00);box-shadow: 0 0 0 #c66;transform: translate(4px, 4px);";
            document.getElementById(cardSlotB).style.cssText = "background: linear-gradient(to right bottom, #f66, #c00);box-shadow: 0 0 0 #c66;transform: translate(4px, 4px);";

            // learned and using delay found here https://stackoverflow.com/a/24953
            // (what a pain to wrap my head around - but I got it!!!)
            setTimeout(noMatch(cardSlotA, cardSlotB, cardIconA, cardIconB), 1000);
            // clear card storage for next turn
            cardSlotA = "";
            cardSlotB = "";
            cardIconA = "";
            cardIconB = "";
        }

        // adjust number of stars shown based on moves taken
        document.getElementById('move').textContent = moves;
        if (moves === 15) {
            stars = 2;
            starCount(stars);
        }
        else if (moves === 20) {
            stars = 1;
            starCount(stars);
        }

    }

}

// randomize cards
shuffle(icons);
