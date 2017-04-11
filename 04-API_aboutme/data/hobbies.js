const mongoCollections = require("../config/mongoCollections");
const hobbies = mongoCollections.hobbies;
const uuid = require('node-uuid');
let exportedMethods = {
    getAllHobbies() {
        return hobbies().then((hobbyCollection) => {
            return hobbyCollection.find({}, { _id: 0, hobbyName: 1 }).toArray();
        })
    },

    getHobby(hobby) {
        if (!hobby) {
            return Promise.reject("You must provide hobby");
        }
        return hobbies().then((hobbiesCollection) => {
            return hobbiesCollection.findOne({ hobbyName: hobby }, { _id: 0, information: 1 }).then((data) => {
                if (!data) return Promise.reject("Hobby not found");

                return data;
            });
        });
    },
    getHobbyById(id) {
        if (!id) {
            return Promise.reject("You must provide an id to search for");
        }
        return hobbies().then((hobbyCollection) => {
            return hobbyCollection.findOne({ _id: id });
        });
    },


    addHobbies(hobbyName, information) {
        if (!hobbyName) {
            return Promise.reject("You must provide a hobby name");
        }
        if (!information) {
            return Promise.reject("You must provide an id to search for");
        }
        return hobbies().then((hobbiesCollection) => {
            let newHobby = {
                _id: uuid.v4(),
                hobbyName: hobbyName,
                information: information
            };

            return hobbiesCollection
                .insertOne(newHobby)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getHobbyById(newId);
                });
        });

    },

}

module.exports = exportedMethods;