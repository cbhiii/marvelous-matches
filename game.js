/*jshint esversion: 6 */

//
// FEND memory game project
// Chuck Huffman - 201800908
//
// game.js
//

// listen for reload game request

//refresh button
// let restartButton = document.querySelector('#redo');
// restartButton.addEventListener('load', function(e){
//
//   window.location.reload(true);
//
// });


document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);
window.addEventListener("load", pageFullyLoaded, false);

function theDomHasLoaded(e) {
    console.log('dom loaded');
}

function pageFullyLoaded(e) {
    console.log('page loaded');
}
