<?php /* Template Name: MatchLearn · Preguntes freqüents */ get_header(); ?>
<main id="contingut" class="detail-page">
<section id="preguntes" class="section faq-section"><div class="container faq-grid"><div><p class="eyebrow">ABANS DE FER EL PAS</p><h1>També resolem<br>aquests dubtes.</h1><p>La confiança comença<br>amb les coses clares.</p></div><div class="faqs">
<?php $faqs = array(
'A qui s’adreça MatchLearn?' => 'A estudiants universitaris, de cicles formatius de grau superior i d’especialitzacions que necessiten reforç, i a persones graduades que volen compartir els seus coneixements.',
'Ja puc reservar una tutoria?' => 'Obre «Reserva una classe», escull la matèria, el tipus de suport i un horari. Revisa la durada i el resum abans de continuar. Pots consultar la sessió preparada a «Les meves sessions».',
'Com es faran les sessions?' => 'Preparem cada sessió al voltant del teu dubte: repassar el concepte, treballar un exemple i practicar pel teu compte. L’aula inclou un pla de treball i una valoració final.',
'Qui podrà oferir classes?' => 'Graduats que acreditin la seva titulació en l’àmbit de la tutoria. La verificació de titulacions forma part del procés que proposem; no anunciem cap conveni institucional com si ja estigués signat.',
'Em fareu els treballs o els exàmens?' => 'No. T’ajudarem a entendre la matèria, practicar i resoldre dubtes. L’aprenentatge i l’autoria dels teus treballs sempre són teus.',
'Quant costarà i com es pagarà?' => 'La presentació del projecte preveu un preu mitjà de 12 € per hora, amb una comissió de plataforma del 20 %. El resum calcula l’import segons la durada escollida. El pas final informa de les condicions abans de continuar; no cal introduir dades bancàries.',
); foreach ($faqs as $q => $a): ?><details><summary><?php echo esc_html($q); ?><span aria-hidden="true">+</span></summary><p><?php echo esc_html($a); ?></p></details><?php endforeach; ?>
</div></div></section>

</main><?php get_footer(); ?>
