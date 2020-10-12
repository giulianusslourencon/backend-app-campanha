import express from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import * as permissions from '../utils/permissions'
import * as TeamController from '../controllers/teamController'

const routes = express.Router()

routes.get('/', TeamController.index)

routes.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    shortName: Joi.string().optional().default(''),
    description: Joi.string().optional().default(''),
    score: Joi.number().required()
  })
}), permissions.verifyRoutePermission(permissions.PERMISSION.COORD),
  TeamController.create)

routes.put('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    shortName: Joi.string().optional().default(''),
    description: Joi.string().optional().default(''),
    score: Joi.number().required()
  })
}), permissions.verifyRoutePermission(permissions.PERMISSION.COORD),
  TeamController.update)

routes.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), permissions.verifyRoutePermission(permissions.PERMISSION.COORD),
  TeamController.destroy)

export default routes
