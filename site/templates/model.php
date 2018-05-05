<?php snippet('header') ?>
	
<div class="slider">

	<?php foreach ($images as $key => $image): ?>

		<?php if($image = $image->toFile()): ?>

		<?php
			$placeholder = $image->width(50)->url();
			$src = $image->width(1000)->url();
			$srcset = $image->width(500)->url() . ' 500w,';
			for ($i = 1000; $i <= 3000; $i += 1000) $srcset .= $image->width($i)->url() . ' ' . $i . 'w,';
		?>

		<div class="slide">
			<div class="content image <?= $image->contentSize() ?>">
				<img 
				class="lazy lazyload lazypreload" 
				src="<?= $placeholder ?>" 
				data-flickity-lazyload="<?= $image->height(1500)->url() ?>" 
				data-srcset="<?= $srcset ?>" 
				alt="<?= $page->title()->html().' - © '.$site->title()->html() ?>" 
				height="100%" 
				sizes="auto"
				optimumx="1.5" 
				width="auto" />
				<noscript>
					<img src="<?= $image->width(1500)->url() ?>" alt="<?= $page->title()->html().' - © '.$site->title()->html() ?>" height="100%" width="auto" />
				</noscript>
			</div>

		</div>

		<?php endif ?>

	<?php endforeach ?>

</div>

<h1><?= $page->title()->html() ?></h1>

<div id="model-infos">
	<?php foreach ($page->text()->toStructure() as $key => $info): ?>
		<div class="info-item">
			<div><?= $info->title()->html() ?></div>
			<div><?= $info->text()->kt() ?></div>
		</div>
	<?php endforeach ?>
</div>

<div id="models-list">
	<?php foreach ($models as $key => $model): ?>
		<a href="<?= $model->url() ?>"><?= $model->title()->html() ?></a>
	<?php endforeach ?>
</div>

<?php snippet('footer') ?>