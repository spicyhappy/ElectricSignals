<? if(isset($no_followers)):?>
	<? echo $no_followers;?>
<? else:?>

	<? foreach($posts as $post):?>
	
		<!--
			<br><?=$post['title']?>
			<br><?=$post['username']?>, <?=Time::time_ago($post['created'], "-1");?>
		-->
		
		<br>
		<img src="/uploads/images/<?=$post['imagename']?>" />
		<br>


	<? endforeach;?>
<? endif;?>
