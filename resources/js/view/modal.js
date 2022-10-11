"use strict";

export default class Modal {
    #elements = {}
    #selectedItem = {}

    constructor(columns) {
        this.#elements.root = document.getElementById('modal');
        this.#elements.title = document.getElementById('modal-title');
        this.#elements.description = document.getElementById('modal-description');
        this.#setEvents(this.#getListeners(columns));
    }

    open(columnID, item = null) {
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

    #setEvents([onBlur, close]) {
        this.#elements.title.addEventListener('blur', onBlur);
        this.#elements.description.addEventListener('blur', onBlur);
        document.addEventListener('click', close);
    }

    #getListeners(columns) {
        const onBlur = () => {
            const item = this.#selectedItem;
            const newContent = this.#content;

            if (!item.isNew) {
                columns.find(c => c.id === item.columnID).
                    updateItem(item.id, newContent);
            }
        }

        const close = (e) => {
            if (e.target.id === 'modal') {
                this.#show(0);

                const item = this.#selectedItem;
                const newContent = this.#content;

                if (item.isNew) {
                    columns.find(c => c.id === item.columnID).
                        addNewItem(newContent);
                } else {
                    columns.find(c => c.id === item.columnID).
                        getItem(item.id).show(1);
                }
            }
        }

        return [onBlur, close];
    }

    #show(view) {
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

    get #content() {
        return {
            title: this.#elements.title.textContent.trim(),
            description: this.#elements.description.textContent.trim()
        }
    }

    set #content([title, description]) {
        this.#elements.title.textContent = title;
        this.#elements.description.textContent = description;
    }
}