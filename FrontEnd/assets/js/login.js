// Définition d'un module de connexion asynchrone
const loginModule = async () => {
  // Ajout d'un événement "submit" à l'élément HTML avec l'ID "login-form"
  document
    .getElementById("login-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault(); // Empêche le formulaire de se soumettre

      // Récupération des valeurs de l'email et du mot de passe depuis le formulaire HTML
      const email = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Configuration des en-têtes HTTP pour la requête d'authentification
      const headers = {
        "Content-Type": "application/json",
      };

      // Envoi de la requête d'authentification à l'API avec les données de connexion
      const response = await API({
        url: ENDPOINTS.LOGIN, // Utilisation de l'endpoint LOGIN
        method: HTTP_VERB.POST, // Utilisation de la méthode POST
        headers: headers, // Utilisation des en-têtes configurés
        body: JSON.stringify({
          email,
          password,
        }), // Corps de la requête contenant les données de connexion
        errorMessage: "Vérifiez votre mail ou votre mot de passe",
      });

      const token = response?.token; // Récupération du jeton d'authentification dans la réponse

      if (token) {
        // Stockage du jeton dans le stockage local du navigateur
        localStorage.setItem("accessToken", token);

        // Redirection de l'utilisateur vers la page d'accueil
        window.location.href = `http://${window.location.hostname}:5500/FrontEnd/index.html`;
      }
    });
};

// Ajout d'un événement "DOMContentLoaded" pour lancer le module de connexion une fois que la page est chargée
document.addEventListener("DOMContentLoaded", async () => {
  await loginModule();
});
