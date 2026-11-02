# Continuar MatchLearn

Última actualització: 2 de novembre de 2026.

## Petició de l’usuari
Publicar el tema a https://matchlearn.cat/, revisar extensions i conservar tot per continuar des d’un altre ordinador. Web en català; reserves, tutors i pagaments simulats. Últim canvi: els crèdits d’IA han d’aparèixer al costat de la il·lustració, NO al final. Últim missatge: guardar ara, perquè s’acaben els tokens.

## Publicat i comprovat
- Tema MatchLearn 1.0.0 instal·lat i activat a WordPress. Astra conservat per revertir.
- La portada estàtica és la pàgina 1859; show_on_front=page; page_for_posts=0.
- Títol de la pàgina canviat de Home a Inici i extracte canviat a una descripció catalana.
- S’ha desactivat exclusivament Ultimate Addons for Elementor (header-footer-elementor/header-footer-elementor.php), perquè substituïa el footer del tema pel de la plantilla anglesa i ocultava els crèdits i la simulació. Configuració conservada.
- No s’han instal·lat extensions addicionals. Elementor, PRO Elements, WooCommerce, WooPayments, SureCookie, SureForms, SureMail, SureRank, Starter Templates, Presto Player i AI Provider for OpenAI continuen actius; Akismet continua inactiu.
- Les proves públiques van completar filtres, cerca, reserva, import, pagament simulat, aula, valoració, candidatura i menú mòbil. La prova global falla per un error de JS d’Elementor: elementorFrontendConfig is not defined. No marcar-la com a passada íntegrament.
- El consentiment de SureCookie s’ha d’acceptar només amb galetes necessàries abans de les proves de navegació. La càrrega amb paràmetre de consulta va evitar una resposta antiga de la portada; cal verificar també la URL normal.

## Font i ZIP nous, encara NO desplegats
La versió local 1.0.1 i dist/matchlearn.zip inclouen:
- Crèdits extrets a credits.php, després de la il·lustració de portada i abans de la franja de públic; eliminats del footer.
- Exclusió dels assets Elementor a la portada personalitzada per evitar l’error de configuració. Les pàgines interiors retenen Elementor. Aquest canvi encara necessita prova.
- Versió dels assets incrementada a 1.0.1.
El ZIP s’ha comprovat i correspon al codi font. Les captures a dist/ i dist/VALIDACIO.txt són de les proves LOCALS de 1.0.0; no certifiquen la nova versió ni el desplegament públic.

## Següents passos
1. SureCookie ja s’ha traduït al català: guardat confirmat amb HTTP 200 i success=true. Cal comprovar visualment els textos. La configuració SEO anterior està desada localment a seo-before.json; SureRank encara té auto_generate_description=true i page_description=%content%.
2. Ajustar SureRank: encara arrossegava la descripció anglesa de la plantilla (Build Skills That Build Your Future). Llegir la configuració real abans d’editar-la.
3. Desplegar el ZIP 1.0.1 via Aparença → Temes → Penja el tema. Com que ja existeix, confirmar la substitució amb la versió nova; no eliminar el tema actiu. Després provar portada, crèdits, cookies i els dos recorreguts.
4. Comprovar errors JS i aspecte mòbil/escriptori, actualitzar captures i evidència. Si persisteix l’error Elementor, investigar els assets abans de desactivar altres extensions.
5. Confirmar publicació amb l’usuari i pujar qualsevol correcció a main.

## Accés segur i eines locals
Les credencials estan configurades a l’entorn Codex com MATCHLEARN_WP_USER i el secret MATCHLEARN_WP_PASSWORD per a matchlearn.cat. No copiar valors, cookies, nonces o contrasenyes a GitHub ni al xat. En un altre entorn cal comprovar que s’hi injectin abans de començar.

El formulari wp-login.php rebutja intents urllib amb HTTP 406, fins i tot buits. El login real amb Playwright/Chromium i el proxy HTTPS configurat FUNCIONA. Respectar TLS; no usar ignoreHTTPSErrors.

En l’entorn actual, eines fora del repo:
- /workspace/matchlearn-tools/deploy/browser-login.cjs: login amb variables d’entorn. Desa sessió privada a /tmp/matchlearn-wp-browser-session.json.
- admin.cjs: obre navegador autenticat.
- install.cjs: instal·lació inicial (cal adaptar per substitució).
- inspect.cjs: llegeix plugins, tema i portada.
- finish-settings.cjs: traducció del consentiment i lectura de SEO.
- /workspace/matchlearn-tools/public-test.cjs: proves públiques.
- /workspace/matchlearn-tools/deploy/ conté còpies privades de configuració i captures. NO pujar aquesta carpeta indiscriminadament: conté contingut administratiu i estat anterior.

La sessió autenticada pot caducar i els fitxers /tmp no estan garantits en un altre entorn. No assumir que passen a l’altre ordinador. El repositori és la font compartida de codi i d’aquest resum. Dependències de desenvolupament: @wp-playground/cli 3.1.62 i playwright 1.56.1; Chromium del sistema. No calen al hosting.
