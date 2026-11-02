<?php get_header(); ?>
<main id="contingut" class="container section content-page">
<?php if (have_posts()): while (have_posts()): the_post(); ?>
<article <?php post_class(); ?>><h1><?php if (!is_singular()): ?><a href="<?php the_permalink(); ?>"><?php endif; ?><?php the_title(); ?><?php if (!is_singular()): ?></a><?php endif; ?></h1><div class="entry-content"><?php if (is_singular()) { the_content(); } else { the_excerpt(); } ?></div></article>
<?php endwhile; the_posts_pagination(); else: ?><h1>No hem trobat aquesta pàgina.</h1><a class="button primary" href="<?php echo esc_url(home_url('/')); ?>">Torna a l'inici</a><?php endif; ?>
</main><?php get_footer(); ?>
