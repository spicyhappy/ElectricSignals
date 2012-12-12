ig.module(
	'game.entities.citizen'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityCitizen = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/citizen1.png', 32, 32),
		size: {x:9,y:29},
		offset: {x:11,y:3},
		maxVel: {x:100,y:100},
		flip: false,
		friction: {x:150,y:0},
		speed: 14,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',1,[0]);
		},
			
		update: function() {
   		 	// near an edge? return!
   		 	if( !ig.game.collisionMap.getTile(
    			this.pos.x + (this.flip ? +4 : this.size.x -4),
    			this.pos.y + this.size.y+1)) {
	    			
	    			this.flip = !this.flip;
	    		}
	    		var xdir = this.flip ? -1 : 1;
	    		this.vel.x = this.speed * xdir;
	    		this.currentAnim.flip.x = this.flip;
	    		this.parent();
	    	},
	    	handleMovementTrace: function(res) {
				this.parent(res);
				if(res.collision.x){
					this.flip = !this.flip;
				}
			},

		});
});