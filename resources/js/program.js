// @ts-check

import { modal } from "./modal.js";

function main() {
    document.getElementById('btn-new-task').addEventListener('click', modal.open);
    modal.element.addEventListener('click', modal.close);
    document.getElementById('btn-ok').addEventListener('click', modal.close);
}

main();