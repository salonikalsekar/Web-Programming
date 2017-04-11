const express = require('express');
const router = express.Router();
const data = require("../data");
const locationData = data.locations;
const eventData = data.events;


router.get("/:id", (req, res) => {
    // Find a location by the provided id, 

    let numb = Number(req.params.id);
    // then display its information

    var locInfo = [];
    var newList = [];
    locationData.getLocation(numb).then((data) => {
        locInfo = data;

        let locatn = eventData.getAllEvents();

        locatn.then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].location === numb)
                    newList.push(data[i]);
            }
            return newList;
        })
            .then((data) => {
                locInfo["eventDetails"] = newList;
            });

        res.render('location/locationlist', { locations: locInfo });
    }).catch(() => {

        res.status(404).json({ error: "Location not found" })
    });

});

// Location Index Page


router.get("/", (req, res) => {
   
    locationData.getAllLocations().then((allData) => {
        res.render('location/all', { locations: allData });
    }).catch((error) => {
        res.status(500).json({ error: error });
    });



});

module.exports = router;