class Task {
    constructor (title, description, id) {
        this._title = title;
        this._description = description;
        this._id = id;
    }
    appendTask() {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item`;
        taskItem.id = `todo-${id}`;
        taskItem.innerHTML = `
            <div class="task-item-inner">
                <h3 class="task-item-title">${this._title}</h3>
                <p class="task-item-description">${this._description}</p>
            </div>
            `;
        document.getElementById('task-todo').getElementsByClassName('task-container')[0].appendChild(taskItem);
    }
}

export { Task }