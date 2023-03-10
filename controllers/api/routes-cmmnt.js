const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

// create a comment
router.post("/", withAuth, async (req, res) => {
  try {
    const routeNewComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });

    res.json(routeNewComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
