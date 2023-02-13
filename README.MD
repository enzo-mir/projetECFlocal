VOICI L'EXECUTION EN LOCAL

##

Je n'ais volontairement pas fait qu'une version éditable en fonction du local en en ligne car il aurrait fallus changer beacoup de chose :

- le proxy pour la liasons aux apis
- la liasons avec la BDD en ligne
- le body pars côtés server

Voici donc les 3 changements principaux du passe en ligna a local.

##

EDITATION BDD

Si l'exécution en local se fait via autre chose que XAMPP qui nécessite un mot de passe pour sa BDD :

- Cf : ~server/server.js -> l.28

EXECUTION DEES SCRIPTS

##

- Activez la liaison Appache et MySQL 
- ouvrir 2 terminals (VsCode à la racine) 
- dans l'un tappez : npm run startserve
- dans le deuxième : npm run startclient
