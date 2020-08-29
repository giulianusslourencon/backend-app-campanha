import express from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import * as ResetPasswordController from '../controllers/memberController/resetPasswordController'

const routes = express.Router()

// GENERATE TOKEN ROUTE
routes.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required()
  })
}), ResetPasswordController.generateToken)

export default routes
