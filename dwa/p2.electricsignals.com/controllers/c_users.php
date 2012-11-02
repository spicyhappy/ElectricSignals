<?php
class users_controller extends base_controller {

	public function __construct() {
		parent::__construct();
		//echo "users_controller construct called<br><br>";
	} 
	
	public function index() {
		# Redirect to home page
		Router::redirect("/posts/users");
	}

	public function p_signup() {
		
		# Check to see if the username is already in the database
		$username = $_POST['username'];
		$username = DB::instance(DB_NAME)->sanitize($username);
		$user_id = DB::instance(DB_NAME)->select_row("SELECT user_id FROM users WHERE username = '".$username."'");
		if(!$user_id) {$canUse = true;}
		else {$canUse = false;}
		
		# See if the username was already used or if the field has blanks
		if (($_POST['password']!="") AND ($_POST['username']!="") AND ($_POST['password']!=" ") AND ($_POST['username']!=" ") AND $canUse==true)
		{
			# Encrypt the password	
			$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);
			
			# More data we want stored with the user	
			$_POST['created']  = Time::now();
			$_POST['modified'] = Time::now();
			$_POST['token']    = sha1(TOKEN_SALT.$_POST['username'].Utils::generate_random_string());
			
			# Insert this user into the database 
			$user_id = DB::instance(DB_NAME)->insert("users", $_POST);
			
			# Sign the new user in
			
			$token = $_POST['token'];
			@setcookie("token", $token, strtotime('+1 year'), '/');
			
		}
		
		# Redirect to home page
		Router::redirect("/");
	}
		
	public function p_login() {
		
		# Sanitize the user entered data to prevent any funny-business (re: SQL Injection Attacks)
		$_POST = DB::instance(DB_NAME)->sanitize($_POST);
		
		# Hash submitted password so we can compare it against one in the db
		$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);
		
		# Search the db for this email and password
		# Retrieve the token if it's available
		$q = "SELECT token 
			FROM users 
			WHERE username = '".$_POST['username']."' 
			AND password = '".$_POST['password']."'";
		
		$token = DB::instance(DB_NAME)->select_field($q);	
					
		# If we didn't get a token back, login failed
		if(!$token) {
				
			# Send them back to the login page
			Router::redirect("/");
			
		# But if we did, login succeeded! 
		} else {
				
			# Store this token in a cookie
			setcookie("token", $token, strtotime('+1 year'), '/');
			
			# Send them to the main page - or whever you want them to go
			Router::redirect("/");
						
		}
	
	}
		
	public function logout() {
		# Generate and save a new token for next login
		$new_token = sha1(TOKEN_SALT.$this->user->username.Utils::generate_random_string());
		
		# Create the data array we'll use with the update method
		# In this case, we're only updating one field, so our array only has one entry
		$data = Array("token" => $new_token);
		
		# Do the update
		DB::instance(DB_NAME)->update("users", $data, "WHERE token = '".$this->user->token."'");
		
		# Delete their token cookie - effectively logging them out
		setcookie("token", "", strtotime('-1 year'), '/');
		
		# Send them back to the main landing page
		Router::redirect("/");
			}

} # end of the class