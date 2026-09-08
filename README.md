# Incisal P.D.L - React + Node

Ce projet remplace l'ancienne page PHP par une interface React servie par Vite et une API Node/Express.

## Démarrage rapide

### Installation

```bash
npm install
```

### Configuration

Copiez `.env.example` vers `.env`, puis renseignez les informations MySQL et SMTP.

```bash
cp .env.example .env
```

### Développement

```bash
npm run dev
```

Vite sert le frontend et proxy les appels `/api` vers le serveur Node.

### Production locale

```bash
npm run build
npm start
```

Le serveur sert le build React depuis `dist/` et écoute par défaut sur `http://localhost:5000`.

## API Endpoints

- `POST /api/subscribe` pour l'inscription newsletter
- `POST /api/contact` pour l'envoi du formulaire de contact
- `GET /api/health` pour vérifier que l'API répond

## Stack technique

- **Frontend** : React 18 + Vite + Lucide Icons
- **Backend** : Node.js + Express
- **Base de données** : MySQL
- **Email** : Nodemailer (SMTP)

## Déploiement

Pour déployer sur GitHub, initialiser un repository Git et pousser le code.

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

⚠️ **Important** : Ne commitez jamais le fichier `.env` ! Il est automatiquement ignoré par `.gitignore`.

## Structure du projet

```
.
├── src/                    # Code React
│   ├── main.jsx           # Composant principal
│   └── styles.css         # Styles CSS avec animations 3D
├── server/                # Backend Node/Express
│   └── server.js          # API endpoints
├── public/                # Assets statiques (images, favicon)
├── dist/                  # Build production (généré)
├── package.json           # Dépendances et scripts
├── vite.config.js         # Configuration Vite
├── index.html             # HTML racine
├── .env.example           # Template des variables d'environnement
├── .gitignore             # Fichiers à ignorer pour Git
└── README.md              # Ce fichier
```

## Design

Le site utilise :
- Animation au scroll avec `IntersectionObserver`
- Effets 3D CSS sur le hero
- Design responsive avec breakpoints à 900px et 620px
- Palette de couleurs cohérente (sage, clay, ink)