

<div class="box imagepost">
	<h1 class="navlist">Post a Picture</h1>
	<form method='POST' enctype="multipart/form-data" action='/posts/p_add'>
		<span class="navlist">Title: <input class= "" type="text" name="title" autofocus="autofocus"></span>
		<span class="navlist">Upload: <input class= "" type='file' name='imagename'></span>
	
		<input class="button" type='submit' value="POST">
		
		<? if(@$_GET['alert']): ?>
			<span class="alert"> <?=$_GET['alert']?></span><br>
		<? endif; ?>
				
		<? if(@$_GET['error']): ?>
			<span class="error"> <?=$_GET['error']?></span><br>
		<? endif; ?>
	
			
	</form>

</div>