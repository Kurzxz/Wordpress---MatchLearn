<!doctype html>
<html <?php if (is_front_page() || ml_is_custom_page()) { echo 'lang="ca"'; } else { language_attributes(); } ?>>
<head><meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width, initial-scale=1"><?php wp_head(); ?></head>
<body <?php body_class(); ?>><?php wp_body_open(); ?>
<a class="skip-link" href="#contingut">Salta al contingut</a>
<header class="site-header"><div class="container nav-wrap">
<a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="MatchLearn · Inici"><span class="brand-star"><?php echo ml_star(); ?></span>matchlearn<span class="brand-dot">.</span></a>
<button class="menu-toggle" aria-expanded="false" aria-controls="main-nav">Menú <span aria-hidden="true">☰</span></button>
<nav id="main-nav" aria-label="Navegació principal">
<a href="<?php echo esc_url(home_url('/com-funciona/')); ?>">Com funciona</a><a href="<?php echo esc_url(home_url('/materies/')); ?>">Matèries</a><a href="<?php echo esc_url(home_url('/projecte/')); ?>">Projecte</a><a href="<?php echo esc_url(home_url('/tutors/')); ?>">Tutors</a><a href="<?php echo esc_url(home_url('/fes-te-tutor/')); ?>">Fes-te tutor</a><a class="nav-booking" href="<?php echo esc_url(home_url('/reserva/')); ?>">Reserva una classe <span class="ml-arrow" aria-hidden="true"></span></a>
</nav></div></header>
