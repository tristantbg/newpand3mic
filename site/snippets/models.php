<div class="content">
	<?php foreach ($models->shuffle() as $key => $model): ?>
	
		<?php if($model->featured()->isNotEmpty() && $featured = $model->featured()->toFile()): ?>
	
			<div class="model-item" data-title="<?= $model->title()->escape() ?>">
				<a href="<?= $model->url() ?>">
					<div class="image"><?php snippet('responsive-image', array('field' => $model->featured(), 'preload' => true)) ?></div>
					<div class="title"><?= $model->title()->html() ?></div>
				</a>
			</div>
	
		<?php endif ?>
	
	<?php endforeach ?>
</div>