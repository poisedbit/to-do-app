import { openModal, closeModal, modal, btnTaskNew, btnOk } from "./modal.js";

btnTaskNew.addEventListener('click', openModal);
modal.addEventListener('click', closeModal);
btnOk.addEventListener('click', closeModal);