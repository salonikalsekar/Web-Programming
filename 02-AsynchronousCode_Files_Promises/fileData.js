
let xyz = exports = module.exports;
const fs = require('fs');


xyz.getFileAsString = function (path) {
    return new Promise(function (fulfill, reject) {


        fs.readFile(path, "utf-8", (err, data) => {
            if (!err)
                fulfill(data);
            else
                reject(err);


        })
    })
};

xyz.getFileAsJSON = function (path) {
    return new Promise(function (fulfill, reject) {


        fs.readFile(path, "utf-8", (err, data) => {
            var asObject = JSON.parse(data);
            if (!err)
                fulfill(asObject);
            else
                reject(err);


        })
    })
};


xyz.saveStringToFile = function (path, text) {
    return new Promise(function (fulfill, reject) {


        fs.writeFile(path, text, "utf-8", (err, data) => {

            if (!err)
                fulfill('true');
            else
                reject(err);


        })
    })
};



xyz.saveJSONToFile = function (path, obj) {
    return new Promise(function (fulfill, reject) {
        fs.writeFile(path, JSON.stringify(obj), "utf-8", (err, data) => {

            if (!err)
                fulfill('true');
            else
                reject(err);


        })
    })
};