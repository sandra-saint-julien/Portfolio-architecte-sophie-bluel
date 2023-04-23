/* CONSTANTS */

// Définition des verbes HTTP couramment utilisés
const HTTP_VERB = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
};

// URL de base de l'API
const API_BASE_URL = "http://localhost:5678/api";

// Endpoints spécifiques de l'API
const ENDPOINTS = {
  WORKS: `${API_BASE_URL}/works`,
  LOGIN: `${API_BASE_URL}/users/login`,
  CATEGORY: `${API_BASE_URL}/categories`,
};

// Catégories de travail disponibles
const WORK_CATEGORY = {
  ALL: 0,
  OBJECT: 1,
  APARTMENTS: 2,
  HOSTELS_APARTMENTS: 3,
};

/* UTILS */

// Fonction utilitaire pour envoyer une requête à l'API
const getApiData = async (url, method, headers, body) => {
  try {
    const response = await fetch(url, {
      method, // Utilisation de la méthode HTTP passée en paramètre
      headers, // Utilisation des en-têtes passés en paramètre
      body: JSON.stringify(body), // Transformation du corps en JSON
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status} - ${response.statusText}`
      );
    }

    return response.json(); // Renvoie la réponse sous forme de JSON
  } catch (error) {
    alert(error.message); // Affiche une alerte avec le message d'erreur en cas d'erreur
  }
};
