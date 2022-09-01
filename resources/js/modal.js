import { Task } from "./task.js";

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const btnOk = document.getElementId('btn-ok');
let taskItemId;
let numStatus;

function openModal() {
    document.addEventListener('click', (e) => {
        if (e.target === document.getElementById('btn-task-new')) {
            modalTitle.value = '';
            modalDescription.value = '';
            modal.style.visibility = 'visible';
            numStatus = 0;
        } else if (e.target.classList.contains('task-item')) {
            modalTitle.value = e.target.getElementsByClassName('task-item-title')[0];
            modalDescription.value = e.target.getElementsByClassName('task-item-description')[0];
            modal.style.visibility = 'visible';
            taskItemId = e.target.id;
            numStatus = 1;
        }
    });
}

function closeModal(id) {
    document.addEventListener('click', (e) => {
        if (e.target === modal || e.target === btnOk) {
            const title = modalTitle;
            const description = modalDescription;
            let taskItem;
            if (numStatus === 0) {
                taskItem = new Task(title, description, id);
                taskItem.appendTask();
            } else {
                taskItem = document.getElementById(taskItemId);
                taskItem.getElementsByClassName('task-item-title')[0].innerHTML = title;
                taskItem.getElementsByClassName('task-item-description')[0].innerHTML = description;
            }
        }
    });
}

export { openModal, closeModal }