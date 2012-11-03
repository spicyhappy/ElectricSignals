


<? if($user): ?>

		<? if(@$_GET['alert']): ?>
			<div class="alert">
			<span class="error"><?=$_GET['alert']?></span><br>
			</div>
		<? endif; ?>

<? else: ?>
	
<div class="intro">

	<h1 class="title">Mosaic is a breathing, living photostream.</h1>
	
		<? if(@$_GET['errorsignin']): ?>
		<br><div class="useralert"><?=$_GET['errorsignin']?></div><br>
	<? endif; ?>
	
	<? if(@$_GET['errorlogin']): ?>
		<br><div class=" useralert"><?=$_GET['errorlogin']?></div><br>
	<? endif; ?>
	
	<div class="center left">
	
	<form class="userForm" method='POST' action='/users/p_login'>
		<input class="field" type='text' name='username' placeholder='Username'><br>
		<input class="field" type='password' name='password' placeholder='Password'><br>
		<input class='button' type='submit' value='LOG IN'>
	</form>
	
	<form class="userForm" method='POST' action='/users/p_signup'>
		<input class="field" type='text' name='username' placeholder='Username'><br>
		<input class="field" type='password' name='password' placeholder='Password'><br>
		<input class='button' type='submit' value='SIGN UP'>
	</form>

	</div>
</div>

<? endif; ?>