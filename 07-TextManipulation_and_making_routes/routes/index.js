const textmanipulation = require("./textmanipulation");

const constructorMethod = (app) => {
    
	app.use("/textmanipulation", textmanipulation);

    app.use("*", (req, res) => {
        res.redirect("/manipulation/clientform");
    })
};

module.exports = constructorMethod;