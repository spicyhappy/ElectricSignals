<?

class Post {
	
	public function recent() {
		# Build a query of the users this user is following - we're only interested in their posts
		$q = "SELECT * 
			FROM users_users
			WHERE user_id = ".$this->user->user_id;

		# Execute our query, storing the results in a variable $connections
		$connections = DB::instance(DB_NAME)->select_rows($q);
		
		# In order to query for the posts we need, we're going to need a string of user id's, separated by commas
		# To create this, loop through our connections array
		$connections_string = "";
		foreach($connections as $connection) {
			$connections_string .= $connection['user_id_followed'].",";
		}

		# Remove the final comma 
		$connections_string = substr($connections_string, 0, -1);

		# Connections string example: 10,7,8 (where the numbers are the user_ids of who this user is following)
		if(empty($connections_string)) {
			# If the user isn't following anyone, this prevents a SQL error
			//$no_followers = "You need to follow people to see their posts! Find some friends <a href=\"/posts/users\">here</a>.";
			//$this->template->content->no_followers = $no_followers;
		} else {
			# Run our query, store the results in the variable $posts
			# If our user is following any users, we'll run the query to grab their posts
			$q =
			"SELECT images.*, users.user_id, users.username
			FROM images 
			JOIN users USING (user_id)
			WHERE images.user_id IN (".$connections_string.") 
			ORDER BY images.created DESC"; # This is where we use that string of user_ids we created
			$posts = DB::instance(DB_NAME)->select_rows($q);
		}

		# Run our query, store the results in the variable $posts
		return DB::instance(DB_NAME)->select_rows($q);

	}
}