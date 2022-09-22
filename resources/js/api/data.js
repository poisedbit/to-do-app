export default class Data {
    static name = 'task-items';
    static insertItem(item, columnId) {
        const data = load(this.name);
        const column = data[columnId];

        if (!column) {
            data[columnId] = [];
        }

        column.push(item);
        save(this.name, data);
    }
    static getItems(columnId) {
        const data = load(this.name);
        const column = data[columnId];

        if (!column) {
            return [];
        }

        return column;
    }
    static updateItem(id, columnId, newContent) {
        const data = load(this.name);
        const column = data[columnId];

        column[id].content = newContent;
        save(this.name, data);
    }
    static deleteItem(id, columnId) {
        const data = load(this.name);
        const column = data[columnId];

        column.forEach( (element, index, list) => {

            if (element.id > id) {
                list[index].id -= 1;
            }

        });

        column.splice(id, 1);
        save(this.name, data);
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

export { Data }