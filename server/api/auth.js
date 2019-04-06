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
    let currentscore = 0;
    // eslint-disable-next-line no-underscore-dangle
    const { _doc } = req.user;
    if (_doc) currentscore = _doc.score;
    const { token, name } = req.user;
    res.redirect(`${clientUrl}?token=${token}&name=${name}&score=${currentscore}`);
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(clientUrl);
});

export default router;
