/* HOME */

//vérifie si l'utilisateur est connecté

const userIsConnected = () => localStorage.getItem("accessToken");

//Récupère les projets et les affiche selon leur catégorie
const displayWorks = async (categoryId) => {
  const works = await API({
    url: ENDPOINTS.WORKS,
    method: HTTP_VERB.GET,
    errorMessage: "Une erreur est survenue lors de la récupération de projets",
  });

  const galleryContainer = document.getElementById("gallery-container");

  //suprime tous les enfants du conteneur d'affichage
  while (galleryContainer.firstChild) {
    galleryContainer.removeChild(galleryContainer.firstChild);
  }

  //filtre les prjets selon la catégorie selectionnée
  const filteredWorks = [1, 2, 3].includes(categoryId)
    ? works.filter((work) => work.categoryId === categoryId)
    : works;

  //affiche chaque projet
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
};

//crée un bouton pour filtrer chaque catégorie du projet
const createFilterButton = (category) => {
  const button = document.createElement("button");
  button.textContent = category.name;
  button.classList.add("filter-button");
  button.type = "button";

  return button;
};
//affiche les projets correspondants à chaque catégories sélectionnée
const initFiltersModule = async () => {
  const categories = await API({
    url: ENDPOINTS.CATEGORY,
    method: HTTP_VERB.GET,
  });

  const galleryContainer = document.getElementById("button-container");

  // Ajout du bouton tous pour ensuite afficher tous les projets
  const allFilterButton = createFilterButton({ name: "Tous", id: 0 });
  galleryContainer.appendChild(allFilterButton);

  allFilterButton.addEventListener("click", async () => {
    displayWorks(0);
  });

  //ajout d'un bouton pour chaque catégorie de projet
  categories.forEach((category) => {
    const button = createFilterButton(category);

    button.addEventListener("click", async () => {
      displayWorks(category.id);
    });

    galleryContainer.appendChild(button);
  });
};

//vérifie si l'utilisateur est connacté et affiche les éléments de l'interface
const checkLoginModule = () => {
  const user = userIsConnected();

  const loggedUserUiElements = document.querySelectorAll(".logged-elements");

  loggedUserUiElements.forEach((element) => {
    element.style.display = user ? "block" : "none";
  });

  const publicUserUiElements = document.querySelectorAll(".public-elements");

  publicUserUiElements.forEach((element) => {
    element.style.display = user ? "none" : "block";
  });
};

//déconnexion de l'utilisateur
const logoutModule = () => {
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
  });
};

//supprime un projet en revoyant une requête delete à l'api
const deleteWork = async (workId) => {
  await API(
    { url: `${ENDPOINTS.WORKS}/${workId}`, method: HTTP_VERB.DELETE },
    {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    }
  );

  alert("Le projet à été supprimer");
};

//module:ajout d'un nouveau projet
const addWorkModule = () => {
  //vérifie si l'utilisateur est connecté avant de continuer
  if (!userIsConnected()) return;

  //selectionne un nformulaire d'ajout d'un projet
  const workForm = document.querySelector("#add-work-form");

  workForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //récupère les données du formulaire
    const formData = new FormData(workForm);

    // envoie une requete POST à l'api pour ajouter un nouveay=u projet
    await API(
      {
        url: ENDPOINTS.WORKS,
        method: HTTP_VERB.POST,
      },
      {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      formData
    );
  });
};

const displayWorksEditionCards = async () => {
  if (!userIsConnected()) return;

  const images = await API({ url: ENDPOINTS.WORKS, method: HTTP_VERB.GET });

  //récupère lélément pour afficher la galerie d'édition
  const galleryEdition = document.getElementById("edit-text");

  //pour chaque image récupérée , crée une carte dédition
  images.forEach((image) => {
    //crée un élement div pour ajouter un filtre à l'image
    const filterDiv = document.createElement("div");
    filterDiv.classList.add("filter");

    const imgElement = document.createElement("img");
    imgElement.src = image.imageUrl;
    imgElement.alt = image.title;
    //crée un bouton pour supprimer l'image
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("regular");
    deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteButton.addEventListener("click", async (event) => {
      event.preventDefault();

      deleteWork(image.id);
    });
    //crée un bouton pour éditer l'image
    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "éditer";
    //crée un conteneur pour les boutons de l'image
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    //ajoute les bouton au conteneur
    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(editButton);
    //ajoute l'image et les boutons à la carte d'édition
    filterDiv.appendChild(imgElement);
    filterDiv.appendChild(buttonsContainer);
    galleryEdition.appendChild(filterDiv);
  });
};

const showModalModule = () => {
  //s'occupe d'afficher la fenêtee modale contenant la galerie d'édition
  //on récupère la fenêtre de la modale
  const modal = document.getElementById("modal");
  // si l'utilisateur n'est pas connecté , on supprime la fenêtre modale et on arrête la fonction
  if (!userIsConnected()) {
    modal.remove();

    return;
  }
  //on récupère le bouton qui permet d'ouvrir kla modale , la galerie d'édition et les formulaire d'ajout de photo
  const modalButton = document.getElementById("modal-button");
  const galleryEdition = document.getElementById("gallery-edition");
  const photoAdd = document.getElementById("photo-add");

  modalButton.addEventListener("click", () => {
    modal.style.display = "block";
    galleryEdition.style.display = "block";
    photoAdd.style.display = "none";
  });

  const closeModalButton = document.querySelectorAll(".close-modal-button");

  closeModalButton.forEach((button) => {
    button.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });
};

const getWorkCategories = async () => {
  if (!userIsConnected()) return;

  const categories = await API({
    url: ENDPOINTS.CATEGORY,
    method: HTTP_VERB.GET,
  });

  //récupère le menu déroulant pour les catégories
  const categoriesSelect = document.getElementById("category");

  categories.forEach((categorie) => {
    const option = document.createElement("option");

    option.textContent = categorie.name;
    option.value = categorie.id;

    categoriesSelect.appendChild(option);
  });
};

const displayUploadPreview = () => {
  if (!userIsConnected()) return;

  const previewWrapper = document.getElementById("upload-preview");
  const imageInput = document.getElementById("image"); // récupère l'input pour uploader l'image
  const fileChange = document.getElementById("file-change"); //récupération de la div pour afficher un message si l'ulisisateur veut changer d'image

  const image = document.createElement("img");
  image.style.height = "200px";

  previewWrapper.append(image);

  imageInput.addEventListener("change", (event) => {
    image.src = URL.createObjectURL(event.target.files[0]); //récupérer l'image selectionné

    if (event.target.files[0]) {
      fileChange.style.display = "none"; //si oui on cache le message pour changer d'image
    } else {
      fileChange.style.display = "block"; // si non , on affiche le messaage pour changer d'image
    }
  });
};

const photoEditionModule = () => {
  if (!userIsConnected()) return;

  const galleryEdition = document.getElementById("gallery-edition");
  const photoAdd = document.getElementById("photo-add");

  const addPhotoButton = document.getElementById("add-photo-button");

  addPhotoButton.addEventListener("click", () => {
    //au click ajouter une photo
    galleryEdition.style.display = "none";
    photoAdd.style.display = "block";
  });

  const backModalButton = document.getElementById("back-modal-button");

  backModalButton.addEventListener("click", () => {
    galleryEdition.style.display = "block";
    photoAdd.style.display = "none";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  //lorsque le DOM est chargé on appelle les fonctions
  displayWorks(0);

  initFiltersModule();

  checkLoginModule();

  logoutModule();

  showModalModule();

  photoEditionModule();

  displayWorksEditionCards();

  getWorkCategories();

  addWorkModule();

  displayUploadPreview();
});
