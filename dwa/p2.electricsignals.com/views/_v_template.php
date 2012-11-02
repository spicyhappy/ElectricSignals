<!DOCTYPE html>
<html>
<head>
	<title><?=@$title; ?></title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" href="/css/master.css" type="text/css">
	<link rel="stylesheet" href="/css/photoMosaic.screen.css" />
	
	<!-- JS
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>-->
	
	<script src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script src="/js/jquery.photoMosaic.js"></script>
	<script>
	    $(document).ready(function(){
	        $('#mosaic').photoMosaic();
	    });
    </script>
				
	<!-- Controller Specific JS/CSS -->
	<?php echo @$client_files; ?>
	
</head>

<body>	
	
		<!-- Menu for users who are logged in -->
		
		<? if($user): ?>
			<nav id='menu'>
				<a href='/'>Mosaic</a>
				<a href='/posts/users/'>Filter</a>
				<a href='/posts/add'>Add</a>
				<a href='/users/logout'>Logout</a>
			</nav><br>

		<!-- Menu options for users who are not logged in -->	
		<? else: ?>
		<? endif; ?>
	
	
	<?=$content;?>
	
	<!-- Show post stream  -->
	<div class="imagecontainer">
	<ul id="mosaic">
		<?if(isset($posts) AND $posts != false) {?>
		<?foreach($posts as $posts):?>
		
		
		<li>
			<a href="/uploads/images/<?=$posts['imagename']?>">
			<img src="/uploads/images/<?=$posts['imagename']?>" />
			</a>
			<span><?=$posts['title']?></span>
		</li>
		<?endforeach;}?>
	</ul>	
	</div>
	<footer>Made by <a href="http://www.xin-squared.com">X2</a>.</footer>	

</body>
</html>