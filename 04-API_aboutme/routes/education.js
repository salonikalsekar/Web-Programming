const express = require('express');
const router = express.Router();
const data = require("../data");
const educationData = data.education;

router.get("/:educationType", (req, res) => {
    educationData.getSchool(req.params.educationType).then((allEducation) => {
        res.status(200).json(allEducation);
    }, (error) => {
        res.status(404).json({ message: "not found!" });
    });
});

router.get("/", (req, res) => {
    educationData.getAllEducation().then((educationList) => {
        res.status(200).json(educationList);

    }, () => {
        res.status(500).send();
    });
});

router.post("/", (req, res) => {
    res.status(500).send();
});

module.exports = router;