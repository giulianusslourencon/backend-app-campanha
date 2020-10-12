import express from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import * as permissions from '../utils/permissions'
import * as MemberPasswordController from '../controllers/memberController/memberPasswordController'

const routes = express.Router({ mergeParams: true })

routes.put('/:token', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
    token: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required()
  })
}), MemberPasswordController.storePassword)

routes.put('/', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  })
}), permissions.decodeUser, permissions.verifySelfRoute,
  MemberPasswordController.changePassword)

export default routes
