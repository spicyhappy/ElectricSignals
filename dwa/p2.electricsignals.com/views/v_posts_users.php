
<div class="box follow">
<form method='POST' action='/posts/p_follow'>	
	<li class="navlist">Following</li>
	<? foreach($users as $user): ?>
	<ul class="navbar">
		<!-- Print this user's name -->
		
		<!-- If there exists a connection with this user, show a unfollow link -->
		<? if(isset($connections[$user['user_id']])): ?>
			
			<li class="navlist"><a href='/posts/unfollow/<?=$user['user_id']?>'><strong><?=$user['username']?> </strong></a></li>
		
		<!-- Otherwise, show the follow link -->
		<? else: ?>
			
			<li class="navlist"><a href='/posts/follow/<?=$user['user_id']?>'><span class="unfollowed"><?=$user['username']?></span></a></li>
		<? endif; ?>
	
	</ul>
	<? endforeach; ?>
	
</form>

</div>