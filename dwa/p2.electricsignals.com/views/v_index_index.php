


<? if($user): ?>
<? else: ?>
	
<div class="intro">

	<h1 class="title">Mosaic is a breathing, living photostream.</h1>
	
	<? if(@$_GET['errorlogin']): ?>
		<span class="error"><?=$_GET['errorlogin']?></span><br>
	<? endif; ?>
	
	<div class="center left">
	
	<form class="userForm" method='POST' action='/users/p_login'>
		<input class="field" type='text' name='username' placeholder='Username'><br>
		<input class="field" type='password' name='password' placeholder='Password'><br>
		<input class='button' type='submit' value='LOG IN'>
	</form>

	<? if(@$_GET['errorsignin']): ?>
		<span class="error"><?=$_GET['errorsignin']?></span><br>
	<? endif; ?>
	
	<form class="userForm" method='POST' action='/users/p_signup'>
		<input class="field" type='text' name='username' placeholder='Username'><br>
		<input class="field" type='password' name='password' placeholder='Password'><br>
		<input class='button' type='submit' value='SIGN UP'>
	</form>

	</div>
</div>

<? endif; ?>