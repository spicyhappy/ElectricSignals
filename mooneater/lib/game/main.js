ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.town',
	'impact.timer',
	'game.entities.enemy1'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Resources
	instructText: new ig.Font( 'media/04b03.font.png' ),
	
	// Physics
	gravity: 0,
	
	// Status
	statusText: new ig.Font( 'media/04b03.font.png' ),
	statMatte: new ig.Image('media/statusBar.png'),
	stats: {},
	
	init: function() {
		// Initialize game
		this.loadLevel ( LevelTown );
		
		// Screen size starts at
		this.screen.x = 8;
		this.screen.y = 8;
		
		// Background music
		//ig.music.add('media/audio/background-musicbox.*');
		ig.music.volume = 0.5;
		ig.music.play();
		
		// Setup keys
		ig.input.bind( ig.KEY.LEFT_ARROW , 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW , 'right' );
		ig.input.bind( ig.KEY.SPACE , 'jump' );
		ig.input.bind( ig.KEY.C , 'shoot' );
		
		// Game timer
		this.gameTimer = new ig.Timer();
		
		this.enemy = false;

	},
	
	update: function() {
	
		if (this.gravity === 0) {
		
		// Instructions disappear when something is pressed
			if (ig.input.pressed('left') || ig.input.pressed('right') || ig.input.pressed('down') || ig.input.pressed('jump') || ig.input.pressed('shoot')) {
				this.gravity = 150;
				if(this.instructText) {
					this.instructText=null;
				}
			}
		}
		
		if (this.gameTimer.delta() > 2) {
			if (this.enemy === false) {
				console.log("spawned!");
				this.enemy = true;
				ig.game.spawnEntity(EntityEnemy1,180,60);
			}
			
		}
		
		this.parent();
	
	},
	
	draw: function() {
	
		// Draw all entities and backgroundMaps
		this.parent();
				
		// Control instructions
		if (this.instructText) {
			var x = ig.system.width/2,
				y = ig.system.height*7/8;
				this.instructText.draw('Left/Right Moves, Space Jumps', x, y, ig.Font.ALIGN.CENTER);
		}
	}
});

StartScreen = ig.Game.extend({
	
	instructText: new ig.Font('media/04b03.font.png'),
	background: new ig.Image('media/screenBG2.gif'),
	
	init: function() {
		ig.input.bind(ig.KEY.SPACE,'start');
	},
	update: function() {				
		if(ig.input.pressed('start')){
			ig.system.setGame(StartScreen2);
		}
		this.parent();
	},
	draw: function() {
		this.parent();
		this.background.draw(0,0);
		
		var x = ig.system.width/2,
			y = ig.system.height*3/4;
		
		this.instructText.draw('Press spacebar to start', x, y, ig.Font.ALIGN.CENTER);

	}
	
});

StartScreen2 = ig.Game.extend({
	
	instructText: new ig.Font('media/04b03.font.png'),
	storyText: new ig.Font('media/04b03.font.png'),
	background: new ig.Image('media/screenBG3.gif'),
	
	init: function() {
		ig.input.bind(ig.KEY.SPACE,'start');
	},
	update: function() {				
		if(ig.input.pressed('start')){
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
		
		this.storyText.draw('Be careful, son. Our wings', x1, y1, ig.Font.ALIGN.LEFT);
		this.storyText.draw("are delicate. They will fall", x1, y1+10, ig.Font.ALIGN.LEFT);
		this.storyText.draw("apart if the conditions are", x1, y1+20, ig.Font.ALIGN.LEFT);
		this.storyText.draw("not right . . .", x1, y1+30, ig.Font.ALIGN.LEFT);
		this.instructText.draw('Press spacebar to start', x, y, ig.Font.ALIGN.CENTER);

	}
	
});

// Disable audio for mobile devices
if(ig.ua.mobile){
	ig.Sound.enabled = false;
}

// Start the Game with 60fps, a resolution of 160x120
ig.main( '#canvas', StartScreen, 60, 160, 120, 4 );

});
