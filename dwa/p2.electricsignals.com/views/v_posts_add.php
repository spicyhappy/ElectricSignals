

<div class="imagePost box">
	<h1>Post a Picture</h1>
	<? if(@$_GET['error']): ?>
		<span class="error"><?=$_GET['error']?></span><br>
	<? endif; ?>

	<? if(@$_GET['alert']): ?>
	<span class="alert"><?=$_GET['alert']?></span><br>
	<? endif; ?>
	
	<form method='POST' enctype="multipart/form-data" action='/posts/p_add'>
		Title: <input type="text" name="title"><br>
		Upload: <input type='file' name='imagename'><br>
	
		<input type='submit'>
			
	</form>

</div>