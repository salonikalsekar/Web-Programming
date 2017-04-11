const express = require('express');
const router = express.Router();
const data = require("../data");
const commentData = data.comments;
const recipeData = data.recipes;


router.get("/recipe/:id", (req, res) => {
    commentData.getAllCommentsUsingRecipeId(req.params.id).then((data) => {
        res.status(200).json({ data });
    }).catch(() => {
        res.status(404).json({ error: "Comment not found" });
    });
});


router.get("/:recipeId", (req, res) => {
    commentData.getAllCommentsUsingCommentId(req.params.recipeId).then((data) => {
        res.status(200).json({ data });
    }).catch(() => {
        res.status(404).json({ error: "Comment not found" });
    });
});



router.post("/:commentId", (req, res) => {
    let commentBlogData = req.body;
    let getData = recipeData.getRecipeById(req.params.commentId);

    getData.then(() => {
        commentData.addComment(req.params.commentId, commentBlogData.poster, commentBlogData.comment)
            .then((newData) => {
                res.status(200).json({ newData });
            }).catch((e) => {
                res.status(500).json({ error: "Could not add comment" });
            });
    })

});

router.delete("/:id", (req, res) => {

    return commentData.removeComment(req.params.id)
        .then(() => {
            res.status(200).json("Deleted");
        }).catch((e) => {
            res.status(500).json({ error: "Could not delete" });
        });
});

router.put("/:rid/:cid", (req, res) => {
    let updatedComment = req.body;

    return commentData.updateComment(req.params.rid, req.params.cid, updatedComment)
        .then((taskData) => {
            res.json(taskData);
        }, () => {
            res.sendStatus(500);
        });
});


module.exports = router;