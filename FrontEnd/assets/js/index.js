/* HOME */
const userIsConnected = () => localStorage.getItem("accessToken");

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

const checkLoginModule = () => {
  const user = userIsConnected();
  const loginButton = document.getElementById("login");

  if (user) loginButton.remove();

  const loggedUserUiElements = document.querySelectorAll(
    ".logged-user-elements"
  );

  loggedUserUiElements.forEach((element) => {
    element.style.display = user ? "block" : "none";
  });
};

const logoutModule = () => {
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initFiltersModule();

  checkLoginModule();

  logoutModule();
});
