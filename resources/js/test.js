import Data from "./api/data.js";
import Task from "./view/task.js";

 export default function test() {
    const keyName = 'test-data';
    const testItems = load(keyName);

    if (testItems.length !== 0) {
        return;
    }

    for (let i = 1; i < 10; i++) {
        const content = {}
        let columnId;

        if (i <= 3) {
            columnId = 'todo';
        } else if (i > 3 && i <= 6) {
            columnId = 'inProgress';
        } else {
            columnId = 'complete';
        }

        content.title = `Title number ${i}`;
        content.description = `This is a description with a number of ${i}.`;
        
        const item = new Task(content, columnId);
        
        testItems.push(item);
        Data.insertItem(item, item.columnId);
    }

    save(keyName, testItems);
}

function load(keyName) {
    const jsonData = localStorage.getItem(keyName);

    if (!jsonData) {
        return []
    }

    return JSON.parse(jsonData);
}

function save(keyName, data) {
    const jsonData = JSON.stringify(data);

    localStorage.setItem(keyName, jsonData);
}