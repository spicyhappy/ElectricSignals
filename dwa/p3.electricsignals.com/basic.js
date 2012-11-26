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

}