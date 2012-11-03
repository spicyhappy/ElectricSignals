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
			$('#mosaic').photoMosaic({
			    input: 'html',
			    width: "auto",
			    padding: 10
			});
	    });	    
    </script>
				
	<!-- Controller Specific JS/CSS -->
	<?php echo @$client_files; ?>
	
</head>

<body>	
	
	<?=$content;?>
	
	<!-- Show post stream  -->
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
			<!-- Menu for users who are logged in -->
		
		<? if($user): ?>
			<nav>
			<div>
				<ul class="navbar">
					<li class="navlist"><a href='/'>Mosaic</a></li>
					<li class="navlist"><a href='/posts/users/'>Follow</a></li>
					<li class="navlist"><a href='/posts/add'>Post</a></li>
					<li class="navlist"><a href='/users/logout'>Logout</a></li>
				</ul>
				<footer>Made by <a href="http://www.xin-squared.com">X2</a></footer>
			</div>
			</nav><br>

		<!-- Menu options for users who are not logged in -->	
		<? else: ?>
		<? endif; ?>

</body>
</html>