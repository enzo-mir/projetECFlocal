VOICI L'EXECUTION EN LOCAL

##

Je n'ais volontairement pas fait qu'une version éditable en fonction du local ou en en ligne car il aurrait fallus changer beacoup de chose :

- le proxy pour la liasons aux apis
- la liasons avec la BDD en ligne
- le body pars côtés server

Voici donc les 3 changements principaux du passe en ligna a local.

##

EDITION BDD

Si l'exécution en local se fait via autre chose que XAMPP qui nécessite un mot de passe pour sa BDD ,éditer la variable bddConfig:

- Cf : ~server/server.js -> l.28

##

EXECUTION DES SCRIPTS

- Activez la liaison Appache et MySQL 
- ouvrir 2 terminals (VsCode à la racine du projet) 
- dans l'un tappez : npm run startserve
- dans le deuxième : npm run startclient

=>L'application react s'ouvriera directement (au port 3000 du localhost normallement) 

##

GESTION DE L'ADMIN ET DE LA BDD

-   Le profil admin et déja mis au démarrage de l'application tout comme la Base de donnée qui ce nommera ici `ecfprojet`
-   Pour accéder à l'espace admin en ligne comme en local il faudra se connecter sur l'application avec les données suivantes :
    -   Adresse e-mail : admin@admin.com
    -   Mot de passe : admin
Et une route privé vous serra réservé.

##

FICHIERS ALIMENTATION ET CRÉATION DE LA BDD 

chemin : ~server/server.js
