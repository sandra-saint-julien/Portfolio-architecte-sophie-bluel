/* HOME */

const userIsConnected = () => localStorage.getItem("accessToken");

const displayWorks = async (categoryId) => {
  const works = await API(ENDPOINTS.WORKS, HTTP_VERB.GET);

  const galleryContainer = document.getElementById("gallery-container");

  // Clean gallery container before adding new images
  while (galleryContainer.firstChild) {
    galleryContainer.removeChild(galleryContainer.firstChild);
  }

  const filteredWorks =
    categoryId === 0
      ? works
      : works.filter((work) => work.categoryId === categoryId);

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

const createFilterButton = (category) => {
  const button = document.createElement("button");
  button.textContent = category.name;
  button.classList.add("filter-button");

  return button;
};

const initFiltersModule = async () => {
  const categories = await API(ENDPOINTS.CATEGORY, HTTP_VERB.GET);

  const galleryContainer = document.getElementById("button-container");

  // Add all filter button
  const allFilterButton = createFilterButton({ name: "Tous", id: 0 });
  galleryContainer.appendChild(allFilterButton);

  categories.forEach((category) => {
    const button = createFilterButton(category);

    button.addEventListener("click", async () => {
      displayWorks(category.id);
    });

    galleryContainer.appendChild(button);
  });
};

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

const logoutModule = () => {
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
  });
};

const deleteWork = async (workId) => {
  await API(`${ENDPOINTS.WORKS}/${workId}`, HTTP_VERB.DELETE, {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  });

  alert("Le projet à été supprimer");
};

const addWorkModule = () => {
  if (!userIsConnected()) return;

  const workForm = document.querySelector("#add-work-form");

  workForm.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData(workForm);

      await API(
        ENDPOINTS.WORKS,
        HTTP_VERB.POST,
        {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        formData
      );
    } catch (e) {
      console.error(e);
    }
  });
};

const displayWorksEditionCards = async () => {
  try {
    if (!userIsConnected()) return;

    const images = await API(ENDPOINTS.WORKS, HTTP_VERB.GET);

    const galleryEdition = document.getElementById("edit-text");

    images.forEach((image) => {
      const filterDiv = document.createElement("div");
      filterDiv.classList.add("filter");

      const imgElement = document.createElement("img");
      imgElement.src = image.imageUrl;
      imgElement.alt = image.title;

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.classList.add("regular");
      deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();

        deleteWork(image.id);
      });

      const editButton = document.createElement("button");
      editButton.classList.add("edit");
      editButton.textContent = "éditer";

      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("buttons-container");

      buttonsContainer.appendChild(deleteButton);
      buttonsContainer.appendChild(editButton);

      filterDiv.appendChild(imgElement);
      filterDiv.appendChild(buttonsContainer);
      galleryEdition.appendChild(filterDiv);
    });
  } catch (error) {
    console.error(error);
  }
};

const showModalModule = () => {
  const modal = document.getElementById("modal");

  if (!userIsConnected()) {
    modal.remove();

    return;
  }

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

  const categories = await API(ENDPOINTS.CATEGORY, HTTP_VERB.GET);

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
  const imageInput = document.getElementById("image");
  const fileChange = document.getElementById("file-change");

  const image = document.createElement("img");
  image.style.height = "200px";

  previewWrapper.append(image);

  imageInput.addEventListener("change", (event) => {
    image.src = URL.createObjectURL(event.target.files[0]);

    if (event.target.files[0]) {
      fileChange.style.display = "none";
    } else {
      fileChange.style.display = "block";
    }
  });
};

const photoEditionModule = () => {
  if (!userIsConnected()) return;

  const galleryEdition = document.getElementById("gallery-edition");
  const photoAdd = document.getElementById("photo-add");

  const addPhotoButton = document.getElementById("add-photo-button");

  addPhotoButton.addEventListener("click", () => {
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
