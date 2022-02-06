const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const allPostsData = await Post.findAll({
      include: { model: User }
    });
    const posts = allPostsData.map((post) =>
      post.get({ plain: true })
    );
    res.status(200).render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      userSession: req.session.username
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Comment, 
        include: { model: User }}]
    })
    if (!postData) {
      res.status(404).json({ message: 'No post found!'})
      return;
    }
    const post = postData.get({ plain: true })
    console.log('\n---------THIS IS POST JOINED WITH USER AND COMMENTS' + JSON.stringify(post) + '----------\n');
    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn,
      userSession: req.session.username
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup', {loggedIn: req.session.loggedIn});
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login', {loggedIn: req.session.loggedIn});
});

module.exports = router;