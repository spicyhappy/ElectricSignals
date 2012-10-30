<h1>Pictochat</h1>


	<? if($user): ?>
	
	<h2>Welcome, <?=$user->first_name?>.</h2>
		
		
	<? else: ?>
		
	<h2>Welcome, stranger. Pictochat is Twitter for photos. Post, respond, repost, and follow your favorite people!</h2>
		
	<? endif; ?>
	
<ul>
	<li><a href="/users/login">Log in</a></li>
	<li><a href="/users/signup">Sign up</a></li>
</ul>

	
	</div>
	
	<br>