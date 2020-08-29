import express from 'express'

import * as CorongaController from '../controllers/corongaController'

const routes = express.Router()

// DESTROY TEAMS
routes.delete('/teams', CorongaController.teams)

// DESTROY MEMBERS
routes.delete('/members', CorongaController.members)

export default routes
