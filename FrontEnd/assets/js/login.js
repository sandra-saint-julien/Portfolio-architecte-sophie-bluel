const loginModule = async () => {
  document
    .getElementById("login-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await getApiData(
        ENDPOINTS.LOGIN,
        HTTP_VERB.POST,
        headers,
        {
          email,
          password,
        }
      );

      const token = response.token;

      localStorage.setItem("accessToken", token);

      window.location.href = `http://${window.location.hostname}:5500/FrontEnd/index.html`;

      console.log("Connexion réussie !");
    });
};

document.addEventListener("DOMContentLoaded", async () => {
  await loginModule();
});
