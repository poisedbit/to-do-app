// @ts-check

import { taskList } from "./task-list.js";
import { Task } from "./task.js";

let item;
let itemElement;
let numStatus;

const modal = {
    element: document.getElementById('modal'),
    title: document.getElementById('modal-title'),
    description: document.getElementById('modal-description'),

    set elementContent(item) {
        this.title.value =  item.title;
        this.description.value = item.description;
        this.element.style.visibility = 'visible';
    },

    open: function(e) {
        if (e.target == document.getElementById('btn-new-task')) {
            modal.elementContent = new Task('', '', null);
            numStatus = 0;
        } else if (e.target.className != 'btn-remove-task') {
            itemElement = e.target;

            while (itemElement.className != 'task-item') {
                itemElement = itemElement.parentElement;
            }

            item = taskList.getItem(itemElement.id);
            modal.elementContent = item;
            numStatus = 1;
        }
    },

    close: function(e) {
        if (e.target == modal.element || e.target == document.getElementById('btn-ok')) {
            switch (numStatus) {
                case 0:

                    const newItem = new Task(modal.title.value, modal.description.value, taskList.todo.length);
                    taskList.addTodo(newItem);
                    document.getElementById('task-todo').querySelector('.task-container').appendChild(newItem.element);
                    modal.element.style.visibility = 'hidden';
                    break;

                case 1:
                    
                    taskList.updateItem(itemElement.id, modal.title.value, modal.description.value);
                    itemElement.querySelector('.task-item-title').innerHTML = modal.title.value;
                    itemElement.querySelector('.task-item-description').innerHTML = modal.description.value;
                    modal.element.style.visibility = 'hidden';
                    break;

                default:
                    break;
            }
        }
    }
}

export { modal }