const express = require('express');
const router = express.Router();
const data = require("../data");
const recipesData = data.recipes;

router.get("/:id", (req, res) => {
    recipesData.getRecipeById(req.params.id).then((recipe) => {
        res.status(200).json({recipe});
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});



router.get("/", (req, res) => {
    recipesData.getAllRecipes().then((recipeList) => {
       res.status(200).json({recipeList}); 
    }).catch((e) => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

router.post("/", (req, res) => {
    let blogPostRecipe = req.body;
    recipesData.addRecipe(blogPostRecipe.title, blogPostRecipe.ingredients, blogPostRecipe.steps)
        .then((newRecipe) => {
       res.status(200).json({newRecipe}); 
        }).catch((e) => {
            res.status(500).json({ error: "Cannot create recipe" });
        });
});


router.put("/:id", (req, res) => {
    let updatedData = req.body;

    let getRecipe = recipesData.getRecipeById(req.params.id);

    getRecipe.then(() => {
        return recipesData.updateRecipe(req.params.id, updatedData)
            .then((updatedRecipe) => {
             res.status(200).json({updatedRecipe});
            }).catch((e) => {
                res.status(500).json({ error: "Could not update" });
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    }); 

});

router.delete("/:id", (req, res) => {
    let getRecipe = recipesData.getRecipeById(req.params.id);

    getRecipe.then(() => {
        return recipesData.removeRecipe(req.params.id)
            .then(() => {
                res.status(200).json("Deleted");
            }).catch((e) => {
                res.status(500).json({ error: "Could not delete" });
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

module.exports = router;