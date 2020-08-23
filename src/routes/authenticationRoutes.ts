import express from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import AuthenticationController from '../controllers/memberController/authenticationController'

const routes = express.Router()

// LOGIN ROUTE
routes.post('/login', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
}), AuthenticationController.login)

export default routes
