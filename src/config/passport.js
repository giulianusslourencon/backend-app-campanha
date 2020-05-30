const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Member = require('../database/models/member');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    Member.authenticate()
));

passport.serializeUser(Member.serializeUser());
passport.deserializeUser(Member.deserializeUser());

module.exports = passport;