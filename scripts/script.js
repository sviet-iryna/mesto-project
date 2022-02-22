const editButton = document.querySelector(".profile__info-edit");
const addButton = document.querySelector(".profile__button-add");
const closeButtons = document.querySelectorAll(".popup__close-button");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const closeButtonAdd = document.querySelector(
  ".popup_add .popup__close-button"
);
const formElement = document.querySelector(".popup_edit .popup__content");
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-description");

const nameInput = document.querySelector(".popup__content-name");
const jobInput = document.querySelector(".popup__content-job");

const placeInput = document.querySelector(".popup__content-place");
const linkInput = document.querySelector(".popup__content-link");
const formElementAdd = document.querySelector(".popup_add .popup__content");

const popupPhotoImage = document.querySelector(".gallery__cell-image");
const cardCell = document.querySelector(".gallery__cell");
const galleryCells = document.querySelector(".gallery__cells");
const galleryTemplate = document.querySelector("#gallery-template").content;

const popupPhotoImg = document.querySelector(".popup__photo-image");
const popupPhotoTitle = document.querySelector(".popup__photo-title");
const popupPhoto = document.querySelector(".popup_photo");

function closePopupHandler(evt) {
  const parentPopup = evt.target.closest(".popup");
  closePopup(parentPopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function openAddPopup() {
  placeInput.value = "";
  linkInput.value = "";
  openPopup(popupAdd);
}

function openPopupEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
}

function setLike(evt) {
  evt.target.classList.toggle("gallery__button-like_active");
}

function delCell(evt) {
  const cardItem = evt.target.closest(".gallery__cell");
  cardItem.remove();
}

function setListenerForCloseButton() {
  const closeButtons = document.querySelectorAll(".popup__close-button");
  closeButtons.forEach(function (item) {
    item.addEventListener("click", closePopupHandler);
  });
}
setListenerForCloseButton();

function submitFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function setCards() {
  cards.forEach(function (card) {
    const element = createCard(card);
  galleryCells.append(element);
  });
}
setCards();

function submitAddFormHandler(evt) {
  evt.preventDefault();
  const obj = {
    name: placeInput.value,
    link: linkInput.value
  }
  const element = createCard(obj);
  galleryCells.prepend(element);
  closePopup(popupAdd);
}

function createCard(obj) {
  const galleryElement = galleryTemplate
    .querySelector(".gallery__cell")
    .cloneNode(true);
  const titleCell = galleryElement.querySelector(".gallery__cell-title");
  const linkCell = galleryElement.querySelector(".gallery__cell-image");
  const likeButton = galleryElement.querySelector(".gallery__button-like");
  const delButton = galleryElement.querySelector(
    ".gallery__cell-button-delete"
  );
  titleCell.textContent = obj.name;
  linkCell.src = obj.link;
  linkCell.alt = obj.name;
  likeButton.addEventListener("click", setLike);
  delButton.addEventListener("click", delCell);
  linkCell.addEventListener("click", selectCard);
  return galleryElement;
}

function selectCard(evt) {
  const cell = evt.target.closest(".gallery__cell");
  const imageCell = cell.querySelector(".gallery__cell-image");
  const titleCell = cell.querySelector(".gallery__cell-title");

  popupPhotoImg.src = imageCell.src;
  popupPhotoTitle.textContent = titleCell.textContent;
  openPopup(popupPhoto);
}

formElement.addEventListener("submit", submitFormHandler);
formElementAdd.addEventListener("submit", submitAddFormHandler);

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openAddPopup);
