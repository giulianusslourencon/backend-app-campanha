import passport from 'passport'
import { RequestHandler } from 'express'

export const login: RequestHandler = async (req, res, next) => {
  try {
    passport.authenticate('local', {
      session: false
    }, (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(400).json({ err: info.message })
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr)
        }
        return res.redirect('/members/' + user.id)
      })
    })(req, res, next)
  } catch (error) {
    return res.status(400).json({ error })
  }
}
