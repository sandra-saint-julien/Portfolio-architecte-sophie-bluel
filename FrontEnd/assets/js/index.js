/* CONSTANTS
 *******************************************************************************/
const GET_HTTP_VERB = "GET";
const POST_HTTP_VERB = "POST";
const DELETE_HTTP_VERB = "DELETE";

const API_BASE_URL = "http://localhost:5678/api";
const WORKS_ENDPOINT = API_BASE_URL + "/works";
const LOGIN_ENDPOINT = API_BASE_URL + "/user/login";

const WORK_ALL_CATEGORY = 0;
const WORK_OBJECT_CATEGORY = 1;
const WORK_APARTMENTS_CATEGORY = 2;
const WORK_HOSTELS_APARTMENTS_CATEGORY = 3;

/* UTILS
 *******************************************************************************/
const getData = async (url, method) => {
  try {
    const response = await fetch(url, {
      method,
    });

    return response.json();
  } catch (e) {
    console.error(e);
  }
};

/* HOME MODULES
 *******************************************************************************/
const displayWorks = async (filter) => {
  const works = await getData(WORKS_ENDPOINT, "GET");

  // Display work gallery oly if work there is works in the database
  if (works?.length) {
    const filteredWorks =
      filter === 0
        ? works
        : works.filter((work) => {
            return work.categoryId === filter;
          });

    const galleryContainer = document.getElementById("gallery-container");

    // Delete gallery after fill the new gallery
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

const initFilters = async () => {
  // Get all works on first render
  await displayWorks(WORK_ALL_CATEGORY);

  document.getElementById("all").addEventListener("click", () => {
    displayWorks(WORK_ALL_CATEGORY);
  });

  document.getElementById("objects").addEventListener("click", () => {
    displayWorks(WORK_OBJECT_CATEGORY);
  });

  document.getElementById("apartments").addEventListener("click", () => {
    displayWorks(WORK_APARTMENTS_CATEGORY);
  });

  document.getElementById("hostel-apartments").addEventListener("click", () => {
    displayWorks(WORK_HOSTELS_APARTMENTS_CATEGORY);
  });
};
/* CONTACT
 **************************************************************************/

const contact = () => {
  document.getElementById("contact").addEventListener("click", () => {
    const scrollHeight = document.documentElement.scrollHeight;
    window.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
  });
};

/* LOGIN MODULES
 *******************************************************************************/
const loginUser = async () => {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "example",
        password: "password",
      }),
    });

    return response.json();
  } catch (e) {
    console.error(e);
  }
};

/* ENTRY POINT
 *******************************************************************************/
const main = async () => {
  // Initialize works filter buttons
  await initFilters();
  await loginUser();
  contact();
};
main();
