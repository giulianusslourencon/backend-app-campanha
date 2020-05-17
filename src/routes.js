const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.json({ hello: "world" });
})

routes.use('/members', require('./routes/memberRoutes'));
routes.use('/teams', require('./routes/teamRoutes'));

routes.use('/applyCorongaTo', require('./routes/corongaRoutes'));

module.exports = routes;