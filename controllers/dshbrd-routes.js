const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');


// get admin handlebars
router.get('/', withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });

        const posts = allPosts.map((post) => post.get({ plain: true }));

        res.render('adminposts', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

// pull handlebars for new posts and the dashboard layout
router.get('/new', withAuth, (req, res) => {
    res.render('newpost', {
        layout: 'dashboard',
    });
});

// get edit post handlebars
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findByPk(req.params.id);

        if (allPosts) {
            const post = allPosts.get({ plain: true });

            res.render('editpost', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;