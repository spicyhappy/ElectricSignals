<div class="box follow">
<form method='POST' action='/posts/p_follow'>
	<li class="navlist">Following</li>
	<?php foreach($users as $user): ?>
	<ul class="navbar">
		<!-- Print this user's name -->

		<!-- If there exists a connection with this user, show a unfollow link -->
		<?php if(isset($connections[$user['user_id']])): ?>

			<li class="navlist"><a href='/posts/unfollow/<?php echo $user['user_id']?>'><strong><?php echo $user['username']?> </strong></a></li>

		<!-- Otherwise, show the follow link -->
		<?php else: ?>

			<li class="navlist"><a href='/posts/follow/<?php echo $user['user_id']?>'><span class="unfollowed"><?php echo $user['username']?></span></a></li>
		<?php endif; ?>

	</ul>
	<?php endforeach; ?>

</form>

</div>