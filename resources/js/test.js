import Data from "./api/data.js";
import Task from "./view/task.js";

 export default function test() {
    const keyName = 'test-data';
    const testItems = load(keyName);

    if (testItems.length) {
        return;
    }

    for (let i = 1; i < 10; i++) {
        const content = {}
        let column;

        if (i <= 3) {
            column = 'todo';
        } else if (i > 3 && i <= 6) {
            column = 'inprogress';
        } else {
            column = 'complete';
        }

        content.title = `Title number ${i}`;
        content.description = `This is a description with the number ${i}.`;
        
        const item = new Task(content);
        
        testItems.push({item: item, column: column});
    }
    
    save(keyName, testItems);
    testItems.forEach(test => Data.insertItem(test.item, test.column));
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