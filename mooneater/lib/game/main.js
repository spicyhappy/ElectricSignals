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
	
	// Load a font
	text: new ig.Font( 'media/minionpro.font.png' ),
	gravity: 300,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.loadLevel ( LevelTown );
		
		// Background music
		ig.music.add('media/audio/background-musicbox.*');
		ig.music.volume = 0.5;
		ig.music.play();
		
		ig.input.bind( ig.KEY.LEFT_ARROW , 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW , 'right' );
		ig.input.bind( ig.KEY.SPACE , 'jump' );
		ig.input.bind( ig.KEY.C , 'shoot' );
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
		
		// Screen follows player
		var player = this.getEntitiesByType(EntityPlayer)[0];
		if(player) {
			this.screen.x = player.pos.x - ig.system.width/2;
			//this.screen.y = player.pos.y - ig.system.height/2;
			if(player.accel.x > 0 && this.text) {
				this.text=null;
			}
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		
		// Instructions
		
		if (this.text) {
			var x = ig.system.width/2,
				y = ig.system.height - 25;
				this.text.draw('Left/Right Moves, Space Jumps', x, y, ig.Font.ALIGN.CENTER);
		}
	}
});

StartScreen = ig.Game.extend({
	
	text: new ig.Font('media/minionpro.font.png'),
	background: new ig.Image('media/screen-bg.gif'),
	init: function() {
		ig.input.bind(ig.KEY.SPACE,'start');
	},
	update: function() {
	
		//document.addEventListener("click", ig.system.setGame(MyGame), false);
				
		if(ig.input.pressed('start')){
			ig.system.setGame(MyGame);
		}
		this.parent();
	},
	draw: function() {
		this.parent();
		this.background.draw(0,0);
		
		var x = ig.system.width/2,
			y = ig.system.height*2/3;
		
		this.text.draw('Press spacebar to start', x, y, ig.Font.ALIGN.CENTER);

	}
	
});

// Disable audio for mobile devices
if(ig.ua.mobile){
	ig.Sound.enabled = false;
}

// Start the Game with 60fps, a resolution of 640x480
ig.main( '#canvas', StartScreen, 60, 640, 480, 1 );

});
