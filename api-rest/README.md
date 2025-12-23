# API REST - Gestion d'Utilisateurs et Transactions

API  pour la gestion les utilisateurs et leurs transactions avec Node.js et Express.

## Installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Démarrer le serveur**
   ```bash
   npm start
   ```

3. **Tester l'API**
   - URL: `http://localhost:3000`

## Endpoints

### Utilisateurs
- `POST /api/users` - Créer un utilisateur
- `GET /api/users` - Lister tous les utilisateurs
- `GET /api/users/:id` - Obtenir un utilisateur

### Transactions
- `POST /api/transactions` - Créer une transaction
- `GET /api/transactions` - Lister toutes les transactions
- `GET /api/transactions/:id` - Obtenir une transaction
- `GET /api/transactions/user/:userId` - Transactions par utilisateur
- `PUT /api/transactions/:id/status` - Modifier le statut

## Exemples d'utilisation

### 1. Créer un utilisateur
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Ya Yves",
    "email": "ya.yves@example.com",
    "telephone": "0123456789"
  }'
```

### 2. Créer une transaction
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "montant": 10500,
    "statut": "PENDING",
    "userId": "USER_ID"
  }'
```

### 3. Modifier le statut d'une transaction
```bash
curl -X PUT http://localhost:3000/api/transactions/EFB.00000001/status \
  -H "Content-Type: application/json" \
  -d '{
    "statut": "SUCCESSFUL"
  }'
```

### 4. Obtenir les transactions d'un utilisateur
```bash
curl http://localhost:3000/api/transactions/user/UserID
```

## Validation des données

### Utilisateur
- `nom`: requis, minimum 2 caractères
- `email`: requis, format email valide, unique
- `telephone`: requis, minimum 8 caractères

### Transaction
- `montant`: requis, nombre positif
- `statut`: requis (`PENDING`, `SUCCESSFUL`, `FAILED`)
- `userId`: requis, doit exister

## Statuts des transactions

- **PENDING**: Transaction en attente
- **SUCCESSFUL**: Transaction réussie
- **FAILED**: Transaction échouée

## Format des IDs

- **Utilisateurs**: UUID (ex: `550e8400-e29b-41d4-a716-446655440000`)
- **Transactions**: EFB + numéros (ex: `EFB.00000001`, `EFB.00000002`)

## Réponses de l'API

### Succès
```json
{
  "success": true,
  "message": "Opération réussie",
  "data": {...}
}
```

### Erreur
```json
{
  "success": false,
  "message": "Description de l'erreur"
}
```

