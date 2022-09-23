"use strict";

const modal = {
    elements: {
        root: document.getElementById('modal'),
        content: {
            title: document.getElementById('modal-title'),
            description: document.getElementById('modal-description')
        },
        btnOk: document.getElementById('btn-modal-ok'),
    }
}

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

modal.setEvents = (func) => {
    modal.elements.root.addEventListener('click', func);
    modal.elements.btnOk.addEventListener('click', func);
}

modal.show = (view) => {
    switch (view) {
        case 0: 
            modal.elements.root.style.visibility = 'hidden';
            return console.log('modal closed');
        case 1:
            modal.elements.root.style.visibility = 'visible';
            return console.log('modal opened');
    }
}

modal.open = (columnId, item = null) => {
    modal.setContent('', '');
    modal.item.columnId = columnId;
    modal.item.isNew = true;                     // true if a new item's being created, false otherwise

    if (item != null) {
        
        modal.setContent(item.content.title, item.content.description)
        modal.item.id = item.id;
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