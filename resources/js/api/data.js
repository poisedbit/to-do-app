import ID from "./id-log.js";

export default class Data {
    static _keyName = 'task-items';

    static insertItem(item, columnId) {
        const data = load(this._keyName);
        const column = data[columnId];

        if (!column) {
            data[columnId] = [];
        }
        
        column.push(item);
        ID.insertID(item.id);
        save(this._keyName, data);
    }
    
    static getItems(columnId) {
        const data = load(this._keyName);
        const column = data[columnId];

        if (!column) {
            return [];
        }

        return column;
    }

    static updateItem(id, columnId, newContent) {
        const data = load(this._keyName);
        const column = data[columnId];

        column.find(item => item.id === id).content = newContent;
        save(this._keyName, data);
    }

    static deleteItem(id, columnId) {
        const data = load(this._keyName);
        const column = data[columnId];
        const index = column.findIndex(item => item.id === id);

        column.splice(index, 1);
        ID.deleteID(id);
        save(this._keyName, data);
    }
}

function load(keyName) {
    const jsonData = localStorage.getItem(keyName);

    if (!jsonData) {
        return {
            todo: [],
            inProgress: [],
            complete: []
        }
    }

    return JSON.parse(jsonData);
}

function save(keyName, data) {
    const jsonData = JSON.stringify(data);
    
    localStorage.setItem(keyName, jsonData);
}