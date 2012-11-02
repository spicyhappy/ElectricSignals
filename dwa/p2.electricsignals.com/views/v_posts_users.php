<form method='POST' action='/posts/p_follow'>
		
	<? foreach($users as $user): ?>
	
		<!-- Print this user's name -->
		
		<!-- If there exists a connection with this user, show a unfollow link -->
		<? if(isset($connections[$user['user_id']])): ?>
			
			<a href='/posts/unfollow/<?=$user['user_id']?>'><strong><?=$user['username']?></strong></a>
		
		<!-- Otherwise, show the follow link -->
		<? else: ?>
			
			<a href='/posts/follow/<?=$user['user_id']?>'><?=$user['username']?></a>
		<? endif; ?>
	
		<br><br>
	
	<? endforeach; ?>
	
</form>