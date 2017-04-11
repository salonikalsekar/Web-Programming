const express = require('express');
const router = express.Router();
const data = require("../data");
const classesData = data.classes;

router.get("/:id", (req, res) => {
    classesData.getCourse(req.query.courseCode).then((classes) => {
        res.status(200).json(classes);
    }).catch((error) => {
        res.status(404).json({ message: "Class not found" });
    });
});

router.get("/", (req, res) => {
    let courseData = classesData.getAllClasses().then((classes) => {
        res.status(200).json(classes);
    }); () => {
        res.status(500).send();
    };
});

router.post("/", (req, res) => {
    res.status(500).send();
});

module.exports = router;