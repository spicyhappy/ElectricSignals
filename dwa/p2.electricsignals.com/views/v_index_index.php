


<? if($user): ?>

<div class="box">
	<h1>Hello <?=$user->username?>!</h2>
</div>
		
		
<? else: ?>
	
<div class="box">

	<h1>Mosaic is a breathing, living photostream.</h1>
	
	<form class="userForm" method='POST' action='/users/p_login'>
		Username: <input type='text' name='username'><br>
		Password: <input type='password' name='password'><br>
		<input type='submit' value='Log In'>
	</form>
	
	<form class="userForm" method='POST' action='/users/p_signup'>
		Username: <input type='text' name='username'><br>
		Password: <input type='password' name='password'><br>
		<input type='submit' value='Sign Up'>
	</form> 
	
</div>

<? endif; ?>