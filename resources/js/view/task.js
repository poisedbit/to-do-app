"use strict";

import Data from "../api/data.js";
import modal from "./modal.js";

export default class Task {
    constructor (content, columnId) {
        this.content = content;
        this.columnId = columnId;
        this.id = Data.getItems(columnId).length;

        this.elements.root = this.element;
        this.elements.title = this.elements.root.querySelector('.task-item-title');
        this.elements.description = this.elements.root.querySelector('.task-item-description');
        this.elements.btnDeleteTask = this.elements.root.querySelector('.btn-delete-task');

        this.setEvents([
            (e) => {
                const target = e.target;

                while (target.className != 'task-item') {
                    target = target.parentElement;
                }

                modal.open(this.columnId, this.id, this.content);
            },
            () => {
                const columnData = this.elements.root.parentElement.getElementsByClassName('task-item');

                columnData.forEach((columnItem, index, list) => {

                    if (columnItem.dataset.id > item.id) {
                        list[index].dataset.id -= 1;
                    }
        
                });
        
                columnData[this.id].parentNode.removeChild(columnData[this.id]);
                Data.deleteItem(this.id, this.columnId);
            }
        ]);
    }
    
    get element() {
        const element = document.createElement('div');
        element.className = 'task-item';
        element.dataset.id = this.id;
        element.dataset.columnId = this.columnId;
        element.innerHTML = `
            <div class="task-item-inner">
                <button class="btn-delete-task">x</button>
                <h3 class="task-item-title">${this.content.title}</h3>
                <p class="task-item-description">${this.content.description}</p>
            </div>
            
            `;
        return element;
    }

    _setEvents(funcs) {
        this.elements.root.addEventListener('click', funcs[0]);
        this.elements.btnDeleteTask.addEventListener('click', funcs[1]);
    }
}