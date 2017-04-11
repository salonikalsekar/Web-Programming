const mongoCollections = require("../config/mongoCollections");
const classes = mongoCollections.classes;
const uuid = require('node-uuid');
let exportedMethods = {


    getAllClasses() {
        return classes().then((classesCollection) => {
            return classesCollection.find({}, { _id: 0, courseCode: 1 }).toArray();
        });
    },



    getCourse(code) {
        if (!code) {
            return Promise.reject("You must provide the course code to search for");
        }

        return classes().then((classesCollection) => {
            return classesCollection.findOne({ courseCode: code }, { _id: 0, name: 1, professor: 1, description: 1 }).then((classes) => {
                if (!classes)
                    return Promise.reject("Class not found")
                return classes;
            });
        });
    },


    getClassById(id) {
        if (!id) {
            return Promise.reject("You must provide an id to search for");
        }
        return classes().then((classesCollection) => {
            return classesCollection.findOne({ _id: id });
        });
    },

    addClass(courseCode, name, professor, description) {
        if (!courseCode) {
            return Promise.reject("You must provide a course code");
        }
        if (!name) {
            return Promise.reject("You must provide an name");
        }
        if (!professor) {
            return Promise.reject("You must provide an professor");
        }
        if (!description) {
            return Promise.reject("You must provide an description");
        }
        return classes().then((classesCollection) => {
            let newClass = {
                _id: uuid.v4(),
                courseCode: courseCode,
                name: name,
                professor: professor,
                description: description

            };

            return classesCollection
                .insertOne(newClass)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newCourseId) => {
                    return this.getClassById(newCourseId);
                });
        });

    },

}

module.exports = exportedMethods;