const express = require('express');
const router = express.Router();
const data = require("../data");
const textmanipulation = data.textmanipulation;

router.get("/clientform", (req, res) => {
	
    res.render("textmanipulation/static", {});
});

router.get("/serverform", (req, res) => {
    res.render("textmanipulation/server", {});
});

router.post("/serverform", (req, res) => {
   
	let inputtext = req.body.text1;
	let inputString = req.body.string1;
	let number1 = parseInt(req.body.numb1);
	let number2 = parseInt(req.body.numb2);
	let result;
    try {
		
        result = textmanipulation.datamanipulation(inputtext,inputtext,number1,number2);     
     
    } catch (e) {
        res.render("textmanipulation/server", { inputtext: inputtext, inputString: inputString, number1: number1, number2: number2,error: e });
        return;
    }

    res.render("textmanipulation/server", { inputtext: inputtext, inputString: inputString, number1: number1, number2: number2, result: result });
});

module.exports = router;