<?php
class users_controller extends base_controller {

	public function __construct() {
		parent::__construct();
		//echo "users_controller construct called<br><br>";
	} 
	
	public function index() {
		echo "Welcome to the users's department";
	}
	
	public function signup() {
		
		# Setup view
		$this->template->content = View::instance('v_users_signup');
		$this->template->title   = "Signup";
			
		# Render template
		echo $this->template;
		
	}

	public function p_signup() {
			
		# Encrypt the password	
		$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);
		
		# More data we want stored with the user	
		$_POST['created']  = Time::now();
		$_POST['modified'] = Time::now();
		$_POST['token']    = sha1(TOKEN_SALT.$_POST['email'].Utils::generate_random_string());
		
		# Insert this user into the database 
		$user_id = DB::instance(DB_NAME)->insert("users", $_POST);
		
		# Sign the new user in
		
		$token = $_POST['token'];
		@setcookie("token", $token, strtotime('+1 year'), '/');
		
		# Email the new user
		$to[] = Array("name" => $user->first_name, "email" => $_POST['email']);
		$from = Array("name" => APP_NAME, "email" => APP_EMAIL);
		$subject = "Welcome to Pictochat";		
		$body = "Hi ".$_POST['first_name'].", welcome to Pictochat. Pictochat is a social network for people to talk in photos.";
		$email = Email::send($to, $from, $subject, $body, true, $cc, $bcc);
		
		# Redirect to home page
		Router::redirect("/");
	}
	
	public function login($error = NULL) {
	
		# Set up the view
		$this->template->content = View::instance("v_users_login");
		
		# Pass data to the view
		$this->template->content->error = $error;
	
		# Render the view
		echo $this->template;
		
	}
		
	public function p_login() {
		
		# Hash submitted password so we can compare it against one in the db
		$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);
		
		# Search the db for this email and password
		# Retrieve the token if it's available
		$q = "SELECT token 
			FROM users 
			WHERE email = '".$_POST['email']."' 
			AND password = '".$_POST['password']."'";
		
		$token = DB::instance(DB_NAME)->select_field($q);	
					
		# Login failed
		if(!$token) {
				
			# Send them back to the login page
			Router::redirect("/users/login/error"); # Note the addition of the parameter "error"
						
		# But if we did, login succeeded! 
		} else {
				
			# Store this token in a cookie
			@setcookie("token", $token, strtotime('+1 year'), '/');
			
			# Send them to the main page - or whever you want them to go
			Router::redirect("/");
						
		}
	
	}
	
	public function logout() {
		# Generate and save a new token for next login
		$new_token = sha1(TOKEN_SALT.$this->user->email.Utils::generate_random_string());
		
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
		
	public function profile() {
	
		# If user is blank, they're not logged in, show message and don't do anything else
		if(!$this->user) {
			echo "Members only. <a href='/users/login'>Login</a>";
			
			# Return will force this method to exit here so the rest of 
			# the code won't be executed and the profile view won't be displayed.
			return false;
		}
		
		# Setup view
		$this->template->content = View::instance('v_users_profile');
		$this->template->title   = "Profile of".$this->user->first_name;
			
		# Render template
		echo $this->template;
	}

} # end of the class