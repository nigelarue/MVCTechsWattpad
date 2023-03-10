const router = require("express").Router();
const { User } = require("../../models/");

// create data for new user at signup
router.post("/", async (req, res) => {
  try {
    const routeNewUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = routeNewUser.id;
      req.session.username = routeNewUser.username;
      req.session.loggedIn = true;
      res.json(routeNewUser);

      res.status(200).json(routeNewUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login 
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: "Error logging in, please try again" });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Error logging in, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.routeNewUser = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.status(200).json(user, { message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
