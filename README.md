# MatchLearn · Tema WordPress

Web en català per al projecte d'Arnau Taure i Joel Martínez, basat en els documents «IDEA PROJ.pdf» i «Espavila_presentacion.pptx.pdf». El nom públic és MatchLearn. La paleta blava, l'estrella vermella i el reforç entre estudiants i graduats provenen de la proposta original.

## Instal·lació a Dinahosting

1. Accedeix a l'administració del teu WordPress. Conserva una còpia de seguretat i anota el tema actual abans d'activar-ne un altre.
2. Ves a **Aparença → Temes → Afegeix un tema nou → Penja el tema**.
3. Selecciona `dist/matchlearn.zip`, instal·la'l i activa **MatchLearn**. No cal descomprimir el ZIP ni instal·lar Elementor.
4. Obre la portada. El fitxer `front-page.php` mostra el disseny MatchLearn tant si la portada està configurada com a pàgina estàtica com si mostra les últimes entrades.
5. A **Configuració → General**, estableix el títol «MatchLearn» i l'idioma català. Si Dinahosting o algun connector té memòria cau, buida-la després d'activar el tema.

El tema no elimina pàgines, entrades ni configuració del tema anterior. La portada pròpia substitueix visualment el contingut de la pàgina d'inici mentre aquest tema està actiu. Les altres pàgines continuen disponibles amb la plantilla general.

## Què inclou

- Portada adaptable a mòbil, tauleta i escriptori.
- Explicació del servei, matèries filtrables i cerca que ignora accents.
- Model orientatiu de 12 €/hora i repartiment de la comissió.
- Secció per a graduats, projecte, valors, ODS i preguntes freqüents.
- Simulació de reserva: matèria → perfil fictici → horari → durada → pagament fictici → aula de mostra → valoració.
- Simulació de candidatura per a tutors, sense demanar noms ni documents.
- Crèdits del projecte i atribució explícita de les il·lustracions i del disseny assistits per IA.

Les simulacions s'executen al navegador i s'esborren en recarregar. No creen usuaris, no envien correus, no desen dades, no connecten una càmera i no cobren diners. Els perfils A i B són ficticis. Els 12 €/hora provenen de la presentació i no són una oferta comercial real. No hi ha passarel·la de pagament ni servei de videotrucades integrat.

## Personalització

**Aparença → Personalitza → MatchLearn · Configuració** permet canviar el text introductori i afegir un correu públic o un enllaç extern de reserves. El correu obre el gestor de correu del visitant. No s'utilitza el correu d'administració automàticament.

El botó de graduats executa sempre la simulació mentre JavaScript està actiu. La URL opcional de graduats s'utilitza només com a destinació alternativa sense JavaScript. Per a aquest projecte acadèmic, deixa buides les URL externes.

Els altres textos es troben a `matchlearn/front-page.php`, els crèdits a `credits.php`, just després de la capçalera visual, les pantalles simulades a `demo.php` i els estils a `assets/site.css`. Aquesta portada està feta a mida: no és una plantilla d'Elementor ni un conjunt de blocs editables des de l'editor de pàgines.

Es pot assignar un menú a **Enllaços legals del peu**. Si WordPress té una pàgina de privacitat publicada i assignada, el tema n'afegeix l'enllaç. Els textos legals reals depenen del titular i dels connectors instal·lats; no se n'han inventat dades. El tema no incorpora analítica, fonts remotes ni galetes pròpies. WordPress i altres connectors poden tenir-ne.

## Fitxers i crèdits

El ZIP conté només el tema, sense els PDF originals, credencials, dependències de desenvolupament ni base de dades. Les il·lustracions són SVG/CSS originals amb assistència d'OpenAI (ChatGPT/Codex); no hi ha fotografies de tercers. L'atribució apareix al costat de la portada visual, abans de la resta de seccions.

## Desenvolupament local

Cada tasca en aquest entorn ja està aïllada; utilitza aquest checkout sense crear un worktree addicional. Les eines de prova es troben fora del repositori, a `/workspace/matchlearn-tools`. S'ha preparat WordPress Playground amb WordPress 6.8, PHP 8.3 i SQLite per validar el tema sense dependre de Dinahosting.

Arrencada a l'entorn preparat:

```sh
/workspace/matchlearn-tools/node_modules/.bin/wp-playground-cli server \
  --wordpress-install-mode install-from-existing-files \
  --mount-before-install /workspace/matchlearn-tools/runtime/WordPress-6.8:/wordpress \
  --mount /workspace/Wordpress---MatchLearn/matchlearn:/wordpress/wp-content/themes/matchlearn \
  --blueprint /workspace/matchlearn-tools/blueprint.json --port 9400 --workers 1
```

Validació de navegació: `node /workspace/matchlearn-tools/check.cjs`.

La versió 1.0.0 ja està activada a Dinahosting. El ZIP actual és la versió 1.0.1, pendent de desplegar i validar: consulta `CONTINUAR.md` abans de continuar.
