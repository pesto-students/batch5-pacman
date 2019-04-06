import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import config from './config';
import User from '../api/user/model';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clienId,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callback,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, { ...currentUser, name: currentUser.username, token: accessToken });
        } else {
          const userData = {
            email: profile.emails[0].value,
            name: profile.displayName,
            token: accessToken,
            score: 0,
            googelId: profile.id,
          };
          new User({
            googleId: userData.googelId,
            username: userData.name,
            email: userData.email,
            score: userData.score,
          }).save().then(() => {
            done(null, userData);
          });
        }
      });
    },
  ),
);
