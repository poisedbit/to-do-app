import { openModal, closeModal } from "./modal";

taskList = {
    todo: [],
    inProgress: [],
    complete: []
}

openModal();
closeModal(taskList.todo.length);