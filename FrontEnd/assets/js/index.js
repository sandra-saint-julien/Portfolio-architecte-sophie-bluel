/* CONSTANTS
 *******************************************************************************/
const GET_HTTP_VERB = "GET";
const POST_HTTP_VERB = "POST";
const DELETE_HTTP_VERB = "DELETE";

const API_BASE_URL = "http://localhost:5678/api";
const WORKS_ENDPOINT = API_BASE_URL + "/works";

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
/**FILTERS**************************************************************** */
  button.addEventListener("click", async () => {
   let apiUrl = API_BASE_URL + "/works";
    if (name !== "Tous") {
      apiUrl += `?type=${name}`;
    }
    const works = await getData(apiUrl, "GET");
/* HOME MODULES
 *******************************************************************************/
const displayWorks = async () => {
  const galleryContainer = document.getElementById("gallery-container");
  const works = await getData(API_BASE_URL + "/works", "GET");

  works.forEach((work) => {
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");
    const image = document.createElement("img");

    image.src = work.imageUrl;
    figcaption.textContent = work.title;

    figure.appendChild(image);
    figure.appendChild(figcaption);

    galleryContainer.appendChild(figure);
  });
};

/* LOGIN MODULES
 *******************************************************************************/
function loginUser() {
  console.log("login");
}

/* ENTRY POINT
 *******************************************************************************/
const main = async () => {
  await displayWorks();
};

main();
