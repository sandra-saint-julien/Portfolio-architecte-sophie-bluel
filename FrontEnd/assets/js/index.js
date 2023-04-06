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

/* HOME MODULES
 *******************************************************************************/
const displayWorks = async () => {
  const works = await getData(WORKS_ENDPOINT, GET_HTTP_VERB);
  console.log(works);
};

/* LOGIN MODULES
 *******************************************************************************/
const loginUser = () => {
  console.log("login");
};

/* ENTRY POINT
 *******************************************************************************/
const main = async () => {
  displayWorks();
};

main();
