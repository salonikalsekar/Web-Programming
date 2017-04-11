const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const recipe = require("./recipes");
const uuid = require("node-uuid");

let exportedMethods = {
    getAllCommentsUsingRecipeId(recipeId) {
        return recipes().then((data) => {
            let data1 = data.find({ _id: recipeId }, { 'comments._id': 1, _id: 1, title: 1, 'comments.poster': 1, 'comments.comment': 1 }).toArray();
            return data1;
        });
    },

    getAllCommentsUsingCommentId(id) {
        if (!id) {
            return Promise.reject("You must provide an id");
        }
        return recipes().then((dataR) => {
            let data2 = dataR.find({ 'comments._id': id }, { title: 1, comments: { $elemMatch: { _id: id } } }).toArray();
            return data2;
        });
    },



    getCommentById(id) {
        if (!id) {
            return Promise.reject("You must provide an id");
        }
        return comments().then((commentCollection) => {
            return commentCollection
                .findOne({ _id: id })
                .then((comment) => {
                    if (!comment)
                        throw "Not found";
                    return comment;
                });
        });
    },


    addComment(id, poster, comment) {
        if (!id) {
            return Promise.reject("You must provide an id");
        }
        if (!poster) {
            return Promise.reject("You must provide a poster");
        }
        if (!comment) {
            return Promise.reject("You must provide a comment");
        }
        return recipes().then((commentCollection) => {

            return commentCollection.updateOne({ _id: id }, {
                $addToSet: {
                    comments: {
                         _id :uuid.v4(),
                        poster : poster,
                        comment : comment
                    }
                }
            });

        });

    },



    removeComment(id) {
        if (!id) {
            return Promise.reject("You must provide an id");
        }
        return recipes().then((data) => {

            return data.update({ 'comments._id': id }, { $pull: { 'comments': { '_id': id } } })
                .then(() => {
                    return "Deleted";
                }, (err) => {
                    return Promise.reject("Problem occured while deleting");
                });
        });

    },

   

   updateComment(rid, cid, updatedComment) {

        return recipes().then((info) => {

            if (updatedComment.comment || updatedComment.poster) {
                return info.update({ _id: rid, 'comments._id': cid }, {
                    $set: {
                        'comments.$.poster': updatedComment.poster, 'comments.$.comment': updatedComment.comment
                    }
                }).then(() => {
                    return this.getAllCommentsUsingCommentId(cid);

                });
            }

            else if (updatedComment.comment || updatedComment.poster == undefined) {
                return info.update({ _id: rid, 'comments._id': cid }, {
                    $set: {
                        'comments.$.comment': updatedComment.comment
                    }
                }).then(() => {
                    return this.getAllCommentsUsingCommentId(cid);

                });
            }
            else {
                return info.update({ _id: rid, 'comments._id': cid }, {
                    $set: {
                        'comments.$.poster': updatedComment.poster
                    }
                }).then(() => {
                    return this.getAllCommentsUsingCommentId(cid);

                });
            }
        });
    },
}
module.exports = exportedMethods