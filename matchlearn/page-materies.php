<?php /* Template Name: MatchLearn · Matèries */ get_header(); ?>
<main id="contingut" class="detail-page">
<section id="materies" class="section subjects-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">CADA DUBTE TÉ UN PUNT DE PARTIDA</p><h1>Què se't resisteix?</h1></div><p>Tria la matèria que vols reforçar.<br>El següent pas és trobar el teu ritme.</p></div>
<div class="subject-tools"><div class="filters" role="group" aria-label="Filtra per àmbit"><button class="filter active" data-filter="all" aria-pressed="true">Totes les matèries</button><button class="filter" data-filter="tec" aria-pressed="false">Ciència i tecnologia</button><button class="filter" data-filter="soc" aria-pressed="false">Empresa i societat</button></div><label class="search-label"><span class="sr-only">Cerca una matèria</span><input id="subject-search" type="search" placeholder="Cerca una matèria…"><span aria-hidden="true">⌕</span></label></div>
<div class="subject-grid">
<?php $subjects = array(
array('tec', '∑', 'Matemàtiques', 'Càlcul, àlgebra i estadística', 'Universitat · FP superior'),
array('tec', '&lt;/&gt;', 'Programació', 'Algoritmes, codi i bases de dades', 'Universitat · FP superior'),
array('tec', '<span class="ml-arrow" aria-hidden="true"></span>', 'Física i enginyeria', 'Mecànica, circuits i problemes', 'Universitat · Especialitzacions'),
array('soc', '€', 'Economia i empresa', 'Comptabilitat, finances i gestió', 'Universitat · FP superior'),
array('soc', 'Aa', 'Comunicació i llengües', 'Expressió, anàlisi i presentacions', 'Universitat · Especialitzacions'),
array('tec', '⌘', 'Mòduls tècnics de FP', 'Informàtica i projectes tècnics', 'FP de grau superior'),
); foreach ($subjects as $s): ?>
<a class="subject-card" data-category="<?php echo esc_attr($s[0]); ?>" href="<?php echo esc_url(add_query_arg('materia', $s[2], home_url('/reserva/'))); ?>"><span class="subject-icon" aria-hidden="true"><?php echo $s[1]; ?></span><h3><?php echo esc_html($s[2]); ?></h3><p><?php echo esc_html($s[3]); ?></p><div><small><?php echo esc_html($s[4]); ?></small><span aria-hidden="true"><span class="ml-arrow" aria-hidden="true"></span></span></div></a>
<?php endforeach; ?></div><p id="subject-result" class="result-note" role="status" aria-live="polite">6 àmbits de reforç proposats</p>
</div></section>
<section class="section"><div class="container price-grid"><div><p class="eyebrow">EL TEU TEMPS. EL TEU RITME.</p><h2>Ajuda quan la necessites.<br>Només les hores<br>que necessites.</h2><p class="body-large">Un exercici que et bloqueja o una assignatura que necessita una empenta. El model de MatchLearn s'adapta a cada dubte, amb sessions individuals i pagament per hores.</p><a class="text-link" href="<?php echo esc_url(home_url('/preguntes-frequents/')); ?>">Resol els teus dubtes <span aria-hidden="true"><span class="ml-arrow" aria-hidden="true"></span></span></a></div><div class="price-card"><span class="pill">REFORÇ AL TEU RITME</span><p class="price">12 €<span>/ hora</span></p><p>Preu orientatiu per sessió individual.</p><hr><ul class="check-list"><li>Atenció individual, de tu a tu</li><li>Format en línia per videotrucada</li><li>Reforç centrat en la teva matèria</li></ul><div class="price-split"><span>Per al graduat <strong>9,60 €</strong></span><span>Comissió de plataforma <strong>2,40 € · 20 %</strong></span></div><small>Imports previstos per hora, abans de les obligacions fiscals del graduat. Revisa el resum de la sessió abans de confirmar.</small></div></div></section>

</main><?php get_footer(); ?>
