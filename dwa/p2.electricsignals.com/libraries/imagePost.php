<?

/*-------------------------------------------------------------------------------------------------
	http://techstream.org/Web-Development/PHP/Single-File-Upload-With-PHP
	-------------------------------------------------------------------------------------------------*/

class ImagePost {	
	public function imagepost() {

		if(isset($_FILES['image'])){

			$errors     = array();
			$file_ext   = strtolower(strrchr($_FILES['image']['name'], '.'));
			$file_name  = $_POST['user_id'].$file_ext;			
			$file_size  = $_FILES['image']['size'];
			$file_tmp   = $_FILES['image']['tmp_name'];
			$file_type  = $_FILES['image']['type'];   

			$extensions = array(".jpeg",".jpg",".png",".gif"); 		

			if(in_array($file_ext,$extensions) === false){
				Router::redirect("/users/edit-avatar?error=Only jpg, png or gif images please.");
			}

			if($file_size > 2097152) {
				Router::redirect("/users/edit-avatar?error=Your file size was too large; please choose an image smaller than 2mb");
			}				
			if(empty($errors)==true) {
				move_uploaded_file($file_tmp, APP_PATH.AVATAR_PATH.$file_name);

				# Save to database
					DB::instance(DB_NAME)->update("users", Array("avatar" => $file_name), "WHERE user_id = ".$_POST['user_id']);

				# Create small (thumb)

					$imgObj = new Image(APP_PATH.AVATAR_PATH.$file_name);

					$small = Utils::postfix("_".SMALL_W."_".SMALL_H, APP_PATH.AVATAR_PATH.$file_name);

					$imgObj->resize(SMALL_W, SMALL_H, 'crop');
					$imgObj->save_image($small, 100);

				# Send them back to their profile
					Router::redirect("/users/edit-profile/");

			} else {
				Router::redirect("/users/edit-avatar?error=There was an error uploading your image.");
			}

		}			
	}
};