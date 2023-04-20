# Backend API - Sophie Bluel

Ce repo contient le code backend de l'architecte Sophie Bluel.

## Lancement du backend

Après avoir récupéré le REPO executez la commande `npm install` pour installer les dépendances du projet

Une fois les dépendances installées lancez le projet avec la commande `npm start`

Compte de test pour Sophie Bluel

```
email: sophie.bluel@test.tld

password: S0phie
```

Lien pour voir la
[documentation Swagger](http://localhost:5678/api-docs/)

Pour lire la documentation, utiliser Chrome ou Firefox

const addPhoto = () => {
const addPhotoButton = document.getElementById("add-photo-button");

addPhotoButton.addEventListener("click", () => {
const modal = document.createElement("div");
modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const photoAddSection = document.createElement("section");
    photoAddSection.id = "photo-add";

    const header = document.createElement("header");
    header.classList.add("photos-gallery");

    const title = document.createElement("h3");
    title.textContent = "Ajout photo";

    const closeButton = document.createElement("button");
    closeButton.classList.add("close-modal-button");
    closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeButton.addEventListener("click", () => {
      modal.remove();
    });

    const previousButton = document.createElement("button");
    previousButton.id = "prev-step-gallery-button";
    previousButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    previousButton.addEventListener("click", () => {
      photoAddSection.remove();
      modalContent.appendChild(galleryEdition);
    });

    const backButton = document.createElement("button");
    backButton.id = "back-to-edition-button";
    backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Retour';
    backButton.addEventListener("click", () => {
      photoAddSection.remove();
      displayWorkEditionCard();
    });

    const form = document.createElement("form");

    const titleLabel = document.createElement("label");
    titleLabel.for = "title";
    titleLabel.textContent = "Titre de la photo";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.name = "title";

    const categoryLabel = document.createElement("label");
    categoryLabel.for = "category";
    categoryLabel.textContent = "Catégorie de la photo";

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "category";
    categoryInput.name = "category";

    const photoLabel = document.createElement("label");
    photoLabel.for = "photo";
    photoLabel.textContent = "Sélectionnez une photo";

    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.id = "photo";
    photoInput.name = "photo";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Ajouter";

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(categoryLabel);
    form.appendChild(categoryInput);
    form.appendChild(photoLabel);
    form.appendChild(photoInput);
    form.appendChild(submitButton);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      try {
        await fetch("https://localhost:5678/api/images", {
          method: "POST",
          body: formData,
        });
        modal.remove();
        displayWorksEditionCards();
      } catch (error) {
        console.error(error);
      }
    });

    header.appendChild(title);
    header.appendChild(closeButton);
    if (modalContent.contains(galleryEdition)) {
      header.appendChild(previousButton);
    } else {
      header.appendChild(backButton);
    }
    photoAddSection.appendChild(header);
    photoAddSection.appendChild(form);
    modalContent.appendChild(photoAddSection);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

});
};
