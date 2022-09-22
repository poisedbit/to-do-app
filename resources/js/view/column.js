import Data from "../api/data.js";
import modal from "./modal.js";
import Task from "./task.js";

export default class Column {
    constructor(id) {
        this.id = id;
        this.elements = {};
        this.elements.root = document.getElementById(id);
        this.elements.container = this.elements.root.querySelector('.task-container');
        this.elements.btnAddItem = this.elements.root.querySelector('.btn-add-task');

        this.elements.btnAddItem.addEventListener('click', (e) => {
            modal.open(this.id);
        });
    }

    renderNewItem(data) {
        const item = new Task(data.newContent, data.columnId);
        this.elements.container.appendChild(item.element);
    }

    updateItem(data) {
        const item = Data.getItems(data.columnId)[data.id];
        
        Data.updateItem(data.id, data.columnId, data.newContent);
        item.elements.title.textContent = data.newContent.title;
        item.elements.description.textContent = data.newContent.description;
    }
}