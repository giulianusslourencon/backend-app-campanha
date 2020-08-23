import passport from 'passport'
import passportLocal from 'passport-local'
import Member from '../database/models/member'

const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email'
},
Member.authenticate()
))

passport.serializeUser(Member.serializeUser())
passport.deserializeUser(Member.deserializeUser())

export default passport
