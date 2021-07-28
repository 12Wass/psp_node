## Lancer le projet
// Si vous l'exécutez pour la première fois : 
- `npm run dev:init`
- `npm run dev:up:build` ou `docker-compose up -d build`
- Décommentez la ligne 12 dans api/server/server.js pour synchroniser la base de données et sauvegarder.
- Pour initialiser la base de données (Postgres), décommentez les lignes 17-20 dans api/models/sequelize/index.js.
- Lancez `npm run api:w` et attendez de voir "sync OK"
- Re-commentez la ligne 12 dans api/server/server.js et sauvegardez.
- Allez dans localhost:8080/users to check


// Toutes les autres fois : 
`npm run dev:up or docker-compose up -d`

### React / Front-End: localhost:3000
### API: localhost:8888
