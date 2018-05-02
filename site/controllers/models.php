<?php

return function ($site, $pages, $page) {

	return array(
		'models' => $page->children()->visible()
	);
}

?>
