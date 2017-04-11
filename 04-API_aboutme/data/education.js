const mongoCollections = require("../config/mongoCollections");
const education = mongoCollections.education;
const uuid = require('node-uuid');
let exportedMethods = {


    getAllEducation() {
        return education().then((educationCollection) => {
            return educationCollection.find({}, { _id: 0, institute_name: 1 }).toArray();
        })
    },

    getSchool(educationType) {
        if (!educationType) {
            return Promise.reject("You must provide an education type.");
        }
        if (educationType == "highschool") {
            return education().then((educationCollection) => {
                return educationCollection.findOne({ education_type: educationType }, { _id: 0, institute_name: 1 }).then((education) => {
                    if (!education)
                        Promise.reject("not found");
                    return education;

                });
            });
        }

        else if (educationType == "undergrad") {
            return education().then((educationCollection) => {
                return educationCollection.findOne({ education_type: educationType }, { _id: 0, institute_name: 1, degree: 1 }).then((education) => {
                    if (!education)
                        return Promise.reject("not found");
                    return education;

                });
            });
        }

    },

    getEducationById(id) {
        if (!id) {
            return Promise.reject("You must provide an id to search for");
        }
        return education().then((educationCollection) => {
            return educationCollection.findOne({ _id: id });
        });
    },



    addEducation(education_type, institute_name, degree) {
        if (!education_type) {
            return Promise.reject("You must provide a education type");
        }
        if (!institute_name) {
            return Promise.reject("You must provide an institute name.");
        }
        if (!degree) {
            return Promise.reject("You must provide a degree.");
        }
        return education().then((educationCollection) => {
            let newEducation = {
                _id: uuid.v4(),
                education_type: education_type,
                institute_name: institute_name,
                degree: degree
            };

            return educationCollection
                .insertOne(newEducation)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newEduc) => {
                    return this.getEducationById(newEduc);
                });
        });

    },

}

module.exports = exportedMethods;