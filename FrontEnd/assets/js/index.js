/* CONSTANTS */
const HTTP_VERB = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
};
const API_BASE_URL = "http://localhost:5678/api";
const ENDPOINTS = {
  WORKS: `${API_BASE_URL}/works`,
  LOGIN: `${API_BASE_URL}/users/login`,
};
const WORK_CATEGORY = {
  ALL: 0,
  OBJECT: 1,
  APARTMENTS: 2,
  HOSTELS_APARTMENTS: 3,
};

/* UTILS */
const getApiData = async (url, method) => {
  try {
    const response = await fetch(url, { method });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

/* HOME */
const displayWorks = async (category) => {
  const works = await getApiData(ENDPOINTS.WORKS, HTTP_VERB.GET);

  if (works?.length) {
    const filteredWorks =
      category === WORK_CATEGORY.ALL
        ? works
        : works.filter((work) => work.categoryId === category);

    const galleryContainer = document.getElementById("gallery-container");

    while (galleryContainer.firstChild) {
      galleryContainer.removeChild(galleryContainer.firstChild);
    }

    filteredWorks.forEach((work) => {
      const figure = document.createElement("figure");
      const figcaption = document.createElement("figcaption");
      const image = document.createElement("img");

      image.src = work.imageUrl;
      figcaption.textContent = work.title;
      figure.appendChild(image);
      figure.appendChild(figcaption);
      galleryContainer.appendChild(figure);
    });
  }
};

const initFiltersModule = async () => {
  await displayWorks(WORK_CATEGORY.ALL);

  document.getElementById("all").addEventListener("click", () => {
    displayWorks(WORK_CATEGORY.ALL);
  });

  document.getElementById("objects").addEventListener("click", () => {
    displayWorks(WORK_CATEGORY.OBJECT);
  });

  document.getElementById("apartments").addEventListener("click", () => {
    displayWorks(WORK_CATEGORY.APARTMENTS);
  });

  document.getElementById("hostel-apartments").addEventListener("click", () => {
    displayWorks(WORK_CATEGORY.HOSTELS_APARTMENTS);
  });
};

/* AUTH */
const checkLoginModule = () => {
  const filterButtonContainer = document.getElementById("buttonContainer");
  const loginButton = document.getElementById("login");
  const logoutButton = document.getElementById("logout");
  const changeButton = document.getElementById("change");

  const userIsConnected = localStorage.getItem("accessToken");

  if (userIsConnected) {
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
    changeButton.style.display = "block";
    filterButtonContainer.style.display = "none";
  } else {
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
    changeButton.style.display = "none";
    filterButtonContainer.style.display = "block";
  }
};

const logoutModule = () => {
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("accessToken");

    window.location.reload();
  });
};

const loginModule = () => {
  document.getElementById("login").addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(ENDPOINTS.LOGIN, {
      method: HTTP_VERB.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      localStorage.setItem("accessToken", token);

      window.location.href = `http://${window.location.hostname}:5500/FrontEnd/index.html`;

      console.log("Connexion réussie !");
    } else {
      const error = await response.json();

      alert(error.message);
    }
  });
};

/* ENTRY POINT */
document.addEventListener("DOMContentLoaded", async () => {
  switch (window.location.pathname) {
    case "/FrontEnd/":
    case "/FrontEnd/index.html":
      checkLoginModule();

      logoutModule();

      await initFiltersModule();
      break;

    case "/FrontEnd/login.html":
      loginModule();
      break;

    default:
      alert("404 This page doesn't exist");
      break;
  }
});
