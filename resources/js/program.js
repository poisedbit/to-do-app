"use strict";

import test from "./test.js";
import Column from "./view/column.js";
import DropZone from "./view/dropzone.js";
import Modal from "./view/modal.js";

function main() {
    const columns = [
        new Column('todo'),
        new Column('inprogress'),
        new Column('complete')
    ]
    
    Modal.columns = columns;
    Modal.events = Modal.listeners;

    DropZone.columns = columns;
    columns.forEach(c => c.renderItems());
}

/*
    
*/

main();