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
    
    modal.onBlur = () => {
        const data = modal.getData();

        if (!data.isNew) {
            columns.find(c => c.id === data.columnId).updateItem(data);
        }
    }

    modal.close = (e) => {
        if (e.target.id === 'modal') {
            const data = modal.getData();
        
            modal.show(0);
        
            if (data.isNew) {
                columns.find(c => c.id === data.columnId).addNewItem(data);
            }

            if (!data.isNew) {
                columns.find(c => c.id === data.columnId).showItem(data, 1);
            }
        }

        
    }

    modal.setEvents(modal.onBlur, modal.close);

    columns.forEach(c => c.renderItems());
}

main();