"use strict";

const modal = {}

modal.elements = {}
modal.elements.root = document.getElementById('modal');
modal.elements.content.title = modal.elements.root.querySelector('#modal-title');
modal.elements.content.description = modal.elements.root.getElementById('#modal-description');
modal.elements.btnOk = modal.elements.root.querySelector('#btn-modal-ok');
modal.item = {}

modal.getContent = () => {
    return {
        title: modal.elements.content.title.textContent,
        description: modal.elements.content.description.textContent
    }
}

modal.setContent = (title, description) => {
    modal.elements.content.title.textContent = title;
    modal.elements.content.description.textContent = description;
}

modal.setEvents = () => {
    modal.elements.root.addEventListener('click', func);
    modal.elements.btnOk.addEventListener('click', func);
}

modal.show = (view) => {
    switch (view) {
        case 0: 
            modal.element.style.visibility = 'hidden';
        case 1:
            modal.element.style.visibility = 'visible';
    }
}

modal.open = (columnId, id = null, content = null) => {
    modal.setContent('', '');
    modal.item.columnId = columnId;
    modal.item.isNew = true;                     // true if a new item's being created, false otherwise

    if (content != null) {
        modal.setContent(content.title, content.description)
        modal.item.id = id;
        modal.item.isNew = false;
    }

    modal.show(1);
}

modal.close = () => {
    modal.show(0);
    return {
        id: modal.item.id,
        columnId: modal.item.columnId,
        newContent: modal.getContent(),
        isNew: modal.item.isNew
    };
}

export default modal;