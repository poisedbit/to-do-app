"use strict";

import Column from "./view/column";
import modal from "./view/modal";

function main() {

    const App = {
        todo: new Column('task-todo'),
        inProgress: new Column('task-in-progress'),
        complete: new Column('task-complete')
    }

    modal.setEvents(() => {
        const data = modal.close();

        App[data.columnId].renderNewItem(data);

        if (data.isNew !== true) {
            App[data.columnId].updateItem(data);
        }
    })
}

main();