"use strict";

import test from "./test.js";
import Column from "./view/column.js";
import Modal from "./view/modal.js";

function main() {
    test();

    const columns = [
        new Column('todo', 'task-todo'),
        new Column('inprogress', 'task-in-progress'),
        new Column('complete', 'task-complete')
    ]
    
    const modalDiv = new Modal(columns);

    columns.forEach(c => c.modal = modalDiv)
    columns.forEach(c => c.renderItems());
}

main();