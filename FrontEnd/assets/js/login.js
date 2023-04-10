/* LOGIN MODULES
 *******************************************************************************/
const API_BASE_URL = "http://localhost:5678/api";
const LOGIN_ENDPOINT = API_BASE_URL + "/users/login";
const POST_HTTP_VERB = "POST";

const initLoginForm = async () => {
  document.getElementById("login").addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (response.ok) {
        console.log("Connexion réussie !");
      } else {
        console.error("La connexion a échoué.");
        alert(
          "La connexion a échoué : " +
            response.status +
            " " +
            response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la connexion : " + error.message);
      alert("Erreur lors de la connexion : " + error.message);
    }
  });
};

/* ENTRY POINT
 *******************************************************************************/
async function main() {
  initLoginForm();
}

main();
