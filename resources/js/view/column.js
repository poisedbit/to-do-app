import Data from "../api/data.js";
import ID from "../api/id-log.js";
import Task from "./task.js";

export default class Column {
    #id;
    #elements = {};
    #data = [];
    #modal;

    constructor(id, domId) {
        this.#id = id;
        this.#elements.root = document.getElementById(domId);
        this.#elements.container = this.#elements.root.querySelector('.task-container');
        this.#elements.btnAddItem = this.#elements.root.querySelector('.btn-add-task');
        this.#elements.root.dataset.id = id;

        this.#elements.btnAddItem.addEventListener('click', (e) => {
            this.#modal.open(this.#id);
        });

        Data.getItems(this.#id).forEach(item => {
            this.#data.push(new Task(item.content, item.id));

            if (!ID.log.includes(item.id)) {
                ID.insertID(item.id);
            }
        });
    }

    get id() {
        return this.#id;
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
        Data.insertItem(item, this.#id);
    }

    updateItem(id, newContent) {
        const item = this.#data.find(item => item.id === id);

        if (JSON.stringify(newContent) === JSON.stringify(item.content)) {
            this.showItem(item.id, 1);
            return
        }

        item.content = newContent;
        item.elements.title.textContent = item.content.title;
        item.elements.description.textContent = item.content.description;
        Data.updateItem(item.id, this.#id, item.content);
    }

    showItem(id, view) {
        const root = this.#data.find(i => i.id === id).elements.root;

        switch (view) {
            case 0: 
                root.style.visibility = 'hidden';
                break;
            case 1:
                root.style.visibility = 'visible';
                break;
            default:
                break;
        }
    }

    #setItemEvents(item) {
        item.elements.root.addEventListener('click', e => {
            let target = e.target;

            if (target != item.elements.btnDeleteTask){

                while (target.className !== 'task-item') {
                    target = target.parentElement;
                }
                
                this.showItem(item.id, 0);
                this.#modal.open(this.#id, item);
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
            Data.deleteItem(item.id, this.#id); 
        }
        
    }
}