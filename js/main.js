// main.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

/*
 .main is an object literal that is a property of the app global
 This object literal has its own properties and methods (functions)
 
 */
app.main = {
  
    paused: false,
    animationID: 0,
  
	//  properties
    GAME: Object.freeze({
      HEIGHT: 750,
      WIDTH: 1200,
    }),
  
    // player character
    PLAYER: Object.seal({
      xPos: 300,
      yPos: 200,
      playerWidth: 34,
      playerHeight: 52,
      xSpeed: 0,
      ySpeed: 0,
      playerSprite: new Image(34, 52),
      playerHeartEmptySprite: new Image(20, 19),
      playerHeartFilledSprite: new Image(20, 19),
      playerSpriteX: 0,
      playerSpriteY: 0,
      spriteOffsetCounter: 0,
      playerLife: 3,
      maxSpeed: 5,
    }),
  
    canvas: undefined,
    ctx: undefined,
   	lastTime: 0, // used by calculateDeltaTime() 
    debug: false,
  
    // PART E - colors array
  
    sound: undefined, // required - loaded by main.js
  
    // PART F
    levelNumber: 0,
  
    // part D
    gameState: undefined,
    totalScore: 0,
  
FISH: Object.freeze({
	NUM_FISH_START: 5,
	NUM_FISH_END : 50,
	START_RADIUS : 8,
	MAX_SPEED : 80,
}),
  
  // variables for ice holes
ICEHOLES: Object.freeze({
	NUM_HOLES_START: 4,
	START_RADIUS: 35,
    holeWidth: 40,
    holeHeight: 40,
}),
  
    FISH_STATE: Object.freeze({
      NORMAL: 0,
      DONE: 1
    }),
  
  GAME_STATE: Object.freeze({ // another fake enumeration
	BEGIN : 0,
	DEFAULT : 1,
	ROUND_OVER : 2,
	REPEAT_LEVEL : 3,
	END : 4,
    INSTRUCTIONS : 5,
    CREDITS : 6,
}),	
  
    fishes : [],
    iceHoles : [],
    numFishes: this.NUM_FISH_START,
    numIceHoles: 3,
    
    arrowKeysIMG: new Image(200, 200),
    WASDKeysIMG: new Image(200, 200),
    beCarefulIMG: new Image(200, 200),
    
    fishExample: new Image(10, 10),
    fishExampleOffset: 0,
    fishExampleX: 0,
  
    penguinExample: new Image(34, 52),
    penguinExampleOffset: 0,
    penguinExampleX: 0,
  
    penguinSelector: 0,
  
    kennyCredits: new Image(128, 128),
    kennyCreditsOffset: 0,
    kennyCreditsX: 0,
  
    happyPenguin: new Image(200, 200),
    sadPenguin: new Image(200, 200),
    
    
    // methods
	init : function() {
		// console.log("app.main.init() called");
		// initialize properties
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.GAME.WIDTH;
		this.canvas.height = this.GAME.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
      
        this.numFishes = this.FISH.NUM_FISH_START;
        this.fishes = this.makeFish(this.numFishes);
        this.iceHoles = this.makeHoles(this.ICEHOLES.NUM_HOLES_START);
      
        this.gameState = this.GAME_STATE.BEGIN;
      
        // hook up events
        this.canvas.onmousedown = this.doMousedown.bind(this);
        this.canvas.onmousemove = this.doMousemove.bind(this);
      
        // load level
        this.reset();
      
        // load source image for playerSprite
        this.PLAYER.playerSprite.src = "media/spriteSheets/penguin-Sheet.png";
        this.PLAYER.playerHeartFilledSprite.src = "media/spriteSheets/heart-filled.png";
        this.PLAYER.playerHeartEmptySprite.src = "media/spriteSheets/heart-empty.png";
      
        this.WASDKeysIMG.src = "media/spriteSheets/WASDKeys.png";
        this.arrowKeysIMG.src = "media/spriteSheets/arrowKeys.png";
        this.beCarefulIMG.src = "media/spriteSheets/beCareful.png";
        this.fishExample.src = "media/spriteSheets/fish-Sheet.png";
        this.penguinExample.src = "media/spriteSheets/penguin-Sheet.png";
        this.kennyCredits.src = "media/spriteSheets/Kenny-Sheet.png";
        this.happyPenguin.src = "media/spriteSheets/happyPenguin.png";
        this.sadPenguin.src = "media/spriteSheets/sadPenguin.png";
      
        // start playing music
        this.sound.playBGAudio();
      
		// start the game loop
		this.update();
	},
  
    doMousedown: function(e){
      
      var mouse = getMouse(e);
      
      if(this.gameState == this.GAME_STATE.BEGIN) {
        // handle input on the begin screen
        
            var rectPlay = {x: 0, y:555, width: this.GAME.WIDTH, height: 75};
            
            var rectInstruct = {x: 0, y:631, width: this.GAME.WIDTH, height: 75};
            
            var rectCredits = {x: 0, y:713, width: this.GAME.WIDTH, height: 75};
            
            if(rectangleContainsPoint(rectPlay, mouse)) {
              this.gameState = this.GAME_STATE.DEFAULT;
              this.reset;
              this.sound.playSelect();
              return;
            }
        
            if(rectangleContainsPoint(rectInstruct, mouse)) {
              this.gameState = this.GAME_STATE.INSTRUCTIONS;
              this.sound.playSelect();
              return;
            }
        
            if(rectangleContainsPoint(rectCredits, mouse)) {
              this.gameState = this.GAME_STATE.CREDITS;
              this.sound.playSelect();
              return;
            }
        
      }
},
  
  doMousemove: function(e){
      
      var mouse = getMouse(e);
      
      if(this.gameState == this.GAME_STATE.BEGIN) {
        // handle input on the begin screen
        
            var rectPlay = {x: 0, y:555, width: this.GAME.WIDTH, height: 75};
            
            var rectInstruct = {x: 0, y:631, width: this.GAME.WIDTH, height: 75};
            
            var rectCredits = {x: 0, y:713, width: this.GAME.WIDTH, height: 75};
            
            if(rectangleContainsPoint(rectPlay, mouse)) {
              if(this.penguinSelector != 1){
                this.penguinSelector = 1;
                this.sound.playMenu(); 
              }
              return;
            }
        
            else if(rectangleContainsPoint(rectInstruct, mouse)) {
              if(this.penguinSelector != 2){
                this.penguinSelector = 2;
                this.sound.playMenu(); 
              }
              return;
            }
        
            else if(rectangleContainsPoint(rectCredits, mouse)) {
              if(this.penguinSelector != 3){
                this.penguinSelector = 3;
                this.sound.playMenu(); 
              }
              return;
            }
              
            else {
              this.penguinSelector = 0;
              return;
            }
        
      }
},
  
  // toggle debug function, switches debug between true and false
  toggleDebug: function() {
    if(this.debug == true) {this.debug = false;}
    else {this.debug = true;}
  },
  
    // pause game function
    pauseGame: function() {
      this.stopBGAudio();
      
      this.paused = true;
      
      // stop animation loop
      cancelAnimationFrame(this.animationID);
      
      // call update() once so that our paused screen gets drawn
      this.update();
    },
  
    // resume game function
    resumeGame: function() {
      this.sound.playBGAudio();
      
      // stop animation loop, just in case it's running
      cancelAnimationFrame(this.animationID);
      
      this.paused = false;
      
      // restart the loop
      this.update();
    },
  
  // stopBGAudio
  stopBGAudio: function() {
    this.sound.stopBGAudio();
  },
  
  // movePlayer method, moves the player character
  movePlayerHorz(movingRight) {
    
    // move right
    if(movingRight) {
      this.PLAYER.xSpeed += .1;
      if(this.PLAYER.xSpeed > this.PLAYER.maxSpeed) {this.PLAYER.xSpeed = 5;}
    }
    
    // move left
    if(!movingRight) {
      this.PLAYER.xSpeed -= .1;
      if(this.PLAYER.xSpeed < -1 * this.PLAYER.maxSpeed) {this.PLAYER.xSpeed = -5;}
    }
    
  },
  
  movePlayerVert(movingUp) {
    
    // move right
    if(movingUp) {
      this.PLAYER.ySpeed -= .1;
      if(this.PLAYER.ySpeed < -1 * this.PLAYER.maxSpeed) {this.PLAYER.ySpeed = -5;}
    }
    
    // move left
    if(!movingUp) {
      this.PLAYER.ySpeed += .1;
      if(this.PLAYER.ySpeed > this.PLAYER.maxSpeed) {this.PLAYER.ySpeed = 5;}
    }
    
  },
  
  // slows player down if no input, also updates position
  updatePlayerPos(dt) {
    
    // first, check colliding with sides of game board
    if(this.playerHitLeftRight()) {
      this.PLAYER.xSpeed *= -.7;
      this.PLAYER.xPos += this.PLAYER.xSpeed;
    }
    
    if(this.playerHitTopBottom()) {
      this.PLAYER.ySpeed *= -.7;
      this.PLAYER.yPos += this.PLAYER.ySpeed;
    }
    
    // not moving horizontal
        if(!this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_LEFT] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_A] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_RIGHT] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_D]) {
          if(this.PLAYER.xSpeed < 0) {
            this.PLAYER.xSpeed += .04;
          }
          
          if(this.PLAYER.xSpeed > 0) {
            this.PLAYER.xSpeed -= .04;
          }
          
          // just make it 0 to stop moving
          if((this.PLAYER.xSpeed > 0 && this.PLAYER.xSpeed < 0.2) || (this.PLAYER.xSpeed < 0 && this.PLAYER.xSpeed > -0.2)) {
            this.PLAYER.xSpeed = 0;
          }
        }
          // not moving vertical
        if(!this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_UP] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_DOWN] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_W] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_S]) {
          if(this.PLAYER.ySpeed < 0) {
            this.PLAYER.ySpeed += .04;
          }
          
          if(this.PLAYER.ySpeed > 0) {
            this.PLAYER.ySpeed -= .04;
          }
          
          // just make it 0 to stop moving
          if((this.PLAYER.ySpeed > 0 && this.PLAYER.ySpeed < 0.2) || (this.PLAYER.ySpeed < 0 && this.PLAYER.ySpeed > -0.2)) {
            this.PLAYER.ySpeed = 0;
          }
        }
    
    
    this.PLAYER.xPos += this.PLAYER.xSpeed;
    this.PLAYER.yPos += this.PLAYER.ySpeed;
    
  },
  
  // draw the player at the correct position
  drawPlayer(ctx) {
    // draw player
        ctx.save();
        ctx.drawImage(this.PLAYER.playerSprite, this.PLAYER.playerSpriteX, this.PLAYER.playerSpriteY, this.PLAYER.playerWidth, this.PLAYER.playerHeight, this.PLAYER.xPos, this.PLAYER.yPos, this.PLAYER.playerWidth, this.PLAYER.playerHeight);
        ctx.restore();
        // UPDATE WHICH SPRITE TO USE FROM SPRITE SHEET
        if(this.PLAYER.playerSpriteX != 374 && this.PLAYER.spriteOffsetCounter == 5) {
          this.PLAYER.playerSpriteX += 34;
          this.PLAYER.spriteOffsetCounter = 0;
        }
        else if(this.PLAYER.spriteOffsetCounter == 5){
          this.PLAYER.playerSpriteX = 0;
          this.PLAYER.spriteOffsetCounter = 0;
        }
    
      if(this.debug) {
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.PLAYER.xPos, this.PLAYER.yPos, this.PLAYER.playerWidth, this.PLAYER.playerHeight);
      }
  },
  
  
  // checkForLostFish function, see if they should be deleted, if "jumped back in water"
  checkForLostFish: function() {
    for(var i=0;i<this.fishes.length; i++) {
        var fish = this.fishes[i];
      for(var j = 0; j < this.iceHoles.length; j++) {
        var object = this.iceHoles[j];
        if(fish.x - fish.width/2 < object.x - object.width/2 + object.width && 
        fish.x - fish.width/2 + fish.width > object.x - object.width/2 && 
        fish.y - fish.height/2 < object.y - object.height/2 + object.height && 
        fish.y - fish.height/2 + fish.height > object.y - object.height/2){
            //console.log("fish fell!");
            fish.state = this.FISH_STATE.DONE;
			fish.xSpeed = fish.ySpeed = 0;
            this.sound.playSpash();
          
            // give pulsar to fish when they fall thru ice
          var pulsar = new this.Emitter();
          pulsar.red = 0;
          pulsar.green = 0;
          pulsar.blue = 255;
          pulsar.minXspeed = pulsar.minYspeed = -0.25;
          pulsar.maxXspeed = pulsar.maxYspeed = 0.25;
          pulsar.lifetime = 500;
          pulsar.expansionRate = 0.05;
          pulsar.numParticles = 50;
          pulsar.xRange = 1;
          pulsar.yRange = 1;
          pulsar.useCircles = false;
          pulsar.useSquares = true;
          pulsar.createParticles({x:fish.x, y:fish.y});
        
          fish.pulsar = pulsar;
          
          fish.x = fish.y = -100;
                        
        }
      }
    }
  },
  
  // RESET FUNCTION - creates new level of fish and ice holes, reset player position to middle of screen, with 0 speed
  reset: function() {
    this.levelNumber++;
    this.numFishes += 5;
    this.numIceHoles += 2;
    this.levelRequirement = Math.ceil(this.levelRequirement * 1.5);
    this.fishes = this.makeFish(this.numFishes);
    this.iceHoles = this.makeHoles(this.numIceHoles);
    this.PLAYER.xPos = this.GAME.WIDTH/2;
    this.PLAYER.yPos = this.GAME.HEIGHT/2;
    this.PLAYER.xSpeed = this.PLAYER.ySpeed = 0;
  },
  
  // function to check for a state change for certain key presses
  toggleGameState: function() {
    if(this.gameState == this.GAME_STATE.ROUND_OVER) {
        this.gameState = this.GAME_STATE.DEFAULT;
        this.reset();
        return;
      }
    
    if(this.gameState == this.GAME_STATE.CREDITS) {
      this.gameState = this.GAME_STATE.BEGIN;
      this.kennyCreditsX = 0;
      return;
    }
    
    if(this.gameState == this.GAME_STATE.BEGIN) {
        this.gameState = this.GAME_STATE.INSTRUCTIONS;
        return;
    }
    
    if(this.gameState == this.GAME_STATE.INSTRUCTIONS) {
        this.gameState = this.GAME_STATE.DEFAULT;
        return;
    }
      
      // react to restart failed elvel
      if(this.gameState == this.GAME_STATE.REPEAT_LEVEL) {
        this.gameState = this.GAME_STATE.DEFAULT;
        this.roundScore = 0;
        //this.levelRequirement = Math.floor(this.levelRequirement * 1.5);
        this.fishes = this.makeFish(this.numFishes);
        this.iceHoles = this.makeHoles(this.numIceHoles);
        this.PLAYER.xPos = this.GAME.WIDTH/2;
        this.PLAYER.yPos = this.GAME.HEIGHT/2;
        this.PLAYER.xSpeed = this.PLAYER.ySpeed = 0;
        return;
      }
      
      // start game over
      if(this.gameState == this.GAME_STATE.END) {
        this.endTheGame();
      }
  },
  
  // end the game, return to home screen
  endTheGame: function() {
    this.resumeGame();
    this.gameState = this.GAME_STATE.BEGIN;
    this.PLAYER.playerLife = 3;
    this.totalScore = 0;
    this.numFishes = this.FISH.NUM_FISH_START;
    this.numIceHoles = this.ICEHOLES.NUM_HOLES_START - 2;
    this.levelRequirement = 2;
    this.levelNumber = 0;
    this.reset();
    return;
  },
  
  
  // draw HUD
  drawHUD: function(ctx){
		ctx.save(); 
    
        // IN-GAME HUD
      if(this.gameState == this.GAME_STATE.DEFAULT) {
        
        // calc number of fish still available to catch
        var fishLeft = 0;
			for(var i=0;i<this.fishes.length; i++){
				var f = this.fishes[i];
				if(f.state == this.FISH_STATE.NORMAL){
				 fishLeft++;
				}
			}
        
        // get ready for round to start
        
        
        this.fillText(this.ctx, "Level " + this.levelNumber + ": " + fishLeft + ' Fish Remaining', 17, 42, 'bold 16pt "8-BIT-WONDER"', "black");
		this.fillText(this.ctx, "Total Score: " + this.totalScore, this.GAME.WIDTH - 348, 42, 'bold 16pt "8-BIT-WONDER"', "black");
    
		this.fillText(this.ctx, "Level " + this.levelNumber + ": " + fishLeft + ' Fish Remaining', 15, 40, 'bold 16pt "8-BIT-WONDER"', "white");
		this.fillText(this.ctx, "Total Score: " + this.totalScore, this.GAME.WIDTH - 350, 40, 'bold 16pt "8-BIT-WONDER"', "white");
    
        // lives
        this.fillText(this.ctx, "Lives: ", 17, this.GAME.HEIGHT - 18, 'bold 16pt "8-BIT-WONDER"', "black");
        this.fillText(this.ctx, "Lives: ", 15, this.GAME.HEIGHT - 20, 'bold 16pt "8-BIT-WONDER"', "white");
    
        // pause info
        this.fillText(this.ctx, "P - Pause", this.GAME.WIDTH - 207, this.GAME.HEIGHT - 18, 'bold 16pt "8-BIT-WONDER"', "black");
        this.fillText(this.ctx, "P - Pause", this.GAME.WIDTH - 205, this.GAME.HEIGHT - 20, 'bold 16pt "8-BIT-WONDER"', "white");
    
        // draw hearts remaining
        if(this.PLAYER.playerLife >= 1){this.ctx.drawImage(this.PLAYER.playerHeartFilledSprite, 145, this.GAME.HEIGHT - 40);}
        else {this.ctx.drawImage(this.PLAYER.playerHeartEmptySprite, 145, this.GAME.HEIGHT - 40);}
    
        if(this.PLAYER.playerLife >= 2){this.ctx.drawImage(this.PLAYER.playerHeartFilledSprite, 175, this.GAME.HEIGHT - 40);}
        else {this.ctx.drawImage(this.PLAYER.playerHeartEmptySprite, 175, this.GAME.HEIGHT - 40);}
    
        if(this.PLAYER.playerLife >= 3){this.ctx.drawImage(this.PLAYER.playerHeartFilledSprite, 205, this.GAME.HEIGHT - 40);}
        else{this.ctx.drawImage(this.PLAYER.playerHeartEmptySprite, 205, this.GAME.HEIGHT - 40);}
      }
        

		// START SCREEN
		if(this.gameState == this.GAME_STATE.BEGIN){
          
            // BACKGROUND
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
            ctx.save();
            ctx.fillStyle = "#add8e6";
            ctx.fillRect(0,0,this.GAME.WIDTH, this.GAME.HEIGHT);
            ctx.restore();
          
          
          // highlighting penguin
          if(this.penguinSelector === 1) {
            this.ctx.save();
            ctx.drawImage(this.penguinExample, this.penguinExampleX, 0, 34, 52, this.GAME.WIDTH/2 - 120, this.GAME.HEIGHT/2 - 13, 34, 52);
            this.ctx.restore();
          }
          
          else if(this.penguinSelector === 2) {
            this.ctx.save();
            ctx.drawImage(this.penguinExample, this.penguinExampleX, 0, 34, 52, this.GAME.WIDTH/2 - 240, this.GAME.HEIGHT/2 + 68, 34, 52);
            this.ctx.restore();
          }
          
          else if(this.penguinSelector === 3) {
            this.ctx.save();
            ctx.drawImage(this.penguinExample, this.penguinExampleX, 0, 34, 52, this.GAME.WIDTH/2 - 160, this.GAME.HEIGHT/2 + 147, 34, 52);
            this.ctx.restore();
          }
          
          
            this.fillText(this.ctx, "Penguin Glide!", this.GAME.WIDTH/2 + 3, this.GAME.HEIGHT/2 - 107, 'bold 36pt "8-BIT-WONDER"', "black");
            this.fillText(this.ctx, "Penguin Glide!", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 - 110, 'bold 36pt "8-BIT-WONDER"', "yellow");
          
            this.fillText(this.ctx, "A game by Kenneth Probeck", this.GAME.WIDTH/2 + 3, this.GAME.HEIGHT/2 - 47, 'bold 20pt "8-BIT-WONDER"', "black");
            this.fillText(this.ctx, "A game by Kenneth Probeck", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 - 50, 'bold 20pt "8-BIT-WONDER"', "yellow");
          
            this.fillText(this.ctx, "Play", this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 + 22, 'bold 24pt "8-BIT-WONDER"', "black");
			this.fillText(this.ctx, "Play", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 + 20, 'bold 24pt "8-BIT-WONDER"', "white");
          
            this.fillText(this.ctx, "Instructions", this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 + 102, 'bold 24pt "8-BIT-WONDER"', "black");
			this.fillText(this.ctx, "Instructions", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 + 100, 'bold 24pt "8-BIT-WONDER"', "white");
          
            this.fillText(this.ctx, "Credits", this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 + 182, 'bold 24pt "8-BIT-WONDER"', "black");
			this.fillText(this.ctx, "Credits", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 + 180, 'bold 24pt "8-BIT-WONDER"', "white");
          
          // fish border
          for(var i = 10; i < this.GAME.WIDTH; i+=10) {
            ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, i, 20, 10, 10);
            i+=20;
          }
          
          for(var i = 10; i < this.GAME.WIDTH; i+=10) {
            ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, i, this.GAME.HEIGHT - 30, 10, 10);
            i+=20;
          }
          
          
          if(this.fishExampleX != 30 && this.fishExampleOffset == 10) {
          this.fishExampleX += 10;
          this.fishExampleOffset = 0;
        }
        else if(this.fishExampleOffset == 10){
          this.fishExampleX = 0;
          this.fishExampleOffset = 0;
        }
        this.fishExampleOffset++;
          
          
          ctx.save();
            ctx.drawImage(this.penguinExample, this.penguinExampleX, 0, 34, 52, this.GAME.WIDTH/2 - 395, this.GAME.HEIGHT/2 - 130, 34, 52);
            ctx.drawImage(this.penguinExample, this.penguinExampleX, 0, 34, 52, this.GAME.WIDTH/2 + 340, this.GAME.HEIGHT/2 - 130, 34, 52);
            ctx.restore();
            // UPDATE WHICH SPRITE TO USE FROM SPRITE SHEET
            if(this.penguinExampleX != 374 && this.penguinExampleOffset == 5) {
              this.penguinExampleX += 34;
              this.penguinExampleOffset = 0;
            }
          else if(this.penguinExampleOffset == 5){
            this.penguinExampleX = 0;
            this.penguinExampleOffset = 0;
          }
          this.penguinExampleOffset++;
          
		}
    
        // INSTRUCTIONS SCREEN
	    if(this.gameState == this.GAME_STATE.INSTRUCTIONS) {
          ctx.save();
          ctx.fillStyle = 'black';
          ctx.fillRect(0,0,this.GAME.WIDTH, this.GAME.HEIGHT);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          this.fillText(this.ctx, "... INSTRUCTIONS ...", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 - 275, 'bold 40pt "8-BIT-WONDER"', 'white');
          ctx.restore();
          
          this.fillText(this.ctx, "Use WASD or Arrow Keys", 70, 360, 'bold 20pt "8-BIT-WONDER"', 'white');
          ctx.drawImage(this.WASDKeysIMG, 90, 360);
          ctx.drawImage(this.arrowKeysIMG, 390, 360);
          this.fillText(this.ctx, "For Movement", 175, 590, 'bold 20pt "8-BIT-WONDER"', 'white');
          
          this.fillText(this.ctx, "H - Return to Home Menu", 25, this.GAME.HEIGHT - 20, 'bold 16pt "8-BIT-WONDER"', "white");
           
          ctx.save();
          ctx.textAlign = "center";
            this.fillText(this.ctx, "Collect as many", this.GAME.WIDTH/2 - 100, this.GAME.HEIGHT/2 - 160, 'bold 20pt "8-BIT-WONDER"', "white");
            this.fillText(this.ctx, "Fish as you can!", this.GAME.WIDTH/2 - 100, this.GAME.HEIGHT/2 - 120, 'bold 20pt "8-BIT-WONDER"', "white");
          ctx.restore();
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 150, this.GAME.HEIGHT/2 - 160, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 200, this.GAME.HEIGHT/2 - 130, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 175, this.GAME.HEIGHT/2 - 140, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 185, this.GAME.HEIGHT/2 - 165, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 205, this.GAME.HEIGHT/2 - 175, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 165, this.GAME.HEIGHT/2 - 175, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 215, this.GAME.HEIGHT/2 - 155, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 155, this.GAME.HEIGHT/2 - 135, 10, 10);
          
          
          if(this.fishExampleX != 30 && this.fishExampleOffset == 10) {
          this.fishExampleX += 10;
          this.fishExampleOffset = 0;
        }
        else if(this.fishExampleOffset == 10){
          this.fishExampleX = 0;
          this.fishExampleOffset = 0;
        }
        this.fishExampleOffset++;
          
          
          this.fillText(this.ctx, "AVOID HOLES", 805, 360, 'bold 20pt "8-BIT-WONDER"', 'white');
          this.fillText(this.ctx, "IN THE ICE!", 805, 400, 'bold 20pt "8-BIT-WONDER"', 'white');
          ctx.drawImage(this.beCarefulIMG, 850, 400);
          
          ctx.save();
          ctx.textAlign = "center";
          this.fillText(this.ctx, "Press SPACE to Start!", this.GAME.WIDTH/2, this.GAME.HEIGHT - 70, 'bold 24pt "8-BIT-WONDER"', "#32FF32");
          ctx.restore();
        }
    
    
		// ROUND COMPLETE
		if(this.gameState == this.GAME_STATE.ROUND_OVER){
			ctx.save();
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
            this.fillText(this.ctx, "Round Complete!", this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 - 53, 'bold 24pt "8-BIT-WONDER"', "black");
			this.fillText(this.ctx, "Round Complete!", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 - 55, 'bold 24pt "8-BIT-WONDER"', "#32FF32");
            this.fillText(this.ctx, "Press SPACE to continue", this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 + 2, 'bold 24pt "8-BIT-WONDER"', "black");
			this.fillText(this.ctx, "Press SPACE to continue", this.GAME.WIDTH/2, this.GAME.HEIGHT/2, 'bold 24pt "8-BIT-WONDER"', "#32FF32");
          
            this.fillText(this.ctx, "Fish next round: " + (this.numFishes + 5) + " Fish to Collect!", this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 + 62, 'bold 20pt "8-BIT-WONDER"', "black");
			this.fillText(this.ctx, "Fish next round: " + (this.numFishes + 5) + " Fish to Collect!", this.GAME.WIDTH/2 , this.GAME.HEIGHT/2 + 60, 'bold 20pt "8-BIT-WONDER"', "white");
          
          
            ctx.drawImage(this.happyPenguin, this.GAME.WIDTH/2 - 100, this.GAME.HEIGHT - 200);
		} // end if
    
        // ROUND FAIL, RETRY
		if(this.gameState == this.GAME_STATE.REPEAT_LEVEL){
			ctx.save();
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
            this.fillText(this.ctx, "Round Failed...", this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 - 53, 'bold 24pt "8-BIT-WONDER"', "black");
			this.fillText(this.ctx, "Round Failed...", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 - 55, 'bold 24pt "8-BIT-WONDER"', "red");
            this.fillText(this.ctx, "Press SPACE to retry", this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 + 2, 'bold 24pt "8-BIT-WONDER"', "black");
			this.fillText(this.ctx, "Press SPACE to retry", this.GAME.WIDTH/2, this.GAME.HEIGHT/2, 'bold 24pt "8-BIT-WONDER"', "red");
            
            this.fillText(this.ctx, "Lives Remaining: " + this.PLAYER.playerLife, this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 + 62, 'bold 20pt "8-BIT-WONDER"', "black");
			this.fillText(this.ctx, "Lives Remaining: " + this.PLAYER.playerLife, this.GAME.WIDTH/2 , this.GAME.HEIGHT/2 + 60, 'bold 20pt "8-BIT-WONDER"', "white");
          
            ctx.drawImage(this.sadPenguin, this.GAME.WIDTH/2 - 100, this.GAME.HEIGHT - 200);
		} // end if
    
        // GAME OVER SCREEN!
        if(this.gameState == this.GAME_STATE.END){
			ctx.save();
            ctx.fillStyle = 'grey';
            ctx.fillRect(0,0,this.GAME.WIDTH, this.GAME.HEIGHT);
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
            this.fillText(this.ctx, "GAME OVER", this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 - 58, 'bold 50pt "8-BIT-WONDER"', "black");
			this.fillText(this.ctx, "GAME OVER", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 - 60, 'bold 50pt "8-BIT-WONDER"', "white");
          
            this.fillText(this.ctx, "Your total score was: " + (this.totalScore), this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 + 22, 'bold 24pt "8-BIT-WONDER"', "black");
            this.fillText(this.ctx, "Your total score was: " + (this.totalScore), this.GAME.WIDTH/2, this.GAME.HEIGHT/2 + 20, 'bold 24pt "8-BIT-WONDER"', "white");
          
            this.fillText(this.ctx, "Press SPACE to Return to Menu", this.GAME.WIDTH/2 + 2, this.GAME.HEIGHT/2 + 87, 'bold 20pt "8-BIT-WONDER"', "black");
			this.fillText(this.ctx, "Press SPACE to Return to Menu", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 + 85, 'bold 20pt "8-BIT-WONDER"', "white");
		} // end if
    
        // CREDITS
        if(this.gameState == this.GAME_STATE.CREDITS) {
          ctx.save();
          ctx.fillStyle = 'black';
          ctx.fillRect(0,0,this.GAME.WIDTH, this.GAME.HEIGHT);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          this.fillText(this.ctx, "... CREDITS ...", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 - 275, 'bold 40pt "8-BIT-WONDER"', 'white');
          ctx.restore();
          
          ctx.save();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          this.fillText(this.ctx, "Music:", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 - 20, 'bold 20pt "8-BIT-WONDER"', 'white');
          this.fillText(this.ctx, "Cool, Cool Mountain 8 Bit", this.GAME.WIDTH/2, 400, 'bold 20pt "8-BIT-WONDER"', 'white');
          this.fillText(this.ctx, "by Bulby", this.GAME.WIDTH/2, 440, 'bold 20pt "8-BIT-WONDER"', 'white');
          
            this.fillText(this.ctx, "This game was developed", this.GAME.WIDTH/2 - 100, this.GAME.HEIGHT/2 - 160, 'bold 20pt "8-BIT-WONDER"', "white");
            this.fillText(this.ctx, "by Kenneth Probeck", this.GAME.WIDTH/2 - 100, this.GAME.HEIGHT/2 - 120, 'bold 20pt "8-BIT-WONDER"', "white");
          ctx.restore();
          ctx.drawImage(this.kennyCredits, this.kennyCreditsX, 0, 128, 128, this.GAME.WIDTH/2 + 230 - this.kennyCreditsX / 35, this.GAME.HEIGHT/2 - 200, 128, 128);
          
          if(this.kennyCreditsX < 1920) {
          
          if(this.kennyCreditsOffset == 5) {
          this.kennyCreditsX += 128;
          this.kennyCreditsOffset = 0;
        }
        else if(this.kennyCreditsOffset == 5){
          this.kennyCreditsX = 0;
          this.kennyCreditsOffset = 0;
        }
        
          this.kennyCreditsOffset++;
        }
          
          this.fillText(this.ctx, "H - Return to Home Menu", 25, this.GAME.HEIGHT - 20, 'bold 16pt "8-BIT-WONDER"', "white");
          
          ctx.save();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          this.fillText(this.ctx, "Sound Effects:", this.GAME.WIDTH/2, 520, 'bold 20pt "8-BIT-WONDER"', 'white');
          this.fillText(this.ctx, "512 Sound Effects (8-Bit Style)", this.GAME.WIDTH/2, 560, 'bold 20pt "8-BIT-WONDER"', 'white');
          this.fillText(this.ctx, "by Juhani Junkala", this.GAME.WIDTH/2, 600, 'bold 20pt "8-BIT-WONDER"', 'white');

          ctx.restore();
        }
    
		
		ctx.restore();
	},
  
    // drawPauseScreen function
    drawPauseScreen: function(ctx) {
      ctx.save();
      ctx.fillStyle = 'black';
      ctx.fillRect(0,0,this.GAME.WIDTH, this.GAME.HEIGHT);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      this.fillText(this.ctx, "... PAUSED ...", this.GAME.WIDTH/2, this.GAME.HEIGHT/2 - 275, 'bold 40pt "8-BIT-WONDER"', 'white');
      ctx.restore();
      // unpause info
      this.fillText(this.ctx, "P - Resume", this.GAME.WIDTH - 235, this.GAME.HEIGHT - 20, 'bold 16pt "8-BIT-WONDER"', "white");
      this.fillText(this.ctx, "H - Return to Home Menu", 25, this.GAME.HEIGHT - 20, 'bold 16pt "8-BIT-WONDER"', "white");
      
      this.fillText(this.ctx, "Use WASD or Arrow Keys", 70, 360, 'bold 20pt "8-BIT-WONDER"', 'white');
          ctx.drawImage(this.WASDKeysIMG, 90, 360);
          ctx.drawImage(this.arrowKeysIMG, 390, 360);
          this.fillText(this.ctx, "For Movement", 175, 590, 'bold 20pt "8-BIT-WONDER"', 'white');
           
          ctx.save();
          ctx.textAlign = "center";
            this.fillText(this.ctx, "Collect as many", this.GAME.WIDTH/2 - 100, this.GAME.HEIGHT/2 - 160, 'bold 20pt "8-BIT-WONDER"', "white");
            this.fillText(this.ctx, "Fish as you can!", this.GAME.WIDTH/2 - 100, this.GAME.HEIGHT/2 - 120, 'bold 20pt "8-BIT-WONDER"', "white");
          ctx.restore();
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 150, this.GAME.HEIGHT/2 - 160, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 200, this.GAME.HEIGHT/2 - 130, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 175, this.GAME.HEIGHT/2 - 140, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 185, this.GAME.HEIGHT/2 - 165, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 205, this.GAME.HEIGHT/2 - 175, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 165, this.GAME.HEIGHT/2 - 175, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 215, this.GAME.HEIGHT/2 - 155, 10, 10);
          ctx.drawImage(this.fishExample, this.fishExampleX, 0, 10, 10, this.GAME.WIDTH/2 + 155, this.GAME.HEIGHT/2 - 135, 10, 10);
          
          
          if(this.fishExampleX != 30 && this.fishExampleOffset == 10) {
          this.fishExampleX += 10;
          this.fishExampleOffset = 0;
        }
        else if(this.fishExampleOffset == 10){
          this.fishExampleX = 0;
          this.fishExampleOffset = 0;
        }
        this.fishExampleOffset++;
          
          
          this.fillText(this.ctx, "AVOID HOLES", 805, 360, 'bold 20pt "8-BIT-WONDER"', 'white');
          this.fillText(this.ctx, "IN THE ICE!", 805, 400, 'bold 20pt "8-BIT-WONDER"', 'white');
          ctx.drawImage(this.beCarefulIMG, 850, 400);
    },
  
  
    circleHitLeftRight: function(c) {
      if(c.x < c.radius || c.x > this.GAME.WIDTH - c.radius) {
        return true;
      }
    },
  
    circleHitTopBottom: function(c) {
      if(c.y < c.radius || c.y > this.GAME.HEIGHT - c.radius) {
        return true;
      }
    },
  
    playerHitLeftRight: function() {
      if(this.PLAYER.xPos <= 0 || this.PLAYER.xPos + this.PLAYER.playerWidth >= this.GAME.WIDTH) {
        return true;
      }
      return false;
    },
  
    playerHitTopBottom: function() {
      if(this.PLAYER.yPos <= 0 || this.PLAYER.yPos + this.PLAYER.playerHeight >= this.GAME.HEIGHT) {
        return true;
      }
      return false;
    },
  
    // function to detect collisions with player, take object to detect collisions, ONLY FOR FISH
  detectCollisionsWithPlayer: function(object) {
    if((this.PLAYER.xPos < object.x - object.width/2 + object.width && 
        this.PLAYER.xPos + this.PLAYER.playerWidth > object.x - object.width/2 && 
        this.PLAYER.yPos < object.y - object.height/2 + object.height && 
        this.PLAYER.yPos + this.PLAYER.playerHeight > object.y - object.height/2)) {
        object.state = this.FISH_STATE.DONE;
		    object.xSpeed = object.ySpeed = 0;
            object.x = object.y = -100;
            this.totalScore++;
            this.sound.playEffect();
    }
    
    // round over?
			var isOver = true;
			for(var i=0;i<this.fishes.length; i++){
				var c = this.fishes[i];
				if(c.state == this.FISH_STATE.NORMAL){
				 isOver = false;
				 break;
				}
			} // end for
		
			if(isOver && (this.gameState == this.GAME_STATE.DEFAULT || this.gameState == this.GAME_STATE.BEGIN)){
				
              this.gameState = this.GAME_STATE.ROUND_OVER;
              
                // LAST LEVEL, END THE GAME
                if(this.numFishes == this.FISH.NUM_FISH_END)
                {
                  this.gameState = this.GAME_STATE.END;
                }
			 }
  },
  
  // function to detect if penguin fell in ice hole - TODO
  detectFallingPlayer: function(iceHole) {
    
    if(this.PLAYER.xPos < (iceHole.x - iceHole.width/2) + iceHole.width && 
        this.PLAYER.xPos + this.PLAYER.playerWidth > (iceHole.x - iceHole.width/2) && 
        this.PLAYER.yPos < (iceHole.y - iceHole.height/2) + iceHole.height && 
        this.PLAYER.yPos + this.PLAYER.playerHeight > (iceHole.y - iceHole.height/2)) {
        this.gameState = this.GAME_STATE.REPEAT_LEVEL;
        this.PLAYER.xPos = 9999;
        this.PLAYER.yPos = 9999;
        this.PLAYER.playerLife--;
        // check if player is out of lives
        if(this.PLAYER.playerLife <= 0) {this.gameState = this.GAME_STATE.END;}
        this.sound.playDeath();
        return true;
    }
    
    return false;
    
  },
  
  
    drawFish: function(ctx) {
      if(this.gameState == this.GAME_STATE.ROUND_OVER || this.gameState == this.GAME_STATE.END || this.gameState == this.GAME_STATE.REPEAT_LEVEL) {this.ctx.globalAlpha = 0.25;}
      for(var i = 0; i < this.fishes.length; i++) {
        var f = this.fishes[i];
        if(f.state === this.FISH_STATE.DONE) {
          if(f.pulsar) f.pulsar.updateAndDraw(ctx, {x:f.x, y:f.y});
          continue;
          
        }
        ctx.drawImage(f.fishSprite, f.fishSpriteX, f.fishSpriteY, f.width, f.height, f.x - f.width/2, f.y - f.width/2, f.width, f.height);
        // UPDATE WHICH SPRITE TO USE FROM SPRITE SHEET
        if(f.fishSpriteX != 30 && f.fishSpriteOffsetCounter == 5) {
          f.fishSpriteX += 10;
          f.fishSpriteOffsetCounter = 0;
        }
        else if(f.fishSpriteOffsetCounter == 5){
          f.fishSpriteX = 0;
          f.fishSpriteOffsetCounter = 0;
        }
    f.fishSpriteOffsetCounter++;
        
        if(this.debug) {
          //c.draw(ctx);
          ctx.save();
          ctx.strokeStyle = "red";
          ctx.lineWidth = 1;
          ctx.strokeRect(f.x - f.width/2, f.y - f.height/2, f.width, f.height);
          ctx.restore();
        }
      }
    },
  
    moveFish: function(dt){
		for(var i=0;i<this.fishes.length; i++){
			var c = this.fishes[i];
			if(c.state === this.FISH_STATE.DONE) continue;
		
			// move fish
			c.move(dt);
		
			// did fish leave screen?
			if(this.circleHitLeftRight(c)) {
              c.xSpeed *= -1;
              c.move(dt);
            }
 			if(this.circleHitTopBottom(c)) {
              c.ySpeed *= -1;
              c.move(dt);
            }
	
		} // end for loop
	},
  
    makeFish: function(num) {
      //  "method" to move fish
      var fishMove = function(dt) {
        this.x += this.xSpeed * this.speed * dt;
        this.y += this.ySpeed * this.speed * dt;
      };
      
      
      // "method" to draw fish
      
      
      
      
      var array = [];
      debugger;
      for(var i = 0; i < num; i++) {
        var c = {};
        
        
        // minimum of start radius
        // GetRandom() is from utilities.js
        c.x = getRandom(this.FISH.START_RADIUS, this.GAME.WIDTH - this.FISH.START_RADIUS * 2);
        c.y = getRandom(this.FISH.START_RADIUS, this.GAME.HEIGHT - this.FISH.START_RADIUS * 2);
        
        
        
        // add radius
        c.radius = this.FISH.START_RADIUS;
        
        c.width = 10;
        c.height = 10;
        
        c.fishSprite = new Image(10, 10);
        c.fishSprite.src = "media/spriteSheets/fish-Sheet.png";
        c.fishSpriteX = 0;
        c.fishSpriteY = 0;
        c.fishSpriteOffsetCounter = 5 * Math.floor(Math.random() * 2);
        
        // from utilities.js
        var randomVector = getRandomUnitVector();
        c.xSpeed = randomVector.x;
        c.ySpeed = randomVector.y;
        
        // make more properties
        c.speed = this.FISH.MAX_SPEED;
        c.fillStyle = 'green';
        c.state = this.FISH_STATE.NORMAL;
        c.lifetime = 0;
  
        c.move = fishMove;
        
        array.push(c);
      }
      return array;
    },
  
  // similar to make fish, but not as many properties
    makeHoles: function(num) {
      
      var array = [];
      debugger;
      for(var i = 0; i < num; i++) {
        var c = {};
        
        // minimum of start radius
        // GetRandom() is from utilities.js
        c.x = getRandom(this.ICEHOLES.START_RADIUS * 2, this.GAME.WIDTH - this.ICEHOLES.START_RADIUS);
        while(c.x > this.GAME.WIDTH/2 - this.ICEHOLES.START_RADIUS * 2 && c.x < this.GAME.WIDTH/2 + this.ICEHOLES.START_RADIUS * 2){
          c.x = getRandom(this.ICEHOLES.START_RADIUS * 2, this.GAME.WIDTH - this.ICEHOLES.START_RADIUS);
        }
        c.y = getRandom(this.ICEHOLES.START_RADIUS * 2, this.GAME.HEIGHT - this.ICEHOLES.START_RADIUS);
        while(c.y > this.GAME.HEIGHT/2 - this.ICEHOLES.START_RADIUS * 2 && c.x < this.GAME.HEIGHT/2 + this.ICEHOLES.START_RADIUS * 2){
          c.y = getRandom(this.ICEHOLES.START_RADIUS * 2, this.GAME.HEIGHT - this.ICEHOLES.START_RADIUS);
        }
        
        // add radius
        c.radius = this.ICEHOLES.START_RADIUS;
        
        c.width = this.ICEHOLES.holeWidth;
        c.height = this.ICEHOLES.holeHeight;
        
        // add image
        c.holeSprite = new Image(70, 70);
        c.holeSprite.src = "media/spriteSheets/iceHole-Sheet.png";
        
        // make more properties
        Object.seal(c);
        array.push(c);
      }
      return array;
    },
  
	update: function(){
		// 1) LOOP
		// schedule a call to update()
	 	this.animationID = requestAnimationFrame(this.update.bind(this));
	 	
	 	// 2) PAUSED?
	 	// if so, bail out of loop
        if(this.paused) {
          this.drawPauseScreen(this.ctx);
          return;
        }
	 	
	 	// 3) HOW MUCH TIME HAS GONE BY?
	 	var dt = this.calculateDeltaTime();
      
      
        
	 	
		// 5) DRAW	
		// i) draw background
		this.ctx.fillStyle = "#add8e6"; 
		this.ctx.fillRect(0,0, this.GAME.WIDTH, this.GAME.HEIGHT);
	
      // only draw and do game aspects if in the default game state
      if(this.gameState == this.GAME_STATE.DEFAULT) {
        
        // move fish
        this.moveFish(dt);
        
        // delete circle (fish) if collided with and add to score
      
        var allFishGone = true;
      
        for(var i = 0; i < this.fishes.length; i++) {
          this.detectCollisionsWithPlayer(this.fishes[i]);
          }
      
        for(var i = 0; i < this.iceHoles.length; i++) {
          if(this.detectFallingPlayer(this.iceHoles[i])) {break;}
          }
      
        // get rid of fish that fall back into water
        this.checkForLostFish();
      
        // draw holes in ice
      for(var i = 0; i < this.iceHoles.length; i++) {
        this.ctx.save();
        this.ctx.drawImage(this.iceHoles[i].holeSprite, this.iceHoles[i].x - this.iceHoles[i].width*7/8, this.iceHoles[i].y - this.iceHoles[i].height*7/8);
        this.ctx.restore();
      }
        
        // ii) draw fish
        this.drawFish(this.ctx);
		
		// iii) draw debug info
		if (this.debug){
			// draw dt in bottom right corner
			this.fillText(this.ctx, "dt: " + dt.toFixed(3), this.GAME.WIDTH/2 - 252, this.GAME.HEIGHT - 18, '16pt "8-BIT-WONDER"', "black"); 
            this.fillText(this.ctx, "dt: " + dt.toFixed(3), this.GAME.WIDTH/2 - 250, this.GAME.HEIGHT - 20, '16pt "8-BIT-WONDER"', "white"); 
          
            // draw debug of collision square for ice holes
            for(var i = 0; i < this.iceHoles.length; i++) {
              this.ctx.save();
              this.ctx.strokeStyle = 'red';
              this.ctx.strokeRect(this.iceHoles[i].x - this.iceHoles[i].width/2, this.iceHoles[i].y - this.iceHoles[i].height/2, this.iceHoles[i].width, this.iceHoles[i].height);
            }
		}
      
      
        // MOVE AND DRAW PLAYER CHARACTER
        if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_RIGHT] || this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_D]) {
             this.movePlayerHorz(true);
        }
      
        if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_LEFT] || this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_A]) {
             this.movePlayerHorz(false);
        }
      
        if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_UP] || this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_W]) {
             this.movePlayerVert(true);
        }
      
        if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_DOWN] || this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_S]) {
             this.movePlayerVert(false);
        }
      
        // change sprite offset if any key is down
        if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_RIGHT] || this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_D] || this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_LEFT] || this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_A] || this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_UP] || this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_W] || this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_DOWN] || this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_S]) {
          this.PLAYER.spriteOffsetCounter++;
        }
      
        // set sprite back to normal when not moving, or at least no input
      if(!this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_LEFT] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_A] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_RIGHT] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_D] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_UP] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_DOWN] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_W] && !this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_S]) {
        this.PLAYER.spriteOffsetCounter = 0;
        this.PLAYER.playerSpriteX= 0;
      }
      
          
      
        // slow down the player if nothing being clicked, and move accordingly
        this.updatePlayerPos(dt);
        this.drawPlayer(this.ctx);
        
      
        // 6) CHECK FOR CHEATS
        // if we are on the start screen or a round over screen
        if(this.gameState == this.GAME_STATE.BEGIN || this.gameState == this.GAME_STATE.ROUND_OVER){
          // if the shift key and up arrow are both down (true)
          if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_UP] && this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_SHIFT] ) {
            this.totalScore++;
            this.sound.playEffect();
          }
        }
      }
      
      // iv) draw HUD
		this.ctx.globalAlpha = 1.0;
        this.drawHUD(this.ctx);
		
	},
	
	fillText: function(ctx, string, x, y, css, color) {
		ctx.save();
		// https://developer.mozilla.org/en-US/docs/Web/CSS/font
		ctx.font = css;
		ctx.fillStyle = color;
		ctx.fillText(string, x, y);
		ctx.restore();
	},
	
	calculateDeltaTime: function(){
		var now,fps;
		now = performance.now(); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	}
	
    
    
}; // end app.main