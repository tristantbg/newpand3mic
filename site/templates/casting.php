<?php snippet('header') ?>

<a id="back" href="<?= $page->parent()->url() ?>"></a>

<div id="casting">
	<?php foreach ($page->entries()->toStructure() as $key => $item): ?>
	
		<div class="casting-item">
			<div class="title"><?= $item->title()->html() ?></div>
			<?php if ($thumb = $item->image()->toFile()): ?>
				<div class="image"><?php snippet('responsive-image', array('field' => $item->image(), 'preload' => true)) ?></div>
			<?php endif ?>
		</div>
	
	<?php endforeach ?>
</div>

<?php snippet('footer') ?>