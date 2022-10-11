import ID from "./id-log.js";

export default class Data {
    static #keyName = 'task-items';

    static insertItem(item, columnID) {
        const data = load(this.#keyName);
        const column = data[columnID];

        if (!column) {
            data[columnID] = [];
        }
        
        column.push({
            id: item.id,
            content: item.content
        });

        ID.insertID(item.id);
        save(this.#keyName, data);
    }
    
    static getItems(columnID) {
        const data = load(this.#keyName);
        const column = data[columnID];

        if (!column) {
            return [];
        }

        return column;
    }

    static updateItem(id, columnID, [newContent, newPosition, targetColumnID]) {
        const data = load(this.#keyName);
        const column = data[columnID];
        const item = column.find(item => item.id === id);

        item.content = (newContent == undefined) ? item.content : newContent;

        if (targetColumnID !== undefined && newPosition !== undefined) {
            const targetColumn = data[targetColumnID];

            column.splice(column.indexOf(item), 1);
            targetColumn.splice(newPosition, 0, item);
        }
        
        save(this.#keyName, data);
    }

    static deleteItem(id, columnID) {
        const data = load(this.#keyName);
        const column = data[columnID];
        const index = column.findIndex(i => i.id === id);

        column.splice(index, 1);
        ID.deleteID(id);
        save(this.#keyName, data);
    }
}

function load(keyName) {
    const jsonData = localStorage.getItem(keyName);

    if (!jsonData) {
        return {
            todo: [],
            inprogress: [],
            complete: []
        }
    }

    return JSON.parse(jsonData);
}

function save(keyName, data) {
    const jsonData = JSON.stringify(data);
    
    localStorage.setItem(keyName, jsonData);
}