const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    const allPostsData = await Post.findAll();
    const posts = allPostsData.map((post) =>
      post.get({ plain: true })
    );
    res.status(200).render('all-posts-admin', {
      posts,
      layout: 'dashboard',
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, async (req,res) => {
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

// router.get('/signup', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//   res.render('signup', {loggedIn: req.session.loggedIn});
// });

// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//   res.render('login', {loggedIn: req.session.loggedIn});
// });

module.exports = router;
