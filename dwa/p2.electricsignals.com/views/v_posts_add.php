<form method='POST' action='/posts/p_add'>

	<strong>Post a Picture</strong><br>
	Title: <input type="text" name="title"><br>
	<textarea name='url'></textarea>

	<? if($error): ?>
		<div class="error">Sorry that was not an image. Pictochat only takes jpeg, jpg, and png file formats.</div>
	<? endif; ?>

	<br><br>
	<input type='submit'>

	

</form>