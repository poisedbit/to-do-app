"use strict";

import test from "./test.js";
import Column from "./view/column.js";
import DropZone from "./view/dropzone.js";
import Modal from "./view/modal.js";

function main() {
    test();

    const columns = [
        new Column('todo'),
        new Column('inprogress'),
        new Column('complete')
    ]
    
    const modalDiv = new Modal(columns);

    DropZone.columns = columns;
    columns.forEach(c => c.modal = modalDiv)
    columns.forEach(c => c.renderItems());
}

main();