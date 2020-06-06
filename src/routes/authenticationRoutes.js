const routes = require('express').Router()
const { celebrate, Segments, Joi } = require('celebrate')

const AuthenticationController = require('../controllers/authenticationController')

// LOGIN ROUTE
routes.post('/login', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
}), AuthenticationController.login)

module.exports = routes
