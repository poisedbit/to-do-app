const taskList = {
    todo: [],
    inProgress: [],
    complete: [],
    addTodo: function(item) {
        this.todo.push(item)
    }
}

export { taskList }