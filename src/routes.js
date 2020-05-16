const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({ hello: "world" });
})

routes.use('/members', require('./routes/members'));
routes.use('/teams', require('./routes/teams'));

routes.use('/applyCorongaTo', require('./routes/coronga'));

module.exports = routes;