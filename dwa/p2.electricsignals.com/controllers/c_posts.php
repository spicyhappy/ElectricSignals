<?php

class posts_controller extends base_controller {
	
	public function __construct() {
		
		parent::__construct();
		
		if(!$this->user) {
			die("Members only. <a href='/users/login'>Please login</a>")
		};
		
	}
	
	public function add() {
		
		$this->template->content = View::instance("v_posts_add");
		$this->template->title = "Add a new post";
		echo $this->template;
	}
	
}

?>