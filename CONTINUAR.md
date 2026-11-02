# Continuar MatchLearn

Estat desat el 2 de novembre de 2026. L’usuari vol conservar tot per continuar des d’un altre ordinador de Codex.

## Objectiu i decisions
Web WordPress en català a https://matchlearn.cat/, basada en els PDF del projecte d’Arnau Taure i Joel Martínez. Nom públic MatchLearn (als documents, Espavila). Tutors, reserves, pagaments i aula són simulats. No es cobren diners ni es desen dades personals en aquests recorreguts. L’usuari ha demanat posar els crèdits d’IA al costat de la il·lustració, no al final.

## Ja publicat
- Tema MatchLearn **1.0.1** instal·lat i activat. Font i ZIP actuals a GitHub coincideixen amb la versió pujada.
- Crèdits a `credits.php`, immediatament després de la il·lustració de portada. Eliminats del footer.
- Assets Elementor exclosos només de la portada personalitzada: resol l’error `elementorFrontendConfig is not defined`. Pàgines interiors conserven Elementor.
- Portada estàtica: pàgina 1859; show_on_front=page; page_for_posts=0. Títol canviat de Home a Inici i extracte en català.
- SureRank: títol i descripcions SEO/OpenGraph/Twitter en català, descripció automàtica desactivada per aquesta pàgina. Guardat confirmat HTTP 200 success=true i comprovat en la resposta pública fresca.
- SureCookie: missatge, botons, preferències, categories i contingut bloquejat traduïts al català. Guardat HTTP 200 success=true. Es manté el bloqueig i les preferències de consentiment; no s’han desactivat proteccions.
- Ultimate Addons for Elementor (header-footer-elementor/header-footer-elementor.php) desactivat perquè reemplaçava el footer propi amb la plantilla anglesa anterior, ocultant crèdits i simulació. Configuració conservada.
- Astra conservat per tornar enrere. No s’han eliminat pàgines ni instal·lat extensions noves.
- Elementor, PRO Elements, WooCommerce, WooPayments, SureCookie, SureForms, SureMail, SureRank, Starter Templates, Presto Player i AI Provider for OpenAI continuen actius; Akismet continua inactiu. Els pagaments del tema NO utilitzen WooPayments.

## Proves
`tools/deploy/public-test.cjs` ha completat correctament la navegació pública: filtres, cerca sense accents, reserva, import per durada, pagament simulat, aula, valoració, candidatura, menú mòbil i absència de desbordament a 390 px. Sense errors JavaScript. Les proves utilitzen `?ml-check=<timestamp>` per obtenir resposta fresca i consentiment de només galetes necessàries. Captures de la versió pública actual a `dist/matchlearn-desktop.png` i `dist/matchlearn-mobile.png`. Evidència a `dist/VALIDACIO.txt`.

## Únic pendent de publicació detectat: caché
La URL normal https://matchlearn.cat/ encara ha retornat HTML vell (Age: 695), mentre que una petició amb paràmetre únic retorna 1.0.1, crèdits nous i SEO català. No s’ha trobat cap control de caché al panell WordPress ni cap extensió de caché a la llista. PURGE va rebre HTTP 405; una petició amb Cache-Control no-cache va rebre 429. No continuar fent peticions repetitives.

Següent pas: demanar buidar la caché des del panell Dinahosting o comprovar-ne l’expiració més endavant. Es disposa d’accés WordPress, no d’accés al panell de hosting. Després comprovar la URL NORMAL sense paràmetres amb navegador nou: `site.js?ver=1.0.1`, crèdits abans de #materies, títol català, sense «Join Our Community». No donar per completada la propagació abans d’aquesta comprovació. No cal repetir desplegament ni totes les mutacions.

## Accés segur
Credencials configurades a l’entorn Codex com MATCHLEARN_WP_USER i el secret MATCHLEARN_WP_PASSWORD per a matchlearn.cat. Comprovar que siguin presents i ready si es canvia d’entorn. No posar valors, cookies, nonces o contrasenyes al repositori ni al xat.

Login urllib va rebre 406. **Playwright/Chromium amb el proxy HTTPS de l’entorn funciona.** No desactivar verificació TLS. `tools/deploy/browser-login.cjs` inicia sessió i guarda estat privat temporal a /tmp/matchlearn-wp-browser-session.json; pot caducar o no sobreviure a un canvi d’entorn. `admin.cjs` el reutilitza.

Scripts desats a `tools/deploy/`, sense secrets:
- inspect.cjs: lectura d’estat.
- install.cjs: instal·lació inicial; NO repetir per una actualització.
- update-theme.cjs: actualització amb confirmació de substitució.
- finish-settings.cjs: traducció del consentiment; ja executada.
- update-seo.cjs: configuració SEO; ja executada.
- public-test.cjs: proves públiques.

Llegir tools/deploy/README.md. Els scripts conserven rutes /workspace/matchlearn-tools i /workspace/Wordpress---MatchLearn: adaptar-les si cal. Instal·lar playwright 1.56.1 i disposar de Chromium. Les còpies privades d’estat anterior són a /workspace/matchlearn-tools/deploy (fora de Git); no incloure-les indiscriminadament perquè contenen dades administratives. No assumir que les cookies /tmp passen a un altre ordinador.

## Reversió
Activar Astra des d’Aparença → Temes i, si cal tornar a la plantilla antiga, reactivar Ultimate Addons for Elementor. La portada i els continguts Elementor no s’han esborrat. Les versions anteriors del tema estan a l’historial Git.
