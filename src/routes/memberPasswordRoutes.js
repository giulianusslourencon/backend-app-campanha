const routes = require('express').Router({ mergeParams: true })
const { celebrate, Segments, Joi } = require('celebrate')

const MemberPasswordController = require('../controllers/memberController/memberPasswordController')

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

module.exports = routes
