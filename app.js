import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';

import oauthRoutes from './routes/oauthRoutes';
import profileRoutes from './routes/profileRoutes';
import keys from './config/keys';
import passPortSetup from './config/passportSetup';

const { mongodbUrl, cookieKey } = keys;
const app = express();
mongoose.Promise = global.Promise;
const port = 3000;

// setting up views and static folder
app.set('view engine', 'ejs');
app.use(express.static('views'));

// setting up usage of a cookie
app.use(
  cookieSession({
    maxAge: 99999999,
    keys: [cookieKey]
  })
);

//initializing passportjs for using session
app.use(passport.initialize());
app.use(passport.session());

//connecting to db
mongoose.connect(mongodbUrl, () => {
  console.log('mongodb connected');
});

//setting up routes from other modules
app.use('/auth', oauthRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
