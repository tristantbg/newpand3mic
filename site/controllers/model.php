<?php

return function ($site, $pages, $page) {

	return array(
	'images' => $page->medias()->toStructure(),
	);
}

?>
