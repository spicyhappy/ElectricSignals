<?php if(isset($no_followers)):?>
	<?php echo $no_followers;?>
<?php else:?>

	<?php foreach($posts as $post):?>

		<!--
			<br><?php echo $post['title']?>
			<br><?php echo $post['username']?>, <?php echo Time::time_ago($post['created'], "-1");?>
		-->

		<br>
		<img src="/uploads/images/<?php echo $post['imagename']?>" />
		<br>


	<?php endforeach;?>
<?php endif;?>
