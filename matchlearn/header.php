<!doctype html>
<html <?php if (is_front_page()) { echo 'lang="ca"'; } else { language_attributes(); } ?>>
<head><meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width, initial-scale=1"><?php wp_head(); ?></head>
<body <?php body_class(); ?>><?php wp_body_open(); ?>
<a class="skip-link" href="#contingut">Salta al contingut</a>
<div class="demo-bar">PROJECTE DE SÍNTESI · Reserves, tutors i pagaments simulats. Cap càrrec real.</div>
<header class="site-header"><div class="container nav-wrap">
<a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="MatchLearn · Inici"><span class="brand-star"><?php echo ml_star(); ?></span>matchlearn<span class="brand-dot">.</span></a>
<button class="menu-toggle" aria-expanded="false" aria-controls="main-nav">Menú <span aria-hidden="true">☰</span></button>
<nav id="main-nav" aria-label="Navegació principal">
<a href="<?php echo esc_url(home_url('/#com-funciona')); ?>">Com funciona</a><a href="<?php echo esc_url(home_url('/#materies')); ?>">Les matèries</a><a href="<?php echo esc_url(home_url('/#projecte')); ?>">El projecte</a><a class="nav-tutor" href="<?php echo esc_url(home_url('/#graduats')); ?>">Vull ser tutor <span aria-hidden="true">↗</span></a>
</nav></div></header>
