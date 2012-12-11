$(document).ready(function() { // start doc ready; do not delete this!

	// Color
	$('.color-choice').click(function() {
		var color = $(this).css('background-color');
		$('#canvas').css('background-color', color);
		$('.texture-choice').css('background-color', color);
	});
	
	// Texture
	$('.texture-choice').click(function() {
		var image = $(this).css('background-image');
		$('#canvas').css('background-image', image);
	});
	
	// Message
	$('input[name=message]').click(function() {
		var message = $(this).attr('value');
		$('#message-in-canvas').html(message);
	});
	
	// Recipient Message
	$('#recipient').keyup(function() {
		var recipient = $(this).val();
		var length = recipient.length;
		
		if(length == 14) {
			$('#recipient-error').html("The max amount of characters is 14");
			$('#recipient-error').show();
		}
		
		else {
			$('#recipient-error').html("");
			$('#recipient-error').hide();
		}
		
		$('#recipient-in-canvas').html(recipient + "!");

	});
	
	// Search for buttons
	$('#graphic-search-button').click(function() {
	
		var search_term = $('#graphic-search-input').val();
		var url = 'http://students.susanbuck.com/storage/code/_js/google_images.php?keyword=' + search_term;
				
		$.ajax({
			url: url,
			cache: false,
			beforeSend: function() {
				$('#graphic-search-results').html("Searching..."); },
			success: function(data) {
				$('#graphic-search-results').html(data); },
			dataType: "html"
		});
		
	});
	
	// Add graphics
	$('.graphic-choice').live('click', function() {
		
			var image = $(this).attr('src');
			$('#canvas').prepend("<img class='draggable new-draggable' src='" + image + "'>");
			$(".draggable").draggable({ containment: "#canvas" });
			
	});
	
	// Refresh
	
	$('#refresh-button').click(function() {
		
		$('#message-in-canvas').html("");
		$('#recipient-in-canvas').html("");
		$('.draggable').remove();
		$('#canvas').css('background-color','white');
		$('#canvas').css('background-image','');
	});
	
	// Print
	
	$('#print-button').click(function() {
		
		var print_window = window.open('','_blank','');
		
		var contents = $('<div>').html($('#canvas').clone()).html();
		
		var html = '<html><head><link rel="stylesheet" href="styles.css" type="text/css"></head><body>' + contents + '</body></html>';
		
		print_window.document.open();
		print_window.document.write(html);
		print_window.document.close();
	});
	
	
	
	
	
}); // end doc ready; do not delete this!


