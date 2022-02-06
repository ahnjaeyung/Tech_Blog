const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//show all posts
router.get('/', withAuth, async (req, res) => {
  try {
    const allPostsData = await Post.findAll();
    const posts = allPostsData.map((post) =>
      post.get({ plain: true })
    );
    res.status(200).render('all-posts', {
      posts,
      layout: 'dashboard',
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//new post
router.get('/new', withAuth, async (req, res) => {
    try {
        res.status(200).render('new-post', {
            layout: 'dashboard',
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//edit post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: 'No post found!'})
            return;
        }
        const post = postData.get({ plain: true })
        res.render('edit-post', {
            post,
            layout: 'dashboard',
            loggedIn: req.session.loggedIn,
            userSession: req.session.username
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/post/:id', withAuth, async (req, res) => {
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
