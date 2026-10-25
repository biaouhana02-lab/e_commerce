# Contrat REST attendu

Le front-end utilise `VITE_API_BASE_URL` comme préfixe des routes. Copiez `.env.example` vers `.env.local` et indiquez l’URL de votre serveur. Si la variable est absente, les requêtes utilisent des chemins relatifs (`/products`, `/cart`, etc.). Aucun serveur ni endpoint n’est fourni par ce projet.

Toutes les réponses JSON d’erreur peuvent inclure `{ "message": "..." }`. Les requêtes qui échouent renvoient une erreur affichée par l’interface. Le client envoie `Content-Type: application/json` pour les corps JSON.

| Fonction | Méthode et route attendues | Paramètres / corps | Réponse attendue |
| --- | --- | --- | --- |
| Lister les produits | `GET /products` | Paramètres facultatifs `search`, `category`, `availability` (`all`, `in-stock`, `out-of-stock`), `sort` (`name`, `newest`, `price-asc`, `price-desc`), `isNew`, `onSale`, `page`, `pageSize` | `{ "items": [...], "total": number, "page": number, "pageSize": number }` ou un tableau de produits |
| Lister les catégories | `GET /categories` | Aucun | Tableau de noms de catégories |
| Se connecter | `POST /auth/login` | `{ "email": string, "password": string }` | `{ "token": string, "user": {...} }` |
| Utilisateur courant | `GET /auth/me` | En-tête `Authorization: Bearer <token>` | Objet utilisateur |
| Lire le panier | `GET /cart` | En-tête Bearer | `{ "items": [{ "productId": string|number, "quantity": number, ... }] }` |
| Ajouter au panier | `POST /cart/items` | `{ "productId": string|number, "quantity": number }`; en-tête Bearer facultatif selon la politique du serveur | Panier actualisé avec `items` |
| Lister les commandes | `GET /orders` | En-tête Bearer | Tableau de commandes ou `{ "items": [...] }` |
| Créer une commande | `POST /orders` | Objet de commande défini par le backend; en-tête Bearer facultatif selon la politique du serveur | Commande créée |

Un produit destiné à la grille doit exposer `id`, `name`, `price` (nombre en FCFA), `stock`, `category`, `image` ou `imageUrl`, et `description`. `brand` et `type` sont facultatifs et affichés quand ils sont présents. `isNew` et `compareAtPrice` déterminent les sélections nouveautés et promotions. Prix et stocks du catalogue local sont fictifs ; ses noms de marque sont des étiquettes de maquette à vérifier avant exploitation commerciale.

Le dépôt du catalogue est centralisé dans `src/data/catalog/catalogRepository.js`. Il utilise le catalogue structuré local par défaut (`VITE_CATALOG_SOURCE=demo`). Après mise en place des routes produits et catégories ci-dessus, définir `VITE_CATALOG_SOURCE=api` et `VITE_API_BASE_URL` active la même interface de données via REST ; les composants de grille et de navigation gardent le même contrat. La réponse produits doit respecter les filtres et la pagination reçus par requête.

Le catalogue de démonstration est réparti dans `src/data/catalog/demo/` et contient des produits distincts. Les prix, stocks et prix de comparaison sont fictifs. Le panier de démonstration reste local au navigateur ; les services REST de panier, d’authentification et de commande sont isolés pour leur branchement ultérieur.
