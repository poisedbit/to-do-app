import { taskList } from "./task-list.js";
import { Task } from "./task.js";

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const btnOk = document.getElementById('btn-ok');
const btnTaskNew = document.getElementById('btn-task-new');
let taskItemId;
let numStatus;

function openModal(e) {
    if (e.target == btnTaskNew) {
        modalTitle.value = '';
        modalDescription.value = '';
        modal.style.visibility = 'visible';
        numStatus = 0;
    } else {
        console.log(e.target);
        let item;
        switch (e.target.className) {
            case 'task-item':
                item = e.target;
                break;
            case 'task-item-inner':
                item = e.target.parentElement;
                break;
            default:
                item = e.target.parentElement.parentElement;
                break;
        }
        modalTitle.value = item.querySelector('.task-item-title').innerHTML;
        modalDescription.value = item.querySelector('.task-item-description').innerHTML;
        modal.style.visibility = 'visible';
        taskItemId = item.id;
        numStatus = 1;
    }
}

function closeModal(e) {
    if (e.target == modal || e.target === btnOk) {
        const title = modalTitle.value;
        const description = modalDescription.value;
        const  id = taskList.todo.length;
        if (numStatus === 0) {
            const item = new Task(title, description, id);
            taskList.addTodo(item);
            item.appendTask();
            modal.style.visibility = 'hidden';
        } else {
            const item = document.getElementById(taskItemId);
            item.querySelector('.task-item-title').innerHTML = title;
            item.querySelector('.task-item-description').innerHTML = description;
            modal.style.visibility = 'hidden';
        }
    }
}

export { openModal, closeModal, modal, btnOk, btnTaskNew }