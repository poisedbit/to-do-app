"use strict";

const modal = {
    elements: {
        root: document.getElementById('modal'),
        content: {
            title: document.getElementById('modal-title'),
            description: document.getElementById('modal-description')
        }
    }
}

modal.item = {}

modal.getContent = () => {
    return {
        title: modal.elements.content.title.textContent.trim(),
        description: modal.elements.content.description.textContent.trim()
    }
}

modal.setContent = (title, description) => {
    modal.elements.content.title.textContent = title;
    modal.elements.content.description.textContent = description;
}

modal.getData = () => {
    return {
        id: modal.item.id,
        columnId: modal.item.columnId,
        newContent: modal.getContent(),
        isNew: modal.item.isNew
    }
}

modal.setEvents = (func, func1) => {
    modal.elements.content.title.addEventListener('blur', func);
    modal.elements.content.description.addEventListener('blur', func);
    document.addEventListener('click', func1);
}

modal.show = (view) => {
    switch (view) {
        case 0: 
            modal.elements.root.style.visibility = 'hidden';
            break;
        case 1:
            modal.elements.root.style.visibility = 'visible';
            break;
        default:
            break;
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

export default modal;