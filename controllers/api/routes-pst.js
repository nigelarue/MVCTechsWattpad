const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// create a post
router.post("/", withAuth, async (req, res) => {
  try {
    const routeNewPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });

    res.status(200).json(routeNewPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete("user/post/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
