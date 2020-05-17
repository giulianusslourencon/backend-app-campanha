var express = require("express");
const CorongaController = require('../controllers/corongaController');

var routes = express.Router();

// DESTROY TEAMS
routes.delete('/teams', CorongaController.teams);

// DESTROY MEMBERS
routes.delete('/members', CorongaController.members);

module.exports = routes;