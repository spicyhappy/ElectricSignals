


<? if($user): ?>
<? else: ?>
	
<div class="box">

	<h1>Mosaic is a breathing, living photostream.</h1>
	
	<? if(@$_GET['errorlogin']): ?>
		<span class="error"><?=$_GET['errorlogin']?></span><br>
	<? endif; ?>
	
	<form class="userForm" method='POST' action='/users/p_login'>
		Username: <input type='text' name='username'><br>
		Password: <input type='password' name='password'><br>
		<input type='submit' value='Log In'>
	</form>
	
	<? if(@$_GET['errorsignin']): ?>
		<span class="error"><?=$_GET['errorsignin']?></span><br>
	<? endif; ?>
	
	<form class="userForm" method='POST' action='/users/p_signup'>
		Username: <input type='text' name='username'><br>
		Password: <input type='password' name='password'><br>
		<input type='submit' value='Sign Up'>
	</form> 
	
</div>

<? endif; ?>