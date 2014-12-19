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
  $('.hasAudio').click(function() {
  	 
  	 var illustration = $(this).attr('id');
	 var audio = $("#" + illustration + "Audio")[0];
	 audio.play();

  
  });
  
  
}

