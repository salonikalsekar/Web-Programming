const todotasks = require("./todo");
const connection = require("./Mongoconnection");
const id = require("node-uuid");
const mongoCollections = require("./Mongocollections");
const todo = mongoCollections.todoItems;

//This statement will insert the first task and log it
let addTask = todotasks.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");

var show = addTask.then((task) => {
    console.log(task);
    return task;
});


//The statement below will insert the second task
var second = show.then((task1) => {
    return todotasks.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
});


var getAll = second.then((data) => {
    return todotasks.getAllTasks();
});
var getAllTasks = getAll.then((allData) => {
    console.log(allData);
})
var getAllTasks1 = getAllTasks.then((data) => {
    return todotasks.getAllTasks();
});

var removeFirst = getAllTasks1.then((removeData) => {
    return todotasks.removeTask(removeData[0]._id);

})

var remove = removeFirst.then((removetask) => {
    console.log("First task removed");
})

var getData = remove.then((data) => {
    return todotasks.getAllTasks();
});
var getData1 = getData.then((allData) => {
    console.log(allData);
})
var complete = getData1.then((data) => {
    return todotasks.getAllTasks();
});

var completeTask = complete.then((completeData) => {
    return todotasks.completeTask(completeData[0]._id);

})

var displayAll = completeTask.then((data) => {
    return todotasks.getAllTasks();
});
var seventh = displayAll.then((allData) => {
    console.log(allData);
})

seventh.catch().then(() => {
    return connection();
}).then((db) => {
    return db.close();
});
