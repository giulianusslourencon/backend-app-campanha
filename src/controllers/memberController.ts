import { RequestHandler } from 'express'
import Member from '../database/models/member'

import * as imageController from './services/imageController'

export const index: RequestHandler = async (_req, res) => {
  try {
    const members = await Member.find({}).sort({
      role: -1,
      name: 1
    }).populate('image').exec()
    return res.json({ members })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

export const create: RequestHandler = async (req, res) => {
  try {
    const imageId =
      await imageController.create(req.file as Express.MulterS3.File)

    const newMember = await Member.register({
      name: req.body.name,
      realName: req.body.realName,
      email: req.body.email,
      wpp: req.body.wpp,
      team: req.body.team,
      image: imageId,
      course: req.body.course,
      hasCar: req.body.hasCar,
      role: req.body.role
    }, req.body.password)

    return res.json({ newMember })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

export const show: RequestHandler = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)
      .populate('image').exec()
    return res.json({ member })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

export const update: RequestHandler = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)

    if (!member) throw new Error('Member not found')

    const imageId = await imageController.update(
      member.image,
      req.file as Express.MulterS3.File,
      req.body.deleteImage
    )

    const newMemberInfos = {
      name: req.body.name,
      realName: req.body.realName,
      email: req.body.email,
      wpp: req.body.wpp,
      team: req.body.team,
      image: imageId,
      course: req.body.course,
      hasCar: req.body.hasCar,
      role: req.body.role
    }

    await member.updateOne(newMemberInfos)
    return res.json(newMemberInfos)
  } catch (error) {
    return res.status(400).json({ error })
  }
}

export const destroy: RequestHandler = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)

    if (!member) throw new Error('Member not found')

    imageController.destroy(member.image)
    await member.remove()
    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ error })
  }
}
