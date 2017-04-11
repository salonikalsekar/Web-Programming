const express = require('express');
const router = express.Router();
const data = require("../data");
const eventData = require("../data/events.js");
const peopleData = require("../data/people.js");
const locationData = require("../data/locations.js");

// Single Event Page
router.get("/:id", (req, res) => {
    // Find a event by the provided id, 
    // then display its information
    // As well as listing the names of all the attendees that will be at this event 
    // Each of these attendee names will need to link to their person page
    // You will also list the location of the event, said location's name, and a link to the location page
    let numb = Number(req.params.id);


    var eventInfo = [];
    var newList = [];
    eventData.getEvent(numb).then((event) => {
        eventInfo = event;

        let anames = peopleData.getAllPeople();

        anames.then((data) => {
            for (let i = 0; i < eventInfo.attendees.length; i++)
                for (let j = 0; j < data.length; j++)
                    if (data[j].id === eventInfo.attendees[i])
                        newList.push(data[j]);
            return newList;
        })
            .then(() => {
                eventInfo["attendeesName"] = newList;
            });


        let loc = locationData.getLocation(event.location);



        loc.then((list) => {
            event["locationData"] = list;
        });
        res.render('events/eventslist', { event: event });

    }).catch(() => {
        res.status(404).json({ error: "event not found" });
    });


});

// Event Index Page
router.get("/", (req, res) => {
 


    eventData.getAllEvents().then((event) => {
        res.render('events/all', { event: event });
    }).catch(() => {
        res.status(404).json({ error: "event not found" });
    });

});

module.exports = router;