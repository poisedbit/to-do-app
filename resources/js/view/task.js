"use strict";

import ID from "../api/id-log.js";

export default class Task {
    constructor (content, columnId, id = null) {
        this.content = content;
        this.columnId = columnId;
        this.id = (!id) ? ID.generateID() : id;
    }

    createElements() {
        const fragment = new DocumentFragment();
        const root = document.createElement('div');

        root.className = 'task-item';
        root.dataset.id = this.id;
        root.dataset.columnId = this.columnId;
        root.innerHTML = `
            <div class="task-item-inner">
                <button class="btn-delete-task">x</button>
                <h3 class="task-item-title">${this.content.title}</h3>
                <p class="task-item-description">${this.content.description}</p>
            </div>
            
            `;
        
        fragment.append(root);

        const elements = {}
        elements.fragment = fragment;
        elements.root = fragment.children[0];
        elements.title = elements.root.querySelector('.task-item-title');
        elements.description = elements.root.querySelector('.task-item-description');
        elements.btnDeleteTask = elements.root.querySelector('.btn-delete-task');
        
        return elements;
    }
}