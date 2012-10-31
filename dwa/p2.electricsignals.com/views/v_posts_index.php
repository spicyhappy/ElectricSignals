


<?if(isset($no_followers)):?>
	<?echo $no_followers;?>
<?else:?>

	<?foreach($posts as $post):?>

		<i><?=$post['first_name']?> <?=$post['last_name']?> posted on <?=$post['created']?>:</i>
		<br>
		<h3><img src="<?=$post['url']?>" /></h3>
		<br>

	<?endforeach;?>
<?endif;?>


