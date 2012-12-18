ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.town'
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
		
		// Background music
		//ig.music.add('media/audio/background-musicbox.*');
		ig.music.volume = 0.5;
		ig.music.play();
		
		// Setup keys
		ig.input.bind( ig.KEY.LEFT_ARROW , 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW , 'right' );
		ig.input.bind( ig.KEY.SPACE , 'jump' );
		ig.input.bind( ig.KEY.C , 'shoot' );

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
		
		this.parent();
	
	},
	
	draw: function() {
	
		// Draw all entities and backgroundMaps
		this.parent();
				
		// Control instructions
		if (this.instructText) {
			var x = ig.system.width/2,
				y = ig.system.height - 25;
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
			ig.system.setGame(MyGame);
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

// Disable audio for mobile devices
if(ig.ua.mobile){
	ig.Sound.enabled = false;
}

// Start the Game with 60fps, a resolution of 320x240
ig.main( '#canvas', StartScreen, 60, 320, 240, 2 );

});
