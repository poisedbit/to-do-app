import Data from "../api/data.js";
import ID from "../api/id-log.js";
import DropZone from "./dropzone.js";
import Task from "./task.js";

export default class Column {
    #id;
    #elements = {};
    #data = [];
    #modal;

    constructor(id) {
        this.#id = id;
        this.#elements.root = document.querySelector(`[data-id="${id}"]`);
        this.#elements.btnAddItem = this.#elements.root.querySelector('.btn-add-task');
        this.#elements.container = this.#elements.root.querySelector('.task-container');
        this.#elements.root.dataset.id = id;

        const topDropZone = DropZone.create();

        this.#elements.container.appendChild(topDropZone);

        this.#elements.btnAddItem.addEventListener('click', (e) => {
            this.#modal.open(id);
        });

        Data.getItems(id).forEach(item => {
            this.#data.push(new Task(item.content, item.id));

            if (!ID.log.includes(item.id)) {
                ID.insertID(item.id);
            }
        });
    }

    get id() {
        return this.#id;
    }

    get elements() {
        return this.#elements;
    }

    get data() {
        return this.#data;
    }

    set modal(modal) {
        this.#modal = modal;
    }

    renderItems() {
        this.#data.forEach(item => this.#setItemEvents(item));
        this.#data.forEach(item => this.#elements.container.appendChild(item.elements.fragment));
    }

    addNewItem(content) {
        if (content.title === '' || content.description === '') {
            return
        }

        const item = new Task(content);

        this.#data.push(item);
        this.#setItemEvents(item);
        this.#elements.container.appendChild(item.elements.fragment);
        Data.insertItem(item, this.id);
    }
    
    updateItem(id, newContent) {
        const item = this.getItem(id);

        item.content = newContent;
        item.elements.title.textContent = item.content.title;
        item.elements.description.textContent = item.content.description;
        Data.updateItem(item.id, this.id, [item.content]);
    }

    getItem(id) {
        return this.#data.find(item => item.id === id);
    }

    #setItemEvents(item) {
        item.elements.root.addEventListener('click', e => {
            let target = e.target;

            if (target != item.elements.btnDeleteTask){

                while (target.className !== 'task-item') {
                    target = target.parentElement;
                }
                
                item.show(0);
                this.#modal.open(this.id, item);
            }
        });

        item.elements.root.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', item.id);
        });

        item.elements.btnDeleteTask.addEventListener('click', () => this.#deleteItem(item));
    }

    #deleteItem(item) {
        if (confirm('Are you sure you want to delete this task?')) {
            const index = this.#data.findIndex(i => i.id === item.id);
            const root = item.elements.root;

            this.#elements.container.removeChild(root);
            this.#data.splice(index, 1);
            Data.deleteItem(item.id, this.id); 
        }
    }
}