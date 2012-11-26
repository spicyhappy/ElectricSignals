$( init );
 
function init() {

	// Things that can be dragged
	
	$('.draggable').draggable({
		containment: 'document',
		cursor: 'move',
		delay: 50,
		distance: 10,
		opacity: 0.5,
		scrollSensitivity: 75,
		scrollSpeed: 25
	});
  
  
  // Sprites
  
  $('.star').sprite({fps: 12, no_of_frames: 5});
  
  
  // Audio
  
  $('.star').click(function() {
  
	 var audio = $("#starAudio")[0];
	 audio.play();
	  
  });
  
   $('.king').click(function() {
  
	 var audio = $("#kingAudio")[0];
	 audio.play();
	  
  });
  
   $('.queen').click(function() {
  
	 var audio = $("#queenAudio")[0];
	 audio.play();
	  
  });
  
  
}

