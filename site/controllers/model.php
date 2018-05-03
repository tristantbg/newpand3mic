<?php

return function ($site, $pages, $page) {

	return array(
		'models' => $site->homePage()->children()->visible(),
		'images' => $page->medias()->toStructure(),
	);
}

?>
