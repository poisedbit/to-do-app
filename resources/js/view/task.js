"use strict";

import ID from "../api/id-log.js";
import DropZone from "./dropzone.js";

export default class Task {
    constructor (content, id = null) {
        this.id = (!id) ? ID.generateID() : id;
        this.content = content;
        this.elements = this.#createElements();
        this.elements.drop = DropZone.create();
        this.elements.root.append(this.elements.drop);
    }

    show(view) {
        switch(view) {
            case 0:
                this.elements.root.style.visibility = 'hidden';
                break;
            case 1:
                this.elements.root.style.visibility = 'visible';
                break;
            default:
                break;
        }
    }

    #createElements() {
        const fragment = new DocumentFragment();
        const root = document.createElement('div');

        root.className = 'task-item';
        root.dataset.id = this.id;
        root.draggable = true;
        root.innerHTML = `
            <div class="task-item-inner">
                <button class="btn-delete-task">x</button>
                <h3 class="task-item-title">${this.content.title}</h3>
                <p class="task-item-description">${this.content.description}</p>
            </div>
        `;
        root.style.visibility = 'visible';
        
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