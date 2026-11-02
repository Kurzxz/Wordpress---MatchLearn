<?php
if (!defined('ABSPATH')) { exit; }
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
    add_theme_support('custom-logo');
    register_nav_menus(array('footer' => 'Enllaços legals del peu'));
});
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('matchlearn', get_theme_file_uri('/assets/site.css'), array(), '1.1.0');
    wp_enqueue_script('matchlearn', get_theme_file_uri('/assets/site.js'), array(), '1.1.0', true);
});
add_action('customize_register', function ($customizer) {
    $customizer->add_section('ml_settings', array('title' => 'MatchLearn · Configuració', 'priority' => 30));
    $settings = array(
        'ml_email' => array('Correu públic de contacte', 'email', 'sanitize_email'),
        'ml_booking' => array('URL del servei real de reserves (opcional)', 'url', 'esc_url_raw'),
        'ml_tutors' => array('URL del formulari real per a graduats (opcional)', 'url', 'esc_url_raw'),
        'ml_intro' => array('Text de presentació', 'textarea', 'sanitize_textarea_field'),
    );
    foreach ($settings as $key => $setting) {
        $customizer->add_setting($key, array('default' => '', 'sanitize_callback' => $setting[2]));
        $customizer->add_control($key, array('label' => $setting[0], 'section' => 'ml_settings', 'type' => $setting[1]));
    }
});
function ml_link($key) { return get_theme_mod($key) ?: home_url('/#comencem'); }
function ml_star() { return '<svg viewBox="0 0 40 40" aria-hidden="true"><path fill="currentColor" d="M20 0 25 14 40 20 25 25 20 40 14 25 0 20 14 14Z"/></svg>'; }

// The bespoke front page does not render Elementor content. Avoid loading its
// frontend bundles here; existing interior Elementor pages retain their assets.
add_action('wp_enqueue_scripts', function () {
    if ((!is_front_page() && !ml_is_custom_page()) || isset($_GET['elementor-preview'])) { return; }
    foreach (array(wp_scripts(), wp_styles()) as $registry) {
        foreach ($registry->queue as $handle) {
            if (strpos($handle, 'elementor') === 0 || strpos($handle, 'e-animation') === 0) {
                $registry->dequeue($handle);
            }
        }
    }
}, 1000);

function ml_is_custom_page() {
    return is_page_template(array('page-reserva.php','page-tutors.php','page-graduats.php','page-com-funciona.php','page-materies.php','page-projecte.php','page-preguntes.php','page-aleix.php'));
}
