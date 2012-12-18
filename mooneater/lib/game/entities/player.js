ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'impact.sound'
)
.defines(function () {
	EntityPlayer = ig.Entity.extend({
	
		animSheet: new ig.AnimationSheet('media/player2.gif', 16, 16),
		//jumpSFX: new ig.Sound('media/audio/player-laugh.*'),
		
		size: {x: 5, y:15},
		offset: {x:8, y:1},	
		flip: false,
		
		// Physics
		maxVel: {x:100, y:150},
		friction: {x:600, y: 0},
		accelGround: 400,
		accelAir: 200,
		jump: 200,
		
		// Collision
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		// Different animation states
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',1,[0]);
			this.addAnim('run',0.07,[2,3,4,5,0,1]);
		},
		
		// Controls player movement
        update: function() {
              // move left or right
        	var accel = this.standing ? this.accelGround : this.accelAir;
        	if( ig.input.state('left') ) {
        		this.accel.x = -accel;
        		this.flip = true;
        	}else if( ig.input.state('right') ) {
        		this.accel.x = accel;
        		this.flip = false;
        	}else{
        		this.accel.x = 0;
        	}
        	// jump
        	if( ig.input.pressed('jump') ) {
        		this.vel.y = -this.jump*.5;
        		//this.jumpSFX.play();
        	}
            // set the current animation, based on the player's speed
            if( this.vel.y < 0 ) {
            	this.currentAnim = this.anims.run;
            }else{
            	this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;
        	// move!
        	this.parent();
        },
	});
});