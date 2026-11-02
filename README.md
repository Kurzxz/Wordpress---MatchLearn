# MatchLearn · WordPress 1.1.0

Web en català del projecte d’Arnau Taure i Joel Martínez. Publicada a https://matchlearn.cat/. El prototip de la segona diapositiva d’«Espavila_presentacion.pptx.pdf» inspira la fitxa d’Aleix García: avatar, assignatures, preu i calendari setmanal.

## Pàgines separades

| URL | Plantilla del tema |
| --- | --- |
| `/` | `front-page.php` |
| `/reserva/` | `page-reserva.php` |
| `/tutors/` | `page-tutors.php` |
| `/tutor-aleix/` | `page-aleix.php` |
| `/fes-te-tutor/` | `page-graduats.php` |
| `/materies/` | `page-materies.php` |
| `/com-funciona/` | `page-com-funciona.php` |
| `/projecte/` | `page-projecte.php` |
| `/preguntes-frequents/` | `page-preguntes.php` |
| `/cookies/`, `/privacitat/` | Contingut WordPress, còpia a `content/` |

La portada és breu i la navegació porta a les pàgines. Els crèdits d’IA apareixen al costat de les il·lustracions, no al final. No hi ha fotografies de tutors ni testimonis inventats. Aleix prové del perfil del prototip aportat pels autors; no s’afirma haver verificat realment la seva titulació.

## Funcions

- Matèries filtrables i cerca que ignora accents.
- Calendari accessible amb els cinc pròxims dies feiners, franges disponibles i selecció visible.
- Dia i hora passen del perfil a la reserva; les sessions de dues hores requereixen dues franges consecutives disponibles.
- Reserva en tres passos, càlcul d’import i aula amb pla de treball i valoració.
- «Les meves sessions» conserva un resum a `sessionStorage`: es pot reprendre o eliminar i sobreviu a la recàrrega de la mateixa pestanya.
- Candidatura de graduat amb especialitat, disponibilitat i compromís d’integritat acadèmica.
- SureCookie existent configurat en català, colors del tema i enllaços a galetes i privacitat.

Les reserves continuen sent el recorregut acadèmic demanat per l’usuari. No envien una reserva a cap tutor, no creen comptes, no activen una càmera i no cobren diners. No es demanen dades personals ni bancàries. Aquesta limitació s’explica al pas de confirmació; s’han eliminat els avisos repetits de simulació de portada i botons. Els perfils dels àmbits sense tutor associat indiquen «Tutor pendent d’assignació».

## Instal·lació i actualització

A WordPress: **Aparença → Temes → Afegeix → Penja el tema**, tria `dist/matchlearn.zip` i activa MatchLearn. Si ja està actiu, substitueix la versió instal·lada. Conserva còpia de seguretat i el tema anterior.

En una instal·lació nova, crea les pàgines de la taula amb els seus slugs i assigna la plantilla corresponent. Pujar només el ZIP no crea les pàgines automàticament. A matchlearn.cat ja estan creades; els IDs són a `content/published-pages.json`. Usa el català a Configuració → General. Si Varnish conserva una versió antiga, purga la caché des de Dinahosting.

El tema no necessita Elementor ni un plugin de reserves. Al lloc actual s’ha desactivat Ultimate Addons for Elementor perquè substituïa el footer. La resta de plugins s’han conservat. El tema omet assets Elementor només a les pàgines pròpies; el contingut Elementor preexistent d’altres pàgines es conserva.

## Edició

Els textos són a les plantilles PHP i els estils a `assets/site.css`. No són plantilles Elementor. **Aparença → Personalitza → MatchLearn · Configuració** permet editar la introducció i configurar un correu públic o destinacions externes opcionals. Per aquest projecte, deixa buides les URL externes de reserves.

## Continuació i proves

Llegeix **CONTINUAR.md** abans de canviar el lloc. Els scripts a `tools/deploy/` no contenen credencials. Cada tasca de Codex ja és aïllada: fes servir el checkout existent sense crear un worktree addicional.

Prova principal: `multipage-test.cjs` amb Node, Playwright 1.56.1 i Chromium. `ML_TEST_URL=https://matchlearn.cat` selecciona el lloc públic; sense variable utilitza WordPress Playground al port 9400. El blueprint local crea les pàgines per validar-les. Les dependències de desenvolupament no calen al hosting.

Evidència a `dist/VALIDACIO.txt` i captures a `dist/`. El ZIP conté només el tema; no conté contrasenyes, sessions, PDF originals ni bases de dades.
