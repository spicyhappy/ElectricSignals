ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.town',
	'impact.timer',
	'game.entities.enemy1',
	'game.entities.child',
	'game.entities.waves'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	instructText: new ig.Font( 'media/04b03.font.png' ),
	lifeSprite: new ig.Image('media/statusLife.gif'),
	statusText: new ig.Font( 'media/04b03.font.png' ),
	statMatte: new ig.Image('media/statusBar.png'),
	enemyTimer: new ig.Timer(),
	pressSomething: false,
	winTime: 20,
	
	gravity: 150,
	
	// Continuously spawn birds
	spawnEnemy: function(time,positionY) {
		var enemy = false;
		if (this.enemyTimer.delta() > time) {
			if (enemy === false) {
				enemy = true;
				ig.game.spawnEntity(EntityEnemy1,180,positionY);
				this.enemyTimer.reset();
			}
		}	
	},	
	// Controls how child follows parent, leaves child after certain distrance
	followParent: function(distance1,distance2,distance3,accel1,accel2) {	
			if (this.player && this.child) {
			var pcDistance = this.child.distanceTo(this.player);
			var follow;
			
			if (pcDistance<distance1) {
				follow = true;
				accelFactor=accel1;
			}
			
			else if (pcDistance>distance1 && pcDistance<distance2) {
				accelFactorFactor=accel2;
			}
			
			else if (pcDistance>distance2) {
				follow = false;
				
			}
			
			
			/* Modified follow script from blog.davidrhayes.com/post/34523414782/platformer-game-prototype */
			if (follow) {
				var currentX = this.child.pos.x;
				var currentY = this.child.pos.y;
				var targetX = this.player.pos.x-12;
				var targetY = this.player.pos.y;
			
				this.child.pos.x = currentX+(targetX - currentX)*accelFactor;
				this.child.pos.y = currentY+(targetY - currentY)*accelFactor;
			}
			
			else {
				this.child.gravityFactor = -0.05;
			}
		}
		},
	// Text and background while dead
	death: function(line1,line2,line3,line4,backgroundImg) {
		var x = ig.system.width/2,
			y = ig.system.height*4/5,
			x1 = 10,
			y1 = 10;
		
		var deathText = new ig.Font( 'media/04b03.font.png' );	
		var deathBackground = new ig.Image('media/'+backgroundImg);
		deathBackground.draw(0,0);
				
		deathText.draw(line1, x1, y1, ig.Font.ALIGN.LEFT);
		deathText.draw(line2, x1, y1+10, ig.Font.ALIGN.LEFT);
		deathText.draw(line3, x1, y1+20, ig.Font.ALIGN.LEFT);
		deathText.draw(line4, x1, y1+30, ig.Font.ALIGN.LEFT);
		deathText.draw('Press enter to start', x, y, ig.Font.ALIGN.CENTER);	
	},

	// Detect if anything is pressed
	anyPress: function () {
		if (ig.input.pressed('left') || ig.input.pressed('right') || ig.input.pressed('down') || ig.input.pressed('jump') || ig.input.pressed('shoot')) {
			this.pressSomething = true;
			return true;
		}
			
		else {
			return false;
		}
	},
	// Remove instructions at the beginning
	removeInstructText: function() { 
			
			if (this.levelTimer.delta() > 6 && this.instructText) {
				this.instructText=null;
			} 
			
			if (this.levelTimer.delta() > 3 && this.instructText) {
				this.player.gravityFactor = 1;
			}
			
			if (this.anyPress() && this.instructText) {
				this.player.gravityFactor = 1;
			}
	},
	
	getNumEnding: function() {
		var numEnding = 0;
		
		for (i=0; i<10; i++) {
			if (ig.global.totalEnding[i] === true) {
				numEnding++;
			}
		}
		
		return numEnding;
	},
	
	init: function() {
	
		this.loadLevel ( LevelTown );
		this.levelTimer = new ig.Timer();
		this.screen.x = 8;	
		this.screen.y = 8;
		
		// Setup keys
		ig.input.bind( ig.KEY.LEFT_ARROW , 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW , 'right' );
		ig.input.bind( ig.KEY.SPACE , 'jump' );
		ig.input.bind( ig.KEY.ENTER , 'enter' );
		
		ig.global.deathSun = false;
		ig.global.deathWater = false;
		ig.global.deathChild = false;
		ig.global.deathPlayer = false;
		
	},
	
	update: function() {
		
		if (!ig.global.totalEnding) {
			ig.global.totalEnding = [false,false,false,false,false,false,false,false,false,false];
		}
		
		console.log(ig.global.totalEnding);
		console.log(this.getNumEnding());
		
		this.player = this.getEntitiesByType( EntityPlayer )[0];
		this.child = this.getEntitiesByType( EntityChild )[0];
		
		// While you are still alive...
		if (ig.global.deathPlayer === false) {
			
			this.removeInstructText();	
			this.spawnEnemy(Math.random()*2+.5,Math.random()*64+32);
			this.followParent(18,50,150,0.13,0.02);
			
			if (this.levelTimer.delta() > this.winTime) {
				
				if (ig.global.deathChild === false && this.player.health === 3) {
					ig.global.totalEnding[0] = true;
					ig.system.setGame(WinPerfect);
					
				}
			
				else if (ig.global.deathChild === true && this.player.health === 3) {
					ig.global.totalEnding[1] = true;
					ig.system.setGame(WinPointless);
				}
				
				else if (ig.global.deathChild === true && this.player.health < 3) {
					ig.global.totalEnding[2] = true;
					ig.system.setGame(WinSad);
				}
				
				else {
					ig.global.totalEnding[3] = true;
					ig.system.setGame(WinNormal);
				}
			}	
		
		}
		
		// When you are dead
		if (ig.global.deathPlayer === true) {			
			if(ig.input.pressed('enter')){
				ig.system.setGame(MyGame);
			}
		}
		
		this.parent();
	
	},
	
	draw: function() {
	
		var player = this.getEntitiesByType( EntityPlayer )[0];
		var child = this.getEntitiesByType( EntityChild )[0];
		
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Control instructions
		if (this.instructText) {
			var x = ig.system.width/2,
				y = ig.system.height*7/8;
			this.instructText.draw('Left/Right Moves, Space Jumps', x, y, ig.Font.ALIGN.CENTER);
		}
		
		if (ig.global.deathPlayer === true) {
			// Death message
			
			if(!this.pressSomething) {
				ig.global.totalEnding[5] = true;
				this.death("LAZY DEATH","I close my eyes,","and everything is just fine.",this.getNumEnding()+"/10 ENDINGS FOUND","screenDeath2.png");
			}
			else if(ig.global.deathPositionY < 28 && ig.global.deathSun) {
				ig.global.totalEnding[6] = true;
				this.death("SUNNY DEATH","The sun is a wondrous body,","like a magnificent father!",this.getNumEnding()+"/10 ENDINGS FOUND","screenDeath2.png");
			}
			
			else if (ig.global.deathPositionY >104 && ig.global.deathWater) {
				ig.global.totalEnding[7] = true;
				this.death("WATERY DEATH","The water dark and deep,","lulls me gently to sleep.",this.getNumEnding()+"/10 ENDINGS FOUND","screenDeath2.png");
			}
			
			else if (child) {
				ig.global.totalEnding[8] = true;
				this.death("HOPEFUL DEATH","Live, on my son,","and dare to dream.",this.getNumEnding()+"/10 ENDINGS FOUND","screenDeath2.png");

			}
			
			else {
				ig.global.totalEnding[9] = true;
				this.death("REGULAR DEATH","Oh cruel fate,","what a tragic hand you deal me!",this.getNumEnding()+"/10 ENDINGS FOUND","screenDeath2.png");
			}
		}
		if (ig.global.deathPlayer === false) {
		// Health
			for (i=0; i<player.health; i++) {
				this.lifeSprite.draw(5+i*10,5);
			}
		}
		
	}
});

AnyScreen = ig.Game.extend({

	line1: "",
	line2: "",
	line3: "",
	line4: "",
	
	backgroundImg: "",
	level: "",
	getNumEnding: function() {
		var numEnding = 0;
		
		for (i=0; i<10; i++) {
			if (ig.global.totalEnding[i] === true) {
				numEnding++;
			}
		}
		
		return numEnding;
	},

	
	win: function(line1, line2, line3, line4, backgroundImg) {
		var x = ig.system.width/2,
			y = ig.system.height*4/5,
			x1 = 10,
			y1 = 24;
		
		var winText = new ig.Font( 'media/04b03.font.png' );
		var winBackground = new ig.Image('media/'+backgroundImg);
		winBackground.draw(0,0);
		winText.draw(this.line1, x1, y1, ig.Font.ALIGN.LEFT);
		winText.draw(this.line2, x1, y1+10, ig.Font.ALIGN.LEFT);
		winText.draw(this.line3, x1, y1+20, ig.Font.ALIGN.LEFT);
		winText.draw(this.line4, x1, y1+30, ig.Font.ALIGN.LEFT);
		winText.draw('Press enter to start', x, y, ig.Font.ALIGN.CENTER);
			
	},
	
	update: function() {				
		if(ig.input.pressed('enter')){
			ig.system.setGame(this.level);
		}
		
		if (ig.global.totalEnding) {
			this.line4 = this.getNumEnding()+"/10 ENDINGS FOUND";
		}
		
		this.parent();
	},
	
	draw: function() {
		this.win(this.line1, this.line2, this.line3, this.line4, this.backgroundImg);
	}
});

StartScreen = ig.Game.extend({
	
	instructText: new ig.Font('media/04b03.font.png'),
	background: new ig.Image('media/screenBG2.gif'),
	
	init: function() {
		ig.input.bind(ig.KEY.ENTER,'enter');
	},
	update: function() {				
		if(ig.input.pressed('enter')){
			ig.system.setGame(StartScreen2);
		}
		this.parent();
	},
	draw: function() {
		this.parent();
		this.background.draw(0,0);
		
		var x = ig.system.width/2,
			y = ig.system.height*4/5;
		
		this.instructText.draw('Press enter to start', x, y, ig.Font.ALIGN.CENTER);

	}
	
});

StartScreen2 = AnyScreen.extend({
	line1: "Follow me closely, son.",
	line2: "Our wings are srong but",
	line3: "fragile and many dangers",
	line4: "lie ahead . . .",
	backgroundImg: "screenBG3.gif",
	level: MyGame,	
});

WinNormal = AnyScreen.extend({

	line1: "NORMAL WIN",
	line2: "Finally, our destination in sight",
	line3: "I breath a sigh of relief.",
	backgroundImg: "screenWin1.png",
	level: MyGame,
});

WinCheap = AnyScreen.extend({

	line1: "CHEAP WIN",
	line2: "Darling it's better",
	line3: "down where it's wetter.",
	backgroundImg: "screenWin1.png",
	level: MyGame,
});

WinPerfect = AnyScreen.extend({
	
	line1: "PERFECT WIN",
	line2: "Everything is well",
	line3: "for I am a genius.",
	backgroundImg: "screenWin1.png",
	level: MyGame,
});

WinPointless = AnyScreen.extend({

	line1: "POINTLESS WIN",
	line2: "What use is a beating heart",
	line3: "when my son lies cold?",
	backgroundImg: "screenWin1.png",
	level: MyGame,
});

WinSad = AnyScreen.extend({

	line1: "SAD WIN",
	line2: "This miserable life",
	line3: "has no happy ending.",
	backgroundImg: "screenWin1.png",
	level: MyGame,
});

// Disable audio for mobile devices
if(ig.ua.mobile){
	ig.Sound.enabled = false;
}

// Start the Game with 60fps, a resolution of 160x120
ig.main( '#canvas', StartScreen, 60, 160, 120, 4 );

});
