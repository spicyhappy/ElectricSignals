<?
public function index() {
 
    # Set up view
    $this->template->content = View::instance('v_posts_index');
    $this->template->title   = "Posts";
    
    # Build our query
    $q = "SELECT * 
        FROM posts
        JOIN users USING (user_id)";
    
    # Run our query, grabbing all the posts and joining in the users    
    $posts = DB::instance(DB_NAME)->select_rows($q);
    
    # Pass data to the view
    $this->template->content->posts = $posts;
    
    # Render view
    echo $this->template;
    
}