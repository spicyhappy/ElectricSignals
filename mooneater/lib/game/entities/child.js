ig.module(
	'game.entities.child'
)
.requires(
	'impact.entity',
	'impact.sound'
)
.defines(function () {
	EntityChild = ig.Entity.extend({
	
		animSheet: new ig.AnimationSheet('media/child1.gif', 16, 16),
		size: {x: 3, y:7},
		offset: {x:6, y:5},	
		flip: false,
		
		health: 1,		
		
		// Physics
		maxVel: {x:100, y:150},
		friction: {x:600, y: 0},
		accelGround: 400,
		accelAir: 100,
		jump: 5,
		gravityFactor: 0,
		
		// Collision
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,

		
		init: function(x,y,settings) {
			// Different animation states
			this.parent(x,y,settings);
			this.addAnim('idle',1,[0]);
			this.addAnim('run',0.07,[0,1,2]);
		},
		
        update: function() {
            // Set the current animation, based on the player's speed
            if( this.vel.y < 0 ) {
            	this.currentAnim = this.anims.run;
            }else{
            	this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;
        	
        	// Kill player if flies too close to the sun/water
        	if (this.pos.y < 22 || this.pos.y > 102) {
	        	this.kill();
        	}
        	
        	this.parent();
        },
        
        
        draw: function(){

	        this.parent();
        }
    
	});
});