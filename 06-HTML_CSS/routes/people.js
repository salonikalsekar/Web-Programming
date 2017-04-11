const express = require('express');
const router = express.Router();
const data = require("../data");
const peopleData = require("../data/people");
const eventData = require("../data/events");
// Single Person Page

router.get("/:id", (req, res) => {
    peopleData.getPerson(Number(req.params.id))
    .then(person => {
        return person;
    }).then((data)=>{
        return eventData.getEventsForAttendee(person.id).then(eventList => {
	    	        return [person,eventList];
                });
    }).then(list=>{
            res.render('people/peoplelist', {person: list[0], eventList: list[1]});
    }).catch((error)=>{
     res.status(500).json({ error: error });
    });

});

// People Index Page
router.get("/", (req, res) => {
   

    peopleData.getAllPeople().then((data) => {
        res.render("people/all", { people: data });
    }).catch((error) => {
        res.status(500).json({ error: error });
    });

    //  res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;