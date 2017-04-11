const express = require('express');
const router = express.Router();
const data = require("../data");
const hobbiesData = data.hobbies;

router.get("/:hobby", (req, res) => {

    hobbiesData.getHobby(req.params.hobby).then((hobbyData) => {
          res.status(200).json(hobbyData);

    }).catch((error) => {
        res.status(404).json({ message: "not found" });
    });
});

router.get("/", (req, res) => {
    hobbiesData.getAllHobbies().then((hobbyList) => {
         res.status(200).json(hobbyList);

    }, () => {
        res.status(500).send();
    });
});

router.post("/", (req, res) => {
    res.status(500).send();
});

module.exports = router;