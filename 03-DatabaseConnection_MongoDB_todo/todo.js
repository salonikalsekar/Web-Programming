const mongoCollections = require("./Mongocollections");
const todo = mongoCollections.todoItems;

const id = require("node-uuid");


let exportedMethods = {




    createTask(title, description) {
        if (!title)
            return Promise.reject("You must provide a title");

        if (!description)
            return Promise.reject("You must provide a description");


        return todo().then((todoItemsCollection) => {
            let newTask = {
                _id: id.v4(),
                title: title,
                description: description,
                completed: false,
                completedAt: null
            };

            return todoItemsCollection
                .insertOne(newTask)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getTask(newId);
                });

        });

    },



    getAllTasks() {
        return todo().then((todoItemsCollection) => {
            return todoItemsCollection.find().toArray()

        });
    },

    getTask(id) {
        if (!id)
            return Promise.reject("You must provide an id");
        return todo().then((todoItemsCollection) => {
            return todoItemsCollection.findOne({ _id: id });
        });
    },


    removeTask(id) {

        if (!id)
            return Promise.reject("You must provide an id");

        return todo().then((todoItemsCollection) => {
            return todoItemsCollection
                .removeOne({ _id: id })
                .then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        throw (`Could not delete task with id of ${id}`)
                    }
                });
        });
    },

    completeTask(taskId) {
        let abc = todo().then((todoItemsCollection) => {
            return todoItemsCollection.findOne({ _id: taskId })
        });

        let date = new Date();
        let current_hour = date.getHours();
        let current_minute = date.getMinutes();
        if (!taskId)
            return Promise.reject("You must provide an id to search for");

        return todo().then((todoItemCollection) => {
            return todoItemCollection.updateOne({
                _id: id
            }, { $set: { completed: true, completedAt: `${current_hour}:${current_minute}` } }).then(() => {
                return this.getTask(id);
            });
        });
    }

}
module.exports = exportedMethods;