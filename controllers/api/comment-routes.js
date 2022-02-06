const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
    console.log("\n--------------------" + req.session.userId + "--------------------\n")
    try {
        const commentData = await Comment.create({
            body: req.body.body,
            userId: req.session.userId,
            postId: req.body.postId
        })
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: { id: req.params.id }
        });
        console.log(postData)
        if (postData) {
            res.status(200)
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;