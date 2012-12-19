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
	death: function(line1,line2,backgroundImg) {
		var x = ig.system.width/2,
			y = ig.system.height*3/4,
			x1 = 10,
			y1 = 24;
		
		var deathText = new ig.Font( 'media/04b03.font.png' );	
		var deathBackground = new ig.Image('media/'+backgroundImg);
		deathBackground.draw(0,0);
				
		deathText.draw(line1, x1, y1, ig.Font.ALIGN.LEFT);
		deathText.draw(line2, x1, y1+10, ig.Font.ALIGN.LEFT);
		deathText.draw('Press enter to replay', x, y, ig.Font.ALIGN.CENTER);	
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
				if (this.levelTimer.delta() > 3 && this.instructText) {
				this.player.gravityFactor = 1;
				this.instructText=null;
			}
			
			if (this.anyPress() && this.instructText) {
				this.player.gravityFactor = 1;
				this.instructText=null;
			}
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
	
		this.player = this.getEntitiesByType( EntityPlayer )[0];
		this.child = this.getEntitiesByType( EntityChild )[0];
		
		// While you are still alive...
		if (ig.global.deathPlayer === false) {
			
			this.removeInstructText();	
			this.spawnEnemy(Math.random()*2+.5,Math.random()*64+32);
			this.followParent(30,100,0.2,0.05);
			
			if (this.levelTimer.delta() > 20) {
				ig.system.setGame(WinState1);
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
				this.death("I close my eyes,","and everything is just fine.","screenDeath1.png");
			}
			else if(ig.global.deathPositionY < 28 && ig.global.deathSun) {
				this.death("The sun is a wondrous body,","like a magnificent father!","screenDeath1.png");
			}
			
			else if (ig.global.deathPositionY >104 && ig.global.deathWater) {
				this.death("The water dark and deep,","lulls me gently to sleep.","screenDeath1.png");
			}
			
			else if (child) {
				this.death("Live, on my son,","and dare to dream.","screenDeath1.png");

			}
			
			else {
				this.death("Oh cruel fate,","what a tragic hand you deal me!","screenDeath1.png");
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
			y = ig.system.height*3/4;
		
		this.instructText.draw('Press enter to start', x, y, ig.Font.ALIGN.CENTER);

	}
	
});

StartScreen2 = ig.Game.extend({
	
	instructText: new ig.Font('media/04b03.font.png'),
	storyText: new ig.Font('media/04b03.font.png'),
	background: new ig.Image('media/screenBG.gif'),
	
	init: function() {
		ig.input.bind(ig.KEY.ENTER,'enter');
	},
	update: function() {				
		if(ig.input.pressed('enter')){
			ig.system.setGame(MyGame);
		}
		this.parent();
	},
	draw: function() {
		this.parent();
		this.background.draw(0,0);
		
		var x = ig.system.width/2,
			y = ig.system.height*3/4,
			x1 = 20,
			y1 = 24;
		
		this.storyText.draw("Follow me closely, son.", x1, y1, ig.Font.ALIGN.LEFT);
		this.storyText.draw("Our wings are strong but", x1, y1+10, ig.Font.ALIGN.LEFT);
		this.storyText.draw("fragile and many dangers", x1, y1+20, ig.Font.ALIGN.LEFT);
		this.storyText.draw("lie ahead . . .", x1, y1+30, ig.Font.ALIGN.LEFT);
		this.instructText.draw('Press enter to continue', x, y, ig.Font.ALIGN.CENTER);

	}
	
});

WinState1 = ig.Game.extend({

	line1: "Finally, our destination in sight",
	line2: "I breath a sigh of relief.",
	backgroundImg: "screenWin1.png",
	
	win: function(line1, line2, backgroundImg) {
		var x = ig.system.width/2,
			y = ig.system.height*3/4,
			x1 = 10,
			y1 = 24;
		
		var winText = new ig.Font( 'media/04b03.font.png' );
		var winBackground = new ig.Image('media/'+backgroundImg);
		winBackground.draw(0,0);
		winText.draw(line1, x1, y1, ig.Font.ALIGN.LEFT);
		winText.draw(line2, x1, y1+10, ig.Font.ALIGN.LEFT);
		winText.draw('Press enter to replay', x, y, ig.Font.ALIGN.CENTER);
			
	},
	
	update: function() {				
		if(ig.input.pressed('enter')){
			ig.system.setGame(MyGame);
		}
		this.parent();
	},
	
	draw: function() {
		this.win(this.line1, this.line2, this.backgroundImg);
	}
});

// Disable audio for mobile devices
if(ig.ua.mobile){
	ig.Sound.enabled = false;
}

// Start the Game with 60fps, a resolution of 160x120
ig.main( '#canvas', StartScreen, 60, 160, 120, 4 );

});
