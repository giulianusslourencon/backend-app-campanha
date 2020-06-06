const routes = require('express').Router()
const { celebrate, Segments, Joi } = require('celebrate')
const multer = require('multer')
const multerConfig = require('../config/multer')

const MemberController = require('../controllers/memberController')

// INDEX ROUTE
routes.get('/', MemberController.index)

// CREATE ROUTE
routes.post('/', multer(multerConfig).single('image'), celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    realName: Joi.string().optional().default(''),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    wpp: Joi.string().required().min(10).max(11),
    team: Joi.string().required(),
    image: Joi.any().meta({ swaggerType: 'file' }).optional().allow(''),
    course: Joi.string().required(),
    hasCar: Joi.number().optional(),
    coord: Joi.boolean().optional()
  })
}), MemberController.create)

// SHOW ROUTE
routes.get('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), MemberController.show)

// UPDATE ROUTE
routes.put('/:id', multer(multerConfig).single('image'), celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    realName: Joi.string().optional().default(''),
    email: Joi.string().required().email(),
    wpp: Joi.string().required().min(10).max(11),
    team: Joi.string().required(),
    image: Joi.any().meta({ swaggerType: 'file' }).optional().allow(''),
    deleteImage: Joi.boolean().optional().default(false),
    course: Joi.string().required(),
    hasCar: Joi.number().optional(),
    coord: Joi.boolean().optional()
  })
}), MemberController.update)

// DESTROY ROUTE
routes.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), MemberController.destroy)

module.exports = routes
