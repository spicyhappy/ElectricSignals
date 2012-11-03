<?php

class posts_controller extends base_controller {

	public function __construct() {
		parent::__construct();
		
		# Make sure user is logged in if they want to use anything in this controller
		if(!$this->user) {
			die("Members only. <a href='/users/login'>Login</a>");
		}
		
	}
	
	public function add() {
	
		# Setup view
		$this->template->content = View::instance('v_posts_add');
		$this->template->title   = "Add a new post";
			
		# Render template
		echo $this->template;
	
	}
	
	public function p_add() {
	 
	$errors     = array();
	$file_ext   = strtolower(strrchr($_FILES['imagename']['name'], '.'));
	$file_size  = $_FILES['imagename']['size'];
	$file_tmp   = $_FILES['imagename']['tmp_name'];
	$extensions = array(".jpeg",".jpg",".png",".gif",".tif",".tiff");
	$file_name	= $this->user->user_id."-".Time::now().$file_ext;
		
	# Check to see if it's an image
	if(isset($_FILES['imagename'])){
	
		if(in_array($file_ext,$extensions) === false){
			Router::redirect("/posts/add?error=* Only jpg, png or gif images please.");
		}
		
		else if($file_size > 2097152) {
			Router::redirect("/posts/add?error=* Your file size is too big! Max size of 2 mb, please.");
		}	
		
		else {
			
			# Save information
			
			$_POST['user_id'] 	= $this->user->user_id;
			$_POST['created'] 	= Time::now();
			$_POST['modified'] 	= Time::now();
			$_POST['imagename']	= $file_name;
			
			# Save to database

			DB::instance(DB_NAME)->insert('images', $_POST);

			# Save to your file path			
			move_uploaded_file($file_tmp, APP_PATH."/uploads/images/".$file_name);
			
			# Redirect
			Router::redirect("/posts/add?alert=Hurray! Your message was posted!");
		}
		Router::redirect("/posts");
	}
		
	# Send an error message if it's not an image
	else {
		Router::redirect("/posts/add?error=* Please select an image to upload");
		}
	}
	
	public function index() {
	
		# Set up view
		$this->template->content = View::instance('v_posts_index');
		$this->template->title   = "Posts";

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
			$no_followers = "You need to follow people to see their posts! Find some friends <a href=\"/posts/users\">here</a>.";
			$this->template->content->no_followers = $no_followers;
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
		$posts = DB::instance(DB_NAME)->select_rows($q);

		# Pass data to the view
		$this->template->content->posts = $posts;

		# Render view
		echo $this->template;
		
	}
    
	public function users() {

		# Set up the view
		$this->template->content = View::instance("v_posts_users");
		$this->template->title   = "Users";
		
		# Build our query to get all the users
		$q = "SELECT *
			FROM users";
			
		# Execute the query to get all the users. Store the result array in the variable $users
		$users = DB::instance(DB_NAME)->select_rows($q);
		
		# Build our query to figure out what connections does this user already have? I.e. who are they following
		$q = "SELECT * 
			FROM users_users
			WHERE user_id = ".$this->user->user_id;
			
		# Execute this query with the select_array method
		# select_array will return our results in an array and use the "users_id_followed" field as the index.
		# This will come in handy when we get to the view
		# Store our results (an array) in the variable $connections
		$connections = DB::instance(DB_NAME)->select_array($q, 'user_id_followed');
				
		# Pass data (users and connections) to the view
		$this->template->content->users       = $users;
		$this->template->content->connections = $connections;
	
		# Render the view
		echo $this->template;
	}
	
	public function follow($user_id_followed) {
		
		# Prepare our data array to be inserted
		$data = Array(
			"created" => Time::now(),
			"user_id" => $this->user->user_id,
			"user_id_followed" => $user_id_followed
			);
		
		# Do the insert
		DB::instance(DB_NAME)->insert('users_users', $data);
	
		# Send them back
		Router::redirect("/posts/users");
	
	}
	
	public function unfollow($user_id_followed) {
	
		# Delete this connection
		$where_condition = 'WHERE user_id = '.$this->user->user_id.' AND user_id_followed = '.$user_id_followed;
		DB::instance(DB_NAME)->delete('users_users', $where_condition);
		
		# Send them back
		Router::redirect("/posts/users");
	
	}

}