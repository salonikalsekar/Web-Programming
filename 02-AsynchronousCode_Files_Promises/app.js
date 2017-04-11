


const fileData1 = require("./fileData.js");
const metrics = require("./textMetrics.js");

//this is the first section of the lab (FileData)

fileData1.getFileAsString("chapter1.txt").then(function (fromFulfill) {
    console.log("-----------------------------------------------");
    console.log(fromFulfill);
    console.log("-----------------------------------------------");
}).catch(function (fromReject) {
    console.log(fromReject);
})


setTimeout(function () {
    fileData1.getFileAsJSON("test.json").then(function (fromFulfill) {
        console.log("-----------------------------------------------");
        console.log(fromFulfill);
        console.log("-----------------------------------------------");
    }).catch(function (fromReject) {
        console.log(fromReject);
    })
}, 250);

setTimeout(function () {
    fileData1.saveStringToFile("writeFile.txt", "hi how are you?").then(function (fromFulfill) {
        console.log("-----------------------------------------------");
        console.log(`the output for saveStringToFile is ${fromFulfill}`);
        console.log("-----------------------------------------------");
    }).catch(function (fromReject) {
        console.log(fromReject);
    })
}, 500);


setTimeout(function () {
    const fs = require('fs');
    fs.readFile("test.json", "utf-8", (err, data) => {
        var asObject = JSON.parse(data);
        obj = asObject[1];
        fileData1.saveJSONToFile("writejsonfile.json", obj).then(function (fromFulfill) {
            console.log("-----------------------------------------------");
            console.log(`the output for saveStringToJson is ${fromFulfill}`);
            console.log("-----------------------------------------------");
        }).catch(function (fromReject) {
            console.log(fromReject);
        })
    })
}, 750);
//this is the second section of the lab (createMetrics)
setTimeout(function () {
    let mycurrentObj = metrics.createMetrics("hello my friends i hope you are having a good day.");
    console.log("---------------------------------------------");
    console.log(mycurrentObj);
    console.log("-----------------------------------------------");


}, 1000);


//this is the third part which reads and displays the three text files in console.
function read(file) {
    const fs = require('fs');
    return new Promise(function (fulfill, reject) {

        fs.readFile(file, "utf-8", (err, data) => {
            if (!err)
                fulfill(data);
            else
                reject(err);

        });


    });
}


setTimeout(function () {
    read("chapter1.txt").then(function (fromFulfill) {
        console.log("-----------------------------------------------");
        console.log(fromFulfill);
        console.log("-----------------------------------------------");
    }).catch(function (fromReject) {
        console.log(`the error is :${fromReject}`);
    })
}, 1500);
setTimeout(function () {
    read("chapter2.txt").then(function (fromFulfill) {
        console.log("-----------------------------------------------");
        console.log(fromFulfill);
        console.log("-----------------------------------------------");
    }).catch(function (fromReject) {
        console.log(`the error is :${fromReject}`);
    })
}, 1750)

setTimeout(function () {

    read("chapter3.txt").then(function (fromFulfill) {
        console.log("-----------------------------------------------");
        console.log(fromFulfill);
        console.log("-----------------------------------------------");
    }).catch(function (fromReject) {
        console.log(`the error is :${fromReject}`);
    })
}, 2000)
