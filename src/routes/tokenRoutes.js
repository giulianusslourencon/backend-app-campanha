const routes = require('express').Router()
const { celebrate, Segments, Joi } = require('celebrate')

const ResetPasswordController = require('../controllers/memberController/resetPasswordController')

// GENERATE TOKEN ROUTE
routes.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required()
  })
}), ResetPasswordController.generateToken)

module.exports = routes
