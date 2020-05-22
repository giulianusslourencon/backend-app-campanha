const routes = require("express").Router();
const { celebrate, Segments, Joi } = require('celebrate');

const TeamController = require('../controllers/teamController');

// INDEX ROUTE
routes.get('/', TeamController.index);

// CREATE ROUTE
routes.post('/', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        shortName: Joi.string().optional().default(''),
        description: Joi.string().optional().default(''),
        score: Joi.number().required()
    })
}), TeamController.create);

// UPDATE ROUTE
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
}), TeamController.update);

// DESTROY ROUTE
routes.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
    })
}), TeamController.destroy);

module.exports = routes;