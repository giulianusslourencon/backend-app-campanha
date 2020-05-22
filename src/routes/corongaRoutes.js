const routes = require("express").Router();
const CorongaController = require('../controllers/corongaController');

// DESTROY TEAMS
routes.delete('/teams', CorongaController.teams);

// DESTROY MEMBERS
routes.delete('/members', CorongaController.members);

module.exports = routes;