const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        res.status(200).json(dbUserData);

        // req.session.save(() => {
        //     req.session.loggedIn = true;

        //     res.status(200).json(dbUserData);
        // });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }
        res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' })
        // req.session.save(() => {
        //     req.session.loggedIn = true;
        //     console.log(
        //         '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        //         req.session.cookie
        //     );

        //     res
        //         .status(200)
        //         .json({ user: dbUserData, message: 'You are now logged in!' });
        // });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
