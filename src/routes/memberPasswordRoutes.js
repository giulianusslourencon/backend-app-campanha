const routes = require("express").Router({ mergeParams: true });
const { celebrate, Segments, Joi } = require('celebrate');

const MemberPasswordController = require('../controllers/memberPasswordController');

// RESET PASSWORD ROUTE
routes.put('/reset', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        password: Joi.string().required()
    })
}), MemberPasswordController.resetPassword);

// CHANGE PASSWORD ROUTE
routes.put('/change', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().required()
    })
}), MemberPasswordController.changePassword);

module.exports = routes;