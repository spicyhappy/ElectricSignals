(function() {
	
	var body = document.getElementsByTagName("body")[0];
	
	var touchControls = {
		
		pokeTheScreen : function() {
			
			body.innerHTML += "You just poked me, how rude!<br>";
		},
		
		stopPokingTheScreen: function() {
			body.innerHTMl += "Don't poke me again.<br><br>";
		}
	};
	
	body.addEventListener("touchstart", touchControls.pokeTheScreen, false);
	body.addEventListener("touchend", touchControls.stopPokingTheScreen, false);
	
})();