const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
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
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const validPassword = user.checkPassword(req.body.password);
  
      if (!validPassword) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
  
      req.session.routeNewUser = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
  
      res.json({ user, message: 'You are now logged in!' });
    } catch (err) {
      res.status(400).json({ message: 'Error logging in, please try again' });
    }
});

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
