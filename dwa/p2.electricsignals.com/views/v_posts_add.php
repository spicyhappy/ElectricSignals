<form method='POST' action='/posts/p_add'>

	<strong>New Post:</strong><br>
	<textarea name='url'></textarea>

	<? if($error): ?>
		<div class="error">Sorry that was not an image. Pictochat only takes jpeg, jpg, and png file formats.</div>
	<? endif; ?>

	<br><br>
	<input type='submit'>

	

</form>