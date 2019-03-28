import express from 'express';
import passport from 'passport';
import config from '../config/config';

const router = express.Router();
const clientUrl = config.url.client;

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    const { token, name } = req.user;
    res.redirect(`${clientUrl}?token=${token}&name=${name}`);
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(clientUrl);
});

export default router;
