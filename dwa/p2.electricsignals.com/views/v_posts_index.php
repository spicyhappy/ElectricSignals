<? if(isset($no_followers)):?>
	<? echo $no_followers;?>
<? else:?>

	<? foreach($posts as $post):?>
	
		<!--
			<br><?=$post['title']?>
			<br><?=$post['username']?>, <?=Time::time_ago($post['created'], "-1");?>
		-->
		
		<br>
		<h3><img src="<?=$post['url']?>" /></h3>
		<br>


	<? endforeach;?>
<? endif;?>
