const router = require("express").Router();

const userRoutes = require("./routes-usr");
const postRoutes = require("./routes-pst");
const commentRoutes = require("./routes-cmmnt");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;