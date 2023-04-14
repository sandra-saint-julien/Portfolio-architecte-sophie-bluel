# Backend API - Sophie Bluel

Ce repo contient le code backend de l'architecte Sophie Bluel.

## Lancement du backend

Après avoir récupéré le REPO executez la commande `npm install` pour installer les dépendances du projet

Une fois les dépendances installées lancez le projet avec la commande `npm start`

Compte de test pour Sophie Bluel

```
email: sophie.bluel@test.tld

password: S0phie
```

Lien pour voir la
[documentation Swagger](http://localhost:5678/api-docs/)

Pour lire la documentation, utiliser Chrome ou Firefox

const logout = () => {
localStorage.removeItem("accessToken");
window.location.href = "index.html";
};

document.getElementById("logout").addEventListener("click", logout);

const username = localStorage.getItem("username");
const password = localStorage.getItem("password");
if (token && username === "username" && password === "password")
