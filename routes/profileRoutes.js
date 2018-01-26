import express from 'express';

const router = express.Router();

const checkAuth = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  }
  next();
};

router.get('/', checkAuth, (req, res) => {
  res.render('profile', { user: req.user });
});

export default router;
