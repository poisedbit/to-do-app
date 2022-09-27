import Data from "../api/data.js";
import modal from "./modal.js";
import Task from "./task.js";

export default class Column {
    constructor(id, domId) {
        this._id = id;
        this._data = {}
        this._data.items = []
        this._data.elements = []

        Data.getItems(this._id).forEach(item => this._data.items.push(new Task(item.content, item.columnId, item.id)));
        this._data.items.forEach(item => this._data.elements.push(item.createElements()));
        
        this._elements = {};
        this._elements.root = document.getElementById(domId);
        this._elements.container = this._elements.root.querySelector('.task-container');
        this._elements.btnAddItem = this._elements.root.querySelector('.btn-add-task');
        this._elements.root.dataset.id = id;

        this._elements.btnAddItem.addEventListener('click', (e) => {
            modal.open(this._id);
        });
    }

    get id() {
        return this._id;
    }

    renderItems() {
        this._data.elements.forEach((e, index) => this._setItemEvents(this._data.items[index], e));
        this._data.elements.forEach(e => this._elements.container.appendChild(e.fragment));
    }

    addNewItem(data) {

        if (data.newContent.title === '' || data.newContent === '') {
            return
        }

        const item = new Task(data.newContent, data.columnId);
        const columnItems = this._data.items;
        const columnElements = this._data.elements;

        columnItems.push(item);
        columnElements.push(item.createElements());

        const index = columnItems.findIndex(i => i.id === item.id);

        this._setItemEvents(item, columnElements[index]);
        this._elements.container.appendChild(columnElements[index].fragment);
        Data.insertItem(item, this._id);
    }

    updateItem(data) {
        const index = this._data.items.findIndex(i => i.id === data.id);
        const item = this._data.items[index];
        const elements = this._data.elements[index];

        if (JSON.stringify(data.newContent) === JSON.stringify(item.content)) {
            this.showItem(item, 1);
            return
        }

        item.content = data.newContent;
        elements.title.textContent = item.content.title;
        elements.description.textContent = item.content.description;
        Data.updateItem(item.id, this._id, item.content);
    }

    showItem(item, view) {
        const index = this._data.items.findIndex(i => i.id === item.id);
        const root = this._data.elements[index].root;

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

    _setItemEvents(item, elements) {
        elements.root.addEventListener('click', (e) => {
            let target = e.target;

            if (target != elements.btnDeleteTask){

                while (target.className !== 'task-item') {
                    target = target.parentElement;
                }
                
                this.showItem(item, 0);
                modal.open(this._id, item);
            }
        });

        elements.btnDeleteTask.addEventListener('click', () => {
            this._deleteItem(item, elements);
        })
    }

    _deleteItem(item, elements) {
        
        if (confirm('Are you sure you want to delete this task?')) {
            const index = this._data.items.findIndex(i => i.id === item.id);
            const root = elements.root;

            this._elements.container.removeChild(root);
            this._data.items.splice(index, 1);
            this._data.elements.splice(index, 1);
            Data.deleteItem(item.id, this._id); 
        }
        
    }
}