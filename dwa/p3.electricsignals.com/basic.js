$( init );
 
function init() {

	$('.draggable').draggable({
		containment: 'document',
		cursor: 'move',
		delay: 50,
		distance: 10,
		opacity: 0.5,
		scrollSensitivity: 75,
		scrollSpeed: 25
  });
  
  $('.star').sprite({fps: 12, no_of_frames: 5});

}