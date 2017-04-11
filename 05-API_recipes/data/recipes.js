const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require('node-uuid');




let exportedMethods = {



    getAllRecipes() {
        return recipes().then((recipesCollection) => {
            return recipesCollection
                .find({}, { title: 1 })
                .toArray();
        });
    },


    getRecipeById(id) {
        if (!id) {
            return Promise.reject("You must provide an id");
        }
        return recipes().then((recipesCollection) => {
            return recipesCollection
                .findOne({ _id: id })
                .then((recipe) => {
                    if (!recipe)
                        throw "recipe not found";
                    return recipe;
                });
        });
    },


    addRecipe(title, ingredients = [], steps) {

        if (!title) {
            return Promise.reject("You must provide a title");
        }

        if (!ingredients) {
            return Promise.reject("You must provide ingredients");
        }
        if (!steps) {
            return Promise.reject("You must provide steps");
        }

        return recipes().then((insertRecipe) => {

            let newRecipe = {
                _id: uuid.v4(),
                title: title,
                ingredients: ingredients,
                steps: steps,
                comments: [],

            };
            return insertRecipe
                .insertOne(newRecipe)
                .then((newInsertInformation) => {
                    if (newInsertInformation == null) {
                        return Promise.reject("not able to add a Recipe!");
                    }
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getRecipeById(newId);
                });
        });

    },

    removeRecipe(id) {
        if (!id) {
            return Promise.reject("You must provide an id");
        }
        return recipes().then((recipesCollection) => {
            return recipesCollection
                .removeOne({ _id: id })
                .then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        throw (`Could not delete recipe `);
                    } else { }
                });
        });
    },

    updateRecipe(id, updatedRecipe) {
        if (!id) {
            return Promise.reject("You must provide an id");
        }
        if (!updatedRecipe) {
            return Promise.reject("You must provide an update");
        }
        return recipes().then((recipesCollection) => {
            let updatedRecipeData = {};

            if (updatedRecipe.steps) {
                updatedRecipeData.steps = updatedRecipe.steps;
            }

            if (updatedRecipe.title) {
                updatedRecipeData.title = updatedRecipe.title;
            }

            if (updatedRecipe.ingredients) {
                updatedRecipeData.ingredients = updatedRecipe.ingredients;
            }
            if (updatedRecipe.comments) {
                updatedRecipeData.comments = updatedRecipe.comments;
            }

            let updateCommand = {
                $set: updatedRecipeData
            };

            return recipesCollection.updateOne({
                _id: id
            }, updateCommand).then((result) => {
                return this.getRecipeById(id);
            });
        });
    },



}

module.exports = exportedMethods;