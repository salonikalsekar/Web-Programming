const express = require('express');
const router = express.Router();
const xss = require('xss');
const data = require('../data/index')

router.post("/", function(request, response) {

	let body = request.body;


	let newNote = data.create(xss(body.title), xss(body.due), xss(body.summary), xss(body.body));

	response.status(200).send(newNote);
});

router.post("/nextNote", (req, res) => {
	let body = req.body;
	let id;


	try {
		if (parseInt(req.body.id) > data.getList()) {
			id = 1;
		} else {
			id = parseInt(req.body.id) + 1;
		}
	} catch (err) {
	
	}
	let note = data.get(id);

	res.status(200).json(note);
})

router.get("/:note", (req, res) => {


	res.render("note", {
		note: data.get(req.params.note)
	});

})

router.get("/", (req, res) => {

	res.render("new", {});

})

module.exports = router;

