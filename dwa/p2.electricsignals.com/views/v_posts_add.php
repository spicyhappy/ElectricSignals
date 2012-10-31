<form method='POST' action='/posts/p_add'>

	<strong>New Post:</strong><br>
	<textarea name='url'></textarea>

	<br><br>
	<input type='submit'>
	<? if($error): ?>
		<div class="error">Sorry that was not an image. Pictochat only takes jpeg, jpg, and png file formats.</div>
		<br />
	<? endif; ?>
	

</form>