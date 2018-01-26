import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import mongoose from 'mongoose';

import keys from './keys';
import User from '../models/user-model';

const { clientID, clientSecret } = keys.googleOauth;

passport.serializeUser = (user, done) => {
  done(null, user.id);
};

passport.deserializeUser = async (id, done) => {
  const user = await User.findbyId(id);
  done(null, user);
};

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/auth/google/redirect'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ id: profile.id });
      if (existingUser) {
        done(null, existingUser);
      }

      const newUser = await new User({
        username: profile.displayName,
        id: profile.id
      });
      done(null, newUser);
    }
  )
);
