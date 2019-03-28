import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import config from './config';

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
      const userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken,
      };
      done(null, userData);
    },
  ),
);
