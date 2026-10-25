# shop.

Boutique front-end React/Vite pour vêtements, chaussures, sacs, accessoires et bijoux. Le projet comprend un catalogue local de démonstration et une interface de données prête à consommer les routes REST décrites dans [API.md](./API.md). Aucun backend n’est fourni.

## Démarrer

```sh
npm install
npm run dev
```

Pour connecter le catalogue au serveur, copier `.env.example` vers `.env.local`, régler `VITE_API_BASE_URL`, puis choisir `VITE_CATALOG_SOURCE=api`. La source `demo` reste active par défaut.

## Catalogue

Les 45 fiches du catalogue de démonstration se trouvent dans `src/data/catalog/demo/`, regroupées par catégorie. `src/data/catalog/catalogRepository.js` centralise recherche, filtres, tri, pagination et sélection de la source locale ou REST. Les services HTTP sont isolés dans `src/services/`.

Les marques, prix et stocks du catalogue local sont des données de maquette ; les photos Unsplash sont des illustrations et ne représentent pas nécessairement les articles réellement disponibles. Les fichiers image et leurs sources sont répertoriés dans [IMAGE_SOURCES.md](./src/data/catalog/demo/IMAGE_SOURCES.md). Ce document signale aussi les limites de provenance et de droits encore à confirmer avant une mise en production commerciale.
