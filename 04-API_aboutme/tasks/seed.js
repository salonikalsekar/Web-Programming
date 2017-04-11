const dbConnection = require("../config/mongoConnections.js");
const data = require("../data/");
const education = data.education;
const hobbies = data.hobbies;
const classes=data.classes;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;

    }).then((eduData) => {
        return education.addEducation("highschool", "Sathaye college", "school level")
    }).then(() => {
        return education.addEducation("undergrad", "Xavier Institute of Engineering", "bachelors");
    })
        .then(() => {
            return education.addEducation("graduation", "Stevens Institute of Technology", "masters");
        }).then(() => {
            return hobbies.addHobbies("swimming", "good for fitness!");
        }).then(() => {
            return hobbies.addHobbies("reading", "helps in gaining knowledge!");
        }).then(() => {
            return classes.addClass("CS-564","Web Programming","Phil Baressi","It is a web campus course");
        }).then(() => {
            return classes.addClass("CS-561","DBMS-1","Samuel Kim","It is an on-campus course");
        }).then(() => {
            return classes.addClass("CS-562","DBMS-2","Samuel Kim","It is an advanced course as compared to DBMS-1");
        }).then(() => {
            return classes.addClass("MIS-637","Knowledge Discovery Databases","M. Daneshmand","It is an on-campus elective");
        })
        .then(() => {
            return classes.addClass("CS-518","KDDM","Dehnaad","It clears all the basics");
        })
        .then(() => {
            console.log("Done seeding database");
            db.close();
        })
}, (error) => {
    console.error(error);
});