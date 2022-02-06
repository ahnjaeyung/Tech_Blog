const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
    console.log("\n--------------------" + req.body + "--------------------\n")
    try {
        const postData = await Post.create({
            title: req.body.title,
            body: req.body.body,
            userId: req.session.userId,
        })
        res.status(200).json(postData);
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