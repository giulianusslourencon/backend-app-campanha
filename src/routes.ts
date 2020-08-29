import express from 'express'
const routes = express.Router()

import authenticationRoutes from './routes/authenticationRoutes'
import memberRoutes from './routes/memberRoutes'
import memberPasswordRoutes from './routes/memberPasswordRoutes'
import tokenRoutes from './routes/tokenRoutes'
import teamRoutes from './routes/teamRoutes'
import corongaRoutes from './routes/corongaRoutes'

routes.use('/', authenticationRoutes)
routes.use('/members', memberRoutes)
routes.use('/members/:id/password', memberPasswordRoutes)
routes.use('/token', tokenRoutes)

routes.use('/teams', teamRoutes)

routes.use('/applyCorongaTo', corongaRoutes)

export default routes
