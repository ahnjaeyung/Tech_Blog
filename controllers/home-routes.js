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

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: { model: User }
    })
    if (!postData) {
      res.status(404).json({ message: 'No post found!'})
      return;
    }
    const post = postData.get({ plain: true })
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

// router.get('/signup', async (req, res) => {
//   try {
//     // const dbGalleryData = await Gallery.findAll({
//     //   include: [
//     //     {
//     //       model: Painting,
//     //       attributes: ['filename', 'description'],
//     //     },
//     //   ],
//     // });

//     // const galleries = dbGalleryData.map((gallery) =>
//     //   gallery.get({ plain: true })
//     // );
//     res.render('signup', {
//       //   galleries,
//       //   loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// GET one gallery
// router.get('/gallery/:id', async (req, res) => {
//   try {
//     const dbGalleryData = await Gallery.findByPk(req.params.id, {
//       include: [
//         {
//           model: Painting,
//           attributes: [
//             'id',
//             'title',
//             'artist',
//             'exhibition_date',
//             'filename',
//             'description',
//           ],
//         },
//       ],
//     });

//     const gallery = dbGalleryData.get({ plain: true });
//     res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// GET one painting
// router.get('/painting/:id', async (req, res) => {
//   try {
//     const dbPaintingData = await Painting.findByPk(req.params.id);

//     const painting = dbPaintingData.get({ plain: true });
//     res.render('painting', { painting, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Login route
// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//   res.render('login');
// });

module.exports = router;