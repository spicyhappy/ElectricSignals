ig.module(
	'game.entities.enemy1'
)
.requires(
	'impact.entity',
	'impact.sound'
)
.defines(function(){

EntityEnemy1 = ig.Entity.extend({

    animSheet: new ig.AnimationSheet( 'media/enemy1.gif', 16, 16 ),
    //hitSFX: new ig.Sound('media/audio/king-surprise.*'),
    
    size: {x: 12, y:9},
    offset: {x: 1, y: 3},
    flip: false,

    health: 1,
	    
    // Physics
    //maxVel: {x: 100, y: 100},
    //friction: {x: 150, y: 0},
    speed: 20,
    gravityFactor: 0,
    bounciness: .8,
    
    // Collision
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    
    // Ignore map collisions
    handleMovementTrace: function( res ) {
    	this.pos.x += this.vel.x * ig.system.tick;
    	this.pos.y += this.vel.y * ig.system.tick;
    },
    
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('fly', .07, [0,1,2,3]);
    },
    
    update: function() {
    	
    	this.vel.x = this.speed * -1;
    	
    	// Remove if goes off screen on the left side
    	if (this.pos.x < -20) {
	    	this.kill();
    	}
    	
    	
    	this.parent();
    },
    
    check: function(other) {
	    console.log("enemy hit!");
	    this.receiveDamage(1, this);
	    other.receiveDamage(1, this);
	    other.makeInvincible();
	    //this.hitSFX.play();
    }
});
});
