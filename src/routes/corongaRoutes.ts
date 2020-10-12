import express from 'express'

import * as CorongaController from '../controllers/corongaController'
import * as permissions from '../utils/permissions'

const routes = express.Router()

routes.use(permissions.verifyRoutePermission(permissions.PERMISSION.MASTER))

routes.delete('/teams', CorongaController.teams)
routes.delete('/members', CorongaController.members)

export default routes
