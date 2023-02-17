VOICI L'EXECUTION EN LOCAL

##

Je n'ai volontairement pas fait qu'une version éditable en fonction du local ou en en ligne car il aurrait fallut changer beacoup de choses :

- le proxy pour les liaisons aux APIs
- les liaisons avec la BDD en ligne
- le body parse côtés serveur

Voici donc les 3 changements principaux du passage en ligne à local.

##

EXECUTION DES SCRIPTS

- Ouvrez un terminal et tapez : git clone https://github.com/enzo-mir/projetECFlocal.git
- Activez la liaison Appache et MySQL 
- Ouvrir 2 terminals (VsCode à la racine du projet) 
- Dans l'un tapez : npm run startserve
- Dans le deuxième :
    -   la première fois `npm run startInstallclient` => qui installe des dépendance react et lance l'app
    -   les autres fois `npm run startclient` => lance l'app


=>L'application react s'ouvrira directement (au port 3000 du localhost normallement) 

##

EDITION BDD

Si l'exécution en local se fait via autre chose que XAMPP qui nécessite un mot de passe pour sa BDD, éditez la variable `bddConfig`:

- Cf : ~server/server.js -> l.28

##

GESTION DE L'ADMIN ET DE LA BDD

-   Le profil admin est déja inséré au démarrage de l'application tout comme la base de donnée qui se nommera ici `ecfprojet`
-   Pour accéder à l'espace admin en ligne comme en local il faudra se connecter sur l'application avec les données suivantes :
    -   Adresse e-mail : admin@admin.com
    -   Mot de passe : admin

# Et une route privée vous serra réservé.

FICHIERS ALIMENTATION ET CRÉATION DE LA BDD 

chemin : ~server/server.js
