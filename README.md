you can use the project directly on docker
```
docker-compose build
```
then when the build is done

```
docker-compose up
```

to access the website, go on http://localhost:8080
you'll notice there is already data in the page "fonction"


if you don't want to use docker, there is some change to do
first you modify inside src/server/model/index.js
replace `'mongodb://mongo:27017/dreamquark'` by `'mongodb://localhost:27017/dreamquark'`

then you have to import the data for the jobs
```
mongoimport --host localhost --db dreamquark --collection jobs --type json --file ./database.json
```

and the classic `npm install` then `npm start`


*************************************************

Tu dois réaliser ce test en JS avec au moins les technos suivantes : 

- Node.js avec Express.js
- GraphQL
- MongoDB

- React.js avec hooks
- Redux

## Application de gestion d'utilisateurs

### Features

- Créer un utilisateur avec nom, prénom, email et tout autre champs qui pourraient te faire plaisir 
- Créer des fonctions ( Squad leader, Squad member, Stagiaire ), avec relation de hiérarchie entre elles. Ces fonctions seront attribuées aux différents utilisateurs ( il est possible de passer de l'une à l'autre en suivant la hiérarchie, un Stagiaire ne peut en effet pas devenir Squad leader sans être member !) 
- Créer des équipes d'utilisateurs. Chaque équipe ne peut avoir qu'un seul Squad leader, deux Squad member et un stagiaire. Un Squad Leader ne peut appartenir qu'à une seule équipe. 

### Pages

- Affichage d'un utilisateur avec sa fonction + modification de l'utilisateur 
- Affichage des équipes  
- Création d'un utilisateur / organisation / équipe
