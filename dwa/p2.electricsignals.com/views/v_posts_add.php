

<div class="imagePost">
	<h1>Post a Picture</h1>
	<form method='POST' enctype="multipart/form-data" action='/posts/p_add'>
		Title: <input type="text" name="title"><br>
		Upload: <input type='file' name='imagename'><br>
	
		<? if(@$_GET['error']): ?>
		<span class="error"><?=$_GET['error']?></span><br>
		<? endif; ?>
		<input type='submit'>
			
	</form>
	
<!--<form method="POST" action="/posts/imagepost" enctype="multipart/form-data">

	<input type="file" name="image" /><br>
	
		<? if(@$_GET['error']): ?>
			<span style='color:red'><?=$_GET['error']?></span><br>
			<? endif; ?>
	<input type="submit" />
	
<br>
			
</form>-->


</div>