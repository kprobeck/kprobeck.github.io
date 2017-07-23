// sound.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = (function(){
	//console.log("sound.js module loaded");
	var bgAudio = undefined;
	var effectAudio = undefined;
    var splashAudio = undefined;
    var deathAudio = undefined;
    var menuAudio = undefined;
    var selectAudio = undefined;
	var currentEffect = 0;
	var currentDirection = 1;
	var effectSounds = ["sfx_sounds_powerup5.wav","sfx_sounds_powerup6.wav","sfx_sounds_powerup4.wav","sfx_sounds_powerup8.wav","sfx_sounds_powerup3.wav","sfx_sounds_powerup10.wav"];
	

	function init(){
		bgAudio = document.querySelector("#bgAudio");
		bgAudio.volume = 0.15;
		effectAudio = document.querySelector("#effectAudio");
		effectAudio.volume = 0.2;
        splashAudio = document.querySelector("#splashAudio");
        splashAudio.volume = 0.2;
        deathAudio = document.querySelector("#deathAudio");
        deathAudio.volume = 0.2;
        menuAudio = document.querySelector("#menuAudio");
        menuAudio.volume = 0.2;
        selectAudio = document.querySelector("#selectAudio");
        selectAudio.volume = 0.2;
	}
		
	function stopBGAudio(){
		bgAudio.pause();
		bgAudio.currentTime = 0;
	}
  
    function playBGAudio(){
      bgAudio.play();
    }
	
	function playEffect(){
		effectAudio.src = "media/" + effectSounds[currentEffect];
		effectAudio.play();
		currentEffect += currentDirection;
		if (currentEffect == effectSounds.length || currentEffect == -1){
			currentDirection *= -1;
			currentEffect += currentDirection;
		}
	}
  
  function playSplash(){
      splashAudio.play();
  }
  
  function playDeath(){
      deathAudio.play();
  }
  
  function playMenu(){
      menuAudio.play();
  }
  
  function playSelect(){
    selectAudio.play();
  }
		
	return {
      init: init,
      stopBGAudio: stopBGAudio,
      playBGAudio: playBGAudio,
      playEffect: playEffect,
      playSpash: playSplash,
      playDeath: playDeath,
      playMenu: playMenu,
      playSelect: playSelect
    };
}());