<?php snippet('header') ?>

<div id="left"><?php snippet('models') ?></div>
<div id="right"><?php snippet('models') ?></div>

<h1 data-title="<?= $site->title()->escape() ?>"><?= $site->title()->html() ?></h1>

<div id="models-list">
	<?php foreach ($models as $key => $model): ?>
		<a href="<?= $model->url() ?>"><?= $model->title()->html() ?></a>
	<?php endforeach ?>
</div>

<?php snippet('footer') ?>