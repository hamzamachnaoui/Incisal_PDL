# Guide de mise en place sur GitHub

## Avant de commencer

Assurez-vous d'avoir:
- Un compte GitHub
- Git installé sur votre machine
- Un repository créé sur GitHub (sans README pour éviter les conflits)

## 1. Initialiser le repository local

```bash
cd c:\wamp64\www\IncisalPDL\htdocs
git init
```

## 2. Configurer votre identité Git (si ce n'est pas fait)

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"
```

## 3. Ajouter les fichiers à suivre

```bash
git add .
```

Pour vérifier quels fichiers seront commitées (et vérifier que .env n'est pas inclus):
```bash
git status
```

## 4. Faire le premier commit

```bash
git commit -m "Initial commit: React/Node project for Incisal P.D.L"
```

## 5. Ajouter le repository distant GitHub

Remplacez `USERNAME` et `REPO_NAME` par vos vrais identifiants:

```bash
git remote add origin https://github.com/USERNAME/REPO_NAME.git
```

Exemple:
```bash
git remote add origin https://github.com/hamzamachnaoui/incisal-pdl.git
```

## 6. Vérifier la connexion au remote

```bash
git remote -v
```

## 7. Renommer la branche principale en 'main' (optionnel mais recommandé)

```bash
git branch -M main
```

## 8. Pousser le code vers GitHub

```bash
git push -u origin main
```

## 9. Les commits suivants

Pour les prochains changements:

```bash
git add .
git commit -m "Description du changement"
git push origin main
```

## Important: .env

⚠️ **Ne jamais committer le fichier `.env`!**

- Le fichier `.env` est automatiquement ignoré par `.gitignore`
- Utilisez `.env.example` pour montrer les variables nécessaires
- Sur le serveur, il faut créer `.env` manuellement avec les vraies valeurs

Votre `.env.example` est déjà en place pour servir de template.

## Authentification GitHub (HTTPS vs SSH)

### HTTPS (simple, avec token)
Vous serez demandé d'utiliser un **Personal Access Token** au lieu du mot de passe.
- Créez un token: https://github.com/settings/tokens
- Utilisez le token quand Git demande le mot de passe

### SSH (recommandé pour l'automatisation)
Générez une clé SSH et ajoutez-la à votre compte GitHub:
```bash
ssh-keygen -t ed25519 -C "votre@email.com"
git remote set-url origin git@github.com:USERNAME/REPO_NAME.git
```

## Vérifier l'historique

```bash
git log --oneline
```

Bon courage! 🚀
