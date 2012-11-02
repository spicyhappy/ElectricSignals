<!DOCTYPE html>
<html>
<head>
	<title><?=@$title; ?></title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
	
	<!-- JS -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>
				
	<!-- Controller Specific JS/CSS -->
	<?php echo @$client_files; ?>
	
</head>

<body>	
	
		<!-- Menu for users who are logged in -->
		
		<? if($user): ?>
			<nav id='menu'>
				<a href='/'>Mosaic</a>
				<a href='/posts/users/'>Follow</a>
				<a href='/posts'>Posts</a>
				<a href='/posts/add'>Add</a>
				<a href='/users/logout'>Logout</a>
			</nav><br>

		<!-- Menu options for users who are not logged in -->	
		<? else: ?>
		<? endif; ?>
	
	
	<?=$content;?>
		
	<?foreach($posts as $posts):?>
		<br><?=$posts['title']?>
		<br><?=$posts['username']?>, <?=Time::time_ago($posts['created'], "-1");?>
		<br>
		<h3><img src="<?=$posts['url']?>" /></h3>
		<br>

	<?endforeach;?>


	
	
	<br>
	<footer>Made by <a href="http://www.xin-squared.com">X2</a>.</footer>
	

</body>
</html>