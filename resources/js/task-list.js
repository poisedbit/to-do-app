// @ts-check

const taskList = {
    todo: [],
    inProgress: [],
    complete: [],

    addTodo: function(item) {
        this.todo.push(item);
        console.log(this.todo);
    },

    getIdDetails: function(id) {
        const status = id.split('-')[0];
        const index = parseInt(id.split('-')[1]);

        return {
            status: status,
            index: index,

            updateIds: function(itemToUpdate, itemIndex, list) {
                if (itemIndex > index) {
                    let idUpdate;

                    if (typeof itemToUpdate.id !== 'number') {
                        idUpdate = itemToUpdate.id.split('-'); 
                        idUpdate[1] = parseInt(idUpdate[1]) - 1;
                        idUpdate = idUpdate.join('-');
                    } else {
                        idUpdate = itemToUpdate.id - 1;
                    }
                    
                    list[itemIndex].id = idUpdate;
                }
            }
        }
    },

    getItem: function(elementId) {
        const idDetails = this.getIdDetails(elementId);
        
        return taskList[idDetails.status][idDetails.index];
    },

    updateItem: function(elementId, newTitle, newDescription) {
        const idDetails = this.getIdDetails(elementId);

        taskList[idDetails.status][idDetails.index].title = newTitle;
        taskList[idDetails.status][idDetails.index].description = newDescription;
        console.log(taskList[idDetails.status]);
    },

    removeItem: function(elementId) {
        const idDetails = this.getIdDetails(elementId);

        taskList[idDetails.status].forEach(idDetails.updateIds);
        taskList[idDetails.status].splice(idDetails.index, 1);
        console.log(taskList[idDetails.status]);
    }
}

export { taskList }