

<div class="box imagepost">
	<h1 class="navlist">Post a Picture</h1>
	<form method='POST' enctype="multipart/form-data" action='/posts/p_add'>
		<span class="navlist">Title: <input class= "" type="text" name="title" autofocus="autofocus"></span>
		<span class="navlist">Upload: <input class= "" type='file' name='imagename'></span>

		<input class="button" type='submit' value="POST">

		<?php if(@$_GET['alert']): ?>
			<span class="alert"> <?php echo $_GET['alert']?></span><br>
		<?php endif; ?>

		<?php if(@$_GET['error']): ?>
			<span class="error"> <?php echo $_GET['error']?></span><br>
		<?php endif; ?>


	</form>

</div>