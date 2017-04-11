const recipesRoutes = require("./recipes");
const commentsRoutes = require("./comments");

const constructorMethod = (app) => {
    app.use("/recipes", recipesRoutes);
    app.use("/comments", commentsRoutes);


    app.use("*", (req, res) => {
        res.sendStatus(404).json({ error: "Not found" });
    })
};

module.exports = constructorMethod;