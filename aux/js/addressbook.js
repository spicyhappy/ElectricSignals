// Wrap everything in an anonymous function, which runs immediately
(function() {

// Address book data stored in a JSON object
var contacts = {
	"addressBook" : [
		{
			"name": "Xin Xin",
			"email": "xin@xin-squared.com",
		},
		{
			"name": "Mark",
			"email": "mark@example.com",	
		},
		{
			"name": "Jessica",
			"email": "jess@example.com",	
		},
		{
			"name": "Jill",
			"email": "jill@example.com",	
		},
		{
			"name": "Emma",
			"email": "emma@example.com",	
		},
		{
			"name": "Angela",
			"email": "angela@example.com",	
		},
		{
			"name": "Patrick",
			"email": "patrick@example.com",	
		},
	]
};

// Initial variables
var searchForm = document.getElementById("search-form"),
	searchField = document.getElementById("q"),
	getAllButton = document.getElementById("get-all"),
	count = contacts.addressBook.length,
	target = document.getElementById("output");
	
// Object with address book methods
var addr = {
	
	// Search for value in q
	search : function(event){

		var searchValue = searchField.value,
			i;
		
		// Prevents default submit action
		event.preventDefault();
		target.innerHTML = "";
		
		// Check to see if there are entries and a search value
		if (count > 0 && searchValue !== "") {
		
		// Loop through contacts in the address book, check to see if it matches the search value
			for (i=0; i<count; i++) {
				var obj = contacts.addressBook[i],
				//indexOf returns -1 if there are no matching terms
					isItFound = obj.name.indexOf(searchValue);

				if(isItFound !== -1) {
					target.innerHTML += '<p>'+obj.name+', <a href="mailto:'+obj.email+'">'+obj.email+"</a></p>";
				}
			}
		}
	},
	
	// List all contacts in address book
	getAllContacts : function(){

		var i;
		target.innerHTML = "";
		
		// Loop through all contacts in address book and display them in target
		if(count > 0) {
			for(i=0; i<count; i++) {
				var obj = contacts.addressBook[i];
				target.innerHTML += '<p>'+obj.name+', <a href="mailto:'+obj.email+'">'+obj.email+'</a></p>';
			}
		}
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
}()); // End anonymous function