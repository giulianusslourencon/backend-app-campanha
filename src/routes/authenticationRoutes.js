const routes = require("express").Router();
const { celebrate, Segments, Joi } = require('celebrate');


const AuthenticationController = require('../controllers/authenticationController');

// LOGIN ROUTE
routes.post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}), AuthenticationController.login);

// CHANGE PASSWORD ROUTE
routes.put('/changePassword/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        password: Joi.string().required()
    })
}), AuthenticationController.changePassword);

module.exports = routes;