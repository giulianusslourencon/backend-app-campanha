import express from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import multer from 'multer'
import multerConfig from '../config/multer'

import * as permissions from '../utils/permissions'
import * as MemberController from '../controllers/memberController'

const routes = express.Router()

routes.get('/', MemberController.index)

routes.post('/', multer(multerConfig).single('image'), celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    realName: Joi.string().optional().default(''),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    wpp: Joi.string().required().min(10).max(11),
    team: Joi.string().required(),
    image: Joi.any().meta({ swaggerType: 'file' }).optional().allow('').default(''),
    course: Joi.string().required(),
    hasCar: Joi.number().optional(),
    role: Joi.number().optional().default(0)
  })
}), permissions.verifyRoutePermission(permissions.PERMISSION.COORD),
  MemberController.create)

routes.get('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), MemberController.show)

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
    role: Joi.number().optional().default(0)
  })
}), permissions.verifySelfRoute, MemberController.update)

routes.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), permissions.verifyRoutePermission(permissions.PERMISSION.COORD),
  MemberController.destroy)

export default routes
