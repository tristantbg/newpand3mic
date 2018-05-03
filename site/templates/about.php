<?php snippet('header') ?>

<a id="back" href="<?= $page->parent()->url() ?>"></a>

<?php if ($page->text()->isNotEmpty()): ?>
	<div id="about">
		<?= $page->text()->kt() ?>
	</div>
<?php endif ?>

<?php if ($page->press()->isNotEmpty()): ?>
	<div id="press">
		<span class="title">PRESS</span><?= $page->press()->ktRaw() ?>
	</div>
<?php endif ?>

<div id="credits">
	<div><?= date('Y') ?> Copyrights. All Rights Reserved <?= $site->title()->html() ?></div>
	<div>Pictures By <a href="http://www.richardkern.com/">Richard Kern</a></div>
	<div>Website By <a href="http://httb.eu">HTTB.EU</a></div>
</div>

<?php snippet('footer') ?>