"use strict";

import test from "./test.js";
import Column from "./view/column.js";
import modal from "./view/modal.js";

function main() {
    test();

    const columns = [
        new Column('todo', 'task-todo'),
        new Column('inProgress', 'task-in-progress'),
        new Column('complete', 'task-complete')
    ]

    modal.setEvents((e) => {
        if (e.target.id != 'modal-inner') {
            const data = modal.close();

            if (data.isNew) {
                columns.find(c => c.id === data.columnId).addNewItem(data);
            } else {
                columns.find(c => c.id === data.columnId).updateItem(data);
            }
        }
    });

    columns.forEach(c => c.renderItems());
}

main();