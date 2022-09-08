// @ts-check

import { taskList } from "./task-list.js";
import { modal } from "./modal.js";

class Task {
    constructor (title, description, id) {
        this._title = title;
        this._description = description;
        this._id = id;
    }

    get title() {
        return this._title;
    }
    set title(newTitle) {
        this._title = newTitle;
    }
    set description(newDescription) {
        this._description = newDescription;
    }
    get description(){
        return this._description;
    }
    get id() {
        return this._id;
    }
    set id(newId) {
        this._id = newId;
    }
    
    get element() {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item`;
        taskElement.id = `todo-${this._id}`;
        taskElement.innerHTML = `
            <div class="task-item-inner">
                <button class="btn-remove-task">x</button>
                <h3 class="task-item-title">${this._title}</h3>
                <p class="task-item-description">${this._description}</p>
            </div>
            
            `;
        this.eventListeners = taskElement;
        return taskElement;
    }
    
    set eventListeners(element) {
        element.addEventListener('click', modal.open);
        element.addEventListener('click', removeElement);

        function removeElement(e) {
            if (e.target.className == 'btn-remove-task') {
                let taskElement = e.target.parentElement;

                while (taskElement.className != 'task-item') {
                    taskElement = taskElement.parentElement;
                }

                const parentIdDetails = taskList.getIdDetails(taskElement.id);
                const elementsList = taskElement.parentElement.querySelectorAll('.task-item');
                console.log(elementsList);
                taskList.removeItem(taskElement.id);
                taskElement.id = `${parentIdDetails.status}-`;
                elementsList.forEach(parentIdDetails.updateIds);
                taskElement.remove();
            }
        }
    }
}

export { Task }