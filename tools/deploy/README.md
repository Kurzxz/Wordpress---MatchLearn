# Eines de continuació

Scripts utilitzats durant el desplegament, sense credencials. Llegiu CONTINUAR.md abans d’executar-los. Requereixen Node, Chromium i Playwright 1.56.1 (`npm install --prefix tools/deploy --no-save playwright@1.56.1`).

`browser-login.cjs` llegeix MATCHLEARN_WP_USER i MATCHLEARN_WP_PASSWORD de l’entorn i desa una sessió privada temporal. No afegiu mai el fitxer de sessió a Git. `admin.cjs` reutilitza aquesta sessió.

Els scripts són una còpia del treball de l’entorn original i encara contenen rutes /workspace/matchlearn-tools i /workspace/Wordpress---MatchLearn. Adapteu les rutes i creeu les carpetes necessàries abans d’utilitzar-los en un altre entorn. install.cjs correspon a la primera instal·lació: cal afegir el pas de substitució per actualitzar el tema existent. Els scripts que muten configuració no s’han de repetir sense comprovar l’estat actual.

Les sessions, respostes administratives i còpies privades de configuració queden fora del repositori. Per a una altra màquina, torneu a iniciar sessió amb les variables segures de Codex.
