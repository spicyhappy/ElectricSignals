<? foreach($posts as $post): ?>
	
	<h2><?=$post['first_name']?> <?=$post['last_name']?> posted:</h2>
	<img src="<?=$post['url']?>" />
	
	<br><br>
	
<? endforeach; ?>