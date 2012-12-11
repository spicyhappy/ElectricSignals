// Wrap everything in an anonymous function,
(function() {

	// Detect if XMLHttpRequest is supported, if not use ActiveXObject
	function getHTTPObject() {

	var xhr;
	
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	
	else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}
	
	return xhr;

}

	// Define Ajax call
	function ajaxCall(dataUrl, outputElement, callback) {
	
	// Feature detection
	var request = getHTTPObject();
	
	outputElement.innerHTML = "Loading...";
	
	request.onreadystatechange = function() {
		
		// Detects if Ajax request is ready and that it was successful
		if (request.readyState === 4 && request.status === 200) {
			
			// Parse Ajax response and save to a variable
			var contacts = JSON.parse(request.responseText);
			
			// Check to see if call back is a function, run
			if(typeof callback === "function"){
				
				callback(contacts);
			}
		
		}
	};
	
	// Prepare information
	request.open("GET", dataUrl, true);
	
	// Make Ajax call
	request.send(null);
}

	// Initial variables
	var searchForm = document.getElementById("search-form"),
		searchField = document.getElementById("q"),
		getAllButton = document.getElementById("get-all"),
		target = document.getElementById("output");
	
	// Object with address book methods
	var addr = {
	
	search : function(event){
		
		var output = document.getElementById("output");
		
		// Start Ajax call
		ajaxCall("data/contacts.json", output, function (data) {
			
			var searchValue = searchField.value,
				addrBook = data.addressBook,
				count = addrBook.length,
				i;
				
			// Prevent default browser behavior
			event.preventDefault();
			
			target.innerHTML = "";
			
			// Check to see if there are entries and a search value
			if (count > 0 && searchValue !== "") {
				
				// Loop through contacts in the address book, check to see if it matches the search value
				for (i=0; i<count; i++) {
					var obj = addrBook[i],
						//indexOf returns -1 if there are no matching terms
						isItFound = obj.name.indexOf(searchValue);

					if(isItFound !== -1) {
						target.innerHTML += '<p>'+obj.name+', <a href="mailto:'+obj.email+'">'+obj.email+'</a></p>';
					}
				}
			} // End if
		
		}); // End Ajax call
		
	},
	
	// List all contacts in address book
	getAllContacts : function(){
		
		var output = document.getElementById("output");
		
		ajaxCall("data/contacts.json", output, function (data) {
			
			var addrBook = data.addressBook,
				count = addrBook.length,
				i;
				
			target.innerHTML = "";
			
			if(count > 0) {
				for(i=0; i<count; i++) {
					var obj = addrBook[i];
					target.innerHTML += '<p>'+obj.name+', <a href="mailto:'+obj.email+'">'+obj.email+'</a></p>';
				}
			} //end count
		
			
		}); //End Ajax call
		
	},
	
	// Change class of parent node to "active"
	addActiveSection : function(){
		this.parentNode.setAttribute("class","active");
	},
	
	// Remove classes of parent node
	removeActiveSection: function(){
		this.parentNode.removeAttribute("class");
	},
	
	// Change class to "hover"
	addHoverClass : function(){
		searchForm.setAttribute("class","hovering");	
	},
	
	// Remove classes
	removeHoverClass: function() {
		searchForm.removeAttribute("class");
	},
	
};

	// Event listeners
	searchField.addEventListener("keyup", addr.search, false);
	searchField.addEventListener("focus", addr.addActiveSection, false);
	searchField.addEventListener("blur", addr.removeActiveSection, false);
	getAllButton.addEventListener("click", addr.getAllContacts, false);
	searchForm.addEventListener("mouseover", addr.addHoverClass, false);
	searchForm.addEventListener("mouseout", addr.removeHoverClass, false);
	searchForm.addEventListener("submit", addr.search, false);
	
})(); // End anonymous function