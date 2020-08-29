import express from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import * as MemberPasswordController from '../controllers/memberController/memberPasswordController'

const routes = express.Router({ mergeParams: true })

// RESET PASSWORD ROUTE
routes.put('/:token', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
    token: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required()
  })
}), MemberPasswordController.storePassword)

// CHANGE PASSWORD ROUTE
routes.put('/', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  })
}), MemberPasswordController.changePassword)

export default routes
