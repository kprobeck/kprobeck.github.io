// The myKeys object will be in the global scope - it makes this script 
// really easy to reuse between projects

"use strict";

var app = app || {};



// start IIFE
app.myKeys = function() {
  var myKeys = {};


myKeys.KEYBOARD = Object.freeze({
	"KEY_LEFT": 37, 
	"KEY_UP": 38, 
	"KEY_RIGHT": 39, 
	"KEY_DOWN": 40,
	"KEY_SPACE": 32,
	"KEY_SHIFT": 16,
    "KEY_A": 65,
    "KEY_S": 83,
    "KEY_W": 87,
    "KEY_D": 68,
});

// myKeys.keydown array to keep track of which keys are down
// this is called a "key daemon"
// main.js will "poll" this array every frame
// this works because JS has "sparse arrays" - not every language does
myKeys.keydown = [];


// event listeners
window.addEventListener("keydown",function(e){
	//console.log("keydown=" + e.keyCode);
	myKeys.keydown[e.keyCode] = true;
});
	
window.addEventListener("keyup",function(e){
	//console.log("keyup=" + e.keyCode);
	myKeys.keydown[e.keyCode] = false;
	
	// get character pressed
	var char = String.fromCharCode(e.keyCode);
  
    // pausing and resuming
	if ((char == "p" || char == "P") && app.main.gameState != app.main.GAME_STATE.BEGIN && app.main.gameState != app.main.GAME_STATE.END){
        app.main.sound.playSelect();
		if (app.main.paused){
			app.main.resumeGame();
		} else {
			app.main.pauseGame();
		}
	}
  
    // check for debug toggle
    if ((char == "b" || char == "B") && app.main.gameState == app.main.GAME_STATE.DEFAULT && !app.main.paused){
        app.main.sound.playDeath();
		app.main.toggleDebug();
	}
  
    // toggle game states accordingly
    if (char == " "){
      app.main.sound.playSelect();
      app.main.toggleGameState();
    }
  
    // go to home menu when hitting H on the pause menu
    if ((char == "h" || char == "H") && (app.main.paused || app.main.gameState == app.main.GAME_STATE.CREDITS || app.main.gameState == app.main.GAME_STATE.INSTRUCTIONS))  {
      app.main.sound.playSelect();
      app.main.endTheGame();
      app.main.kennyCreditsX = 0;
    }
  
});
  
  
  return myKeys;
}() // end IIFE