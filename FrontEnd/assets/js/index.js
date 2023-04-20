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

const displayWorksEditionCards = async () => {
  try {
    const images = await getApiData(ENDPOINTS.WORKS, HTTP_VERB.GET);

    const galleryEdition = document.getElementById("edit-text");

    images.forEach((image) => {
      const filterDiv = document.createElement("div");
      filterDiv.classList.add("filter");

      const imgElement = document.createElement("img");
      imgElement.src = image.imageUrl;
      imgElement.alt = image.title;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("regular");
      deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      deleteButton.addEventListener("click", async (event) => {
        try {
          await fetch(`https://localhost:5678/api/images/${image._id}`, {
            method: "DELETE",
          });
          event.target.parentNode.parentNode.remove();
        } catch (error) {
          console.error(error);
        }
      });

      const editButton = document.createElement("button");
      editButton.classList.add("edit");
      editButton.textContent = "éditer";
      editButton.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        const modalImg = document.createElement("img");
        modalImg.src = image.imageUrl;
        modalImg.alt = image.title;

        const closeModal = document.createElement("span");
        closeModal.classList.add("close-modal");
        closeModal.innerHTML = "&times;";
        closeModal.addEventListener("click", () => {
          modal.remove();
        });

        modalContent.appendChild(modalImg);
        modalContent.appendChild(closeModal);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);
      });

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

  displayWorksEditionCards();

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

const photoEditionModule = () => {
  if (!userIsConnected()) return;

  const galleryEdition = document.getElementById("gallery-edition");
  const photoAdd = document.getElementById("photo-add");

  const addPhotoButton = document.getElementById("add-photo-button");

  addPhotoButton.addEventListener("click", () => {
    galleryEdition.style.display = "none";
    photoAdd.style.display = "block";
  });

  const prevStepGallerybutton = document.getElementById(
    "prev-step-gallery-button"
  );

  prevStepGallerybutton.addEventListener("click", () => {
    galleryEdition.style.display = "block";
    photoAdd.style.display = "none";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initFiltersModule();

  checkLoginModule();

  logoutModule();

  showModalModule();

  photoEditionModule();

  displayWorksEditionCards();
});
