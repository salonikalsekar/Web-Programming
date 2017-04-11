const data1 = require('./data1')
let value = 2;
let list = {};
data1.output().then(obj => {
    list = obj;
})



let comp = (l, r) => {
    return l.due_date > r.due_date;
}

let getList = function() {
    return value;
}

let create = function(title, due, summary, body) {
    let newTask = {
        id: ++value,
        title: title,
        done: false,
        due_date: due,
        summary: summary,
        body: body
    };
    list.notes.push(newTask);
    list.notes.sort(comp);
    for (let i = 1; i <= value; i++) {
        list.notes[i - 1].id = i;
    }

    data1.save(list)
    .then(res => {
    })

    return newTask;
};

let get = function(id) {
    if (!list.notes[id - 1]) throw "Invalid";
    return list.notes[id - 1];
};


let getAll = function() {
    return list.notes;
};

module.exports = {
    getList: getList,
    get: get,
    getAll: getAll,
    create: create
};








