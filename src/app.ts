import express from 'express' // Server structure
import cors from 'cors' // Enable connection to front-end
import { errors } from 'celebrate' // Validation

import routes from './routes' // Backend routes
require('./database/connection') // Database connection

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)
app.use(errors)

export default app
