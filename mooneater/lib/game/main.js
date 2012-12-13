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
	
	instructText: new ig.Font( 'media/minionpro.font.png' ),
	gravity: 300,
	
	// Status
	statusText: new ig.Font( 'media/minionpro.font.png' ),
	statMatte: new ig.Image('media/statusBar.png'),
	stats: {cookies: 5, lamp: false, balloon: false},
	
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
			if(player.accel.x > 0 && this.instructText) {
				this.instructText=null;
			}
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		
		// Instructions
		
		if (this.instructText) {
			var x = ig.system.width/2,
				y = ig.system.height - 25;
				this.instructText.draw('Left/Right Moves, Space Jumps', x, y, ig.Font.ALIGN.CENTER);
		}
	}
});

StartScreen = ig.Game.extend({
	
	instructText: new ig.Font('media/minionpro.font.png'),
	background: new ig.Image('media/screenBG.gif'),
	
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
		
		this.instructText.draw('Press spacebar to start', x, y, ig.Font.ALIGN.CENTER);

	}
	
});

// Disable audio for mobile devices
if(ig.ua.mobile){
	ig.Sound.enabled = false;
}

// Start the Game with 60fps, a resolution of 512x384
ig.main( '#canvas', StartScreen, 60, 512, 384, 1 );

});
