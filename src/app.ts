import express from 'express' // Server structure
import session from 'express-session' // Required for authentication
import passport from './config/passport' // Authentication framework
import cors from 'cors' // Enable connection to front-end
import { errors } from 'celebrate' // Validation

import routes from './routes' // Backend routes
require('./database/connection') // Database connection

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: process.env.SECRET_KEY as string,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(routes)
app.use(errors)

export default app
