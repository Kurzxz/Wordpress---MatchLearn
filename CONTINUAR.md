# Continuar MatchLearn — estat actual

Actualitzat el 2 de novembre de 2026. Tot el codi i el resum s’han de conservar a GitHub per continuar des d’un altre ordinador.

## Últimes instruccions de l’usuari
- Web en català basada en el projecte d’Arnau Taure i Joel Martínez.
- El servei és acadèmic, amb reserves/pagaments sense operacions reals, però sense avisos repetits de «fictici» o «simulació» a la portada i botons.
- Reproduir la fitxa del tutor de la **segona diapositiva** de la presentació: Aleix García, avatar, assignatures, 12 €/hora i calendari setmanal.
- Crear **pàgines separades**, no concentrar tot a la portada.
- Crèdits d’IA al costat de les il·lustracions, no al final.
- Publicar a WordPress i guardar-ho a GitHub. L’usuari ha purgat Varnish a Dinahosting.

## Publicació completada
Tema **MatchLearn 1.1.0** instal·lat i actiu a https://matchlearn.cat/. Font i dist/matchlearn.zip coincideixen amb el paquet pujat. Astra es conserva per revertir.

Pàgines noves publicades (taula completa i plantilles a README.md):
- reserva: 1973
- tutors: 1974
- tutor-aleix: 1975
- fes-te-tutor: 1976
- materies: 1977
- com-funciona: 1978
- projecte: 1979
- preguntes-frequents: 1980
- privacitat: 1981
- cookies: 1982

La portada continua sent la pàgina 1859 (títol Inici), show_on_front=page i page_for_posts=0. El contingut Elementor antic es conserva a la base de dades, però la plantilla front-page.php el substitueix visualment. No s’han eliminat pàgines preexistents.

## Funcionalitat i límits reals
- Perfil Aleix fidel a la composició de la diapositiva, amb nota discreta de procedència del prototip i crèdit de l’avatar. No s’ha posat un segell fals de titulació verificada.
- Calendari amb cinc dies feiners futurs segons Europe/Madrid. Les franges són dades del recorregut acadèmic, no agenda d’un tutor real. La selecció passa a la reserva per paràmetres validats.
- Matèries → reserva; perfil → reserva; resum → confirmació → aula → valoració.
- Durades d’una o dues hores; dues hores només si hi ha franges consecutives. Total 12 €/hora.
- Aleix associat a Matemàtiques, Programació i Bases de dades. Altres matèries mostren «Tutor pendent d’assignació».
- Resum desat només a sessionStorage en la pestanya, sense nom, correu ni targeta. Es pot reprendre/eliminar. No es crea un compte, no s’envia reserva a tercers, no es connecta càmera i no es cobra. La confirmació explica això de manera breu.
- Preferències de graduat i valoració no s’envien ni es desen al servidor.

## Extensions i configuració
- No s’han instal·lat plugins addicionals.
- Ultimate Addons for Elementor (header-footer-elementor/header-footer-elementor.php) continua desactivat perquè reemplaçava el footer del tema; configuració conservada.
- Elementor i PRO Elements continuen actius per a contingut preexistent. El tema exclou els seus assets de la portada i plantilles pròpies per evitar `elementorFrontendConfig is not defined`.
- WooCommerce i WooPayments continuen actius, però el recorregut del tema no els utilitza.
- SureCookie existent: textos/categories en català, bloqueig preservat, colors ajustats amb custom_css, enllaços a polítiques 1981 i 1982. No s’ha desactivat el consentiment.
- SureRank: títol i descripcions de portada en català; eliminada descripció antiga anglesa. L’última descripció presenta tutors, horaris i classes sense avisos repetits de simulació.
- SureForms, SureMail, Starter Templates, Presto Player i AI Provider for OpenAI preservats; Akismet inactiu.

## Validació i caché
PASS en WordPress Playground local i PASS al lloc públic amb tools/deploy/multipage-test.cjs: 9 pàgines de producte, idioma, enllaços, cerca, calendari, transmissió d’horaris, franges consecutives, càlcul, reserva, emmagatzematge/recàrrega/eliminació, aula, valoració, candidatura, mòbil i cap error JS. Captures públiques a dist/, incloent tutor i reserva. Evidència a dist/VALIDACIO.txt.

La portada NORMAL ha respost amb versió 1.1.0 i Age: 0 després de la purga de Varnish. Les proves també usen query únic per evitar còpies intermèdies. urllib ha rebut algun 429 amb peticions seguides; no fer bucles de reintents. Usar el navegador i espaiar comprovacions si passa. El desplegament i les proves principals han acabat.

## Continuar sense repetir feina
Llegir primer aquest fitxer, README.md i git status. No tornar a crear pàgines ni reexecutar configuracions si l’usuari no ho demana. IDs a content/published-pages.json. La maquetació és del tema PHP, no Elementor. Els textos de cookies i privacitat són pàgines WordPress amb còpia a content/.

Eines a tools/deploy/:
- browser-login.cjs i admin.cjs: accés autenticat.
- update-theme.cjs: substitució del ZIP existent (install.cjs era només primera instal·lació).
- publish-pages.cjs: creació/configuració de pàgines, polítiques i cookies; ja executat.
- multipage-test.cjs: prova vigent. public-test.cjs és antic per a 1.0.x i no reflecteix la navegació actual.
- blueprint-multipage.json: WordPress Playground local, crea pàgines.

Els scripts conserven rutes /workspace/matchlearn-tools i /workspace/Wordpress---MatchLearn: adaptar-les si es canvia d’entorn. content/pages.json conté la llista per provisionar una instal·lació nova. Playwright 1.56.1, Node i Chromium per a les proves; no calen al hosting. Els snapshots privats són fora del repositori a /workspace/matchlearn-tools/deploy.

## Credencials
MATCHLEARN_WP_USER i MATCHLEARN_WP_PASSWORD s’injecten de manera segura a l’entorn per a matchlearn.cat. Comprovar presència i readiness. Mai copiar valors/cookies/nonces al Git ni al xat. Login amb Playwright, Chromium i el proxy HTTPS de l’entorn; no desactivar TLS. urllib login va retornar 406. Estat temporal privat /tmp/matchlearn-wp-browser-session.json: pot caducar i no està garantit en altres màquines. Tornar a iniciar sessió si cal.

## Reversió
Reactivar Astra i, si cal el peu antic, Ultimate Addons for Elementor. Els continguts preexistents es conserven. Versions anteriors del tema a l’historial Git. No esborrar les pàgines noves automàticament.
