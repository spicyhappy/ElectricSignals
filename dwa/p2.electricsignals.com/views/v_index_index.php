


<?php if($user): ?>

		<?php if(@$_GET['alert']): ?>
			<div class="alert">
			<span class="error"><?php echo $_GET['alert']?></span><br>
			</div>
		<?php endif; ?>

<?php else: ?>

<div class="intro">

	<h1 class="title">Mosaic is a breathing, living photostream.</h1>

		<?php if(@$_GET['errorsignin']): ?>
		<br><div class="useralert"><?php echo $_GET['errorsignin']?></div><br>
	<?php endif; ?>

	<?php if(@$_GET['errorlogin']): ?>
		<br><div class=" useralert"><?php echo $_GET['errorlogin']?></div><br>
	<?php endif; ?>

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

<?php endif; ?>