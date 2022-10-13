import Data from "../api/data.js";

export default class DropZone {
    static columns;

    static create() {
        const root = document.createElement('div');
        
        root.className = 'dropzone';

        root.addEventListener('dragover', e => {
            e.preventDefault();

            const dropZonesArr = Array.from(root.closest('.task-column').querySelectorAll('.dropzone'));
            const receiverPosition = dropZonesArr.indexOf(root);
            const itemID = Number(e.dataTransfer.getData('text/plain'));
            const transferColumnID = document.querySelector(`[data-id="${itemID}"]`).closest('.task-column').dataset.id;
            const receiverColumnID = root.closest('.task-column').dataset.id;
            const itemIndex = Array.from(document.querySelector(`[data-id="${transferColumnID}"]`).querySelectorAll('.task-item')).findIndex(i => i.dataset.id == itemID);

            if (document.querySelector(`[data-id="${itemID}"]`).contains(root)) {
                return;
            }

            if ((transferColumnID === receiverColumnID) && ((receiverPosition === 0 && itemIndex === 0) || receiverPosition === itemIndex)) {
                return;
            }

            root.classList.add('dropzone-active');
        });

        root.addEventListener('dragleave', e => {
            root.classList.remove('dropzone-active');
        });

        root.addEventListener('drop', e=> {
            e.preventDefault();
            root.classList.remove('dropzone-active');

            const dropZonesArr = Array.from(root.closest('.task-column').querySelectorAll('.dropzone'));
            const receiverPosition = dropZonesArr.indexOf(root);
            const insertAfter = (receiverPosition === 0) ? root : root.parentElement;
            const itemID = Number(e.dataTransfer.getData('text/plain'));
            const transferColumnID = document.querySelector(`[data-id="${itemID}"]`).closest('.task-column').dataset.id;
            const transferColumn = this.columns.find(c => c.id === transferColumnID);
            const item = transferColumn.getItem(itemID);
            const itemIndex = transferColumn.data.findIndex(i => i.id === item.id);
            const receiverColumnID = root.closest('.task-column').dataset.id;
            const receiverColumn = this.columns.find(c => c.id == receiverColumnID);

            if (item.elements.root.contains(root)) {
                return;
            }

            if ((transferColumnID === receiverColumnID) && (receiverPosition === 0 && itemIndex === 0)) {
                return;
            }

            transferColumn.data.splice(itemIndex, 1);
            item.columnID = receiverColumn.id;
            receiverColumn.data.splice(receiverPosition, 0, item);
            insertAfter.after(item.elements.root);
            console.log([transferColumn.data, receiverColumn.data]);
            console.log([transferColumn, receiverColumn])
            Data.updateItem(item.id, transferColumnID, [null, receiverPosition, receiverColumnID]);
        });

        return root;
    }
}