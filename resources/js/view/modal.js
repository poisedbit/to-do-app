"use strict";

export default class Modal {
    static #columns;
    static #elements = {
        root: document.getElementById('modal'),
        title: document.getElementById('modal-title'),
        description: document.getElementById('modal-description')
    }
    static #selectedItem = {}

    static set columns(columns) {
        this.#columns = columns;
    }

    static get listeners() {
        const onBlur = () => {
            const item = this.#selectedItem;
            const newContent = this.#content;

            if (!item.isNew) {
                this.#columns.find(c => c.id === item.columnID).
                    updateItem(item.id, newContent);
            }
        }

        const close = (e) => {
            if (e.target.id === 'modal') {
                this.#show(0);

                const item = this.#selectedItem;
                const newContent = this.#content;

                if (item.isNew) {
                    this.#columns.find(c => c.id === item.columnID).
                        addNewItem(newContent);
                } else {
                    this.#columns.find(c => c.id === item.columnID).
                        getItem(item.id).show(1);
                }
            }
        }

        return [onBlur, close];
    }

    static set events([onBlur, close]) {
        this.#elements.title.addEventListener('blur', onBlur);
        this.#elements.description.addEventListener('blur', onBlur);
        document.addEventListener('click', close);
    }

    static open(columnID, item = null) {
        this.#content = ['', ''];
        this.#selectedItem.columnID = columnID;
        this.#selectedItem.isNew = true;

        if (item != null) {
            this.#content = [item.content.title, item.content.description];
            this.#selectedItem.id = item.id;
            this.#selectedItem.isNew = false;
        }

        this.#show(1);
    }

    static #show(view) {
        switch (view) {
            case 0:
                this.#elements.root.style.visibility = 'hidden';
                break;
            case 1:
                this.#elements.root.style.visibility = 'visible';
                break;
            default:
                break;
        }
    }

    static get #content() {
        return {
            title: this.#elements.title.value.trim(),
            description: this.#elements.description.value.trim()
        }
    }

    static set #content([title, description]) {
        this.#elements.title.value = title;
        this.#elements.description.value = description;
    }
}