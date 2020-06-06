const routes = require('express').Router()

routes.get('/', (req, res) => {
  res.json({ hello: 'world' })
})

routes.use('/', require('./routes/authenticationRoutes'))
routes.use('/members', require('./routes/memberRoutes'))
routes.use('/members/:id/password', require('./routes/memberPasswordRoutes'))
routes.use('/teams', require('./routes/teamRoutes'))

routes.use('/applyCorongaTo', require('./routes/corongaRoutes'))

module.exports = routes
