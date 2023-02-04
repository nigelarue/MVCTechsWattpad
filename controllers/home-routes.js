const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// get all posts for home
router.get("/", async (_req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [User],
    });

    const posts = allPosts.map((post) => post.get({ plain: true }));

    res.render("posts", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one post
router.get("/post/:id", async (req, res) => {
  try {
    const allPosts = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    if (allPosts) {
      const post = allPosts.get({ plain: true });

      res.render("singlepost", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// signup route
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
