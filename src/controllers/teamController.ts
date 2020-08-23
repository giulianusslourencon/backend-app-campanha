import { RequestHandler } from 'express'
import Team from '../database/models/team'

export const index: RequestHandler = async (_req, res) => {
  try {
    const teams = await Team.find({})
    return res.json({ teams })
  } catch (err) {
    return res.status(400).json({ err })
  }
}

export const create: RequestHandler = async (req, res) => {
  try {
    const newTeam = await Team.create({
      _id: req.body.id,
      name: req.body.name,
      shortName: req.body.shortName,
      description: req.body.description,
      score: req.body.score
    })
    return res.json({ newTeam })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

export const update: RequestHandler = async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      shortName: req.body.shortName,
      description: req.body.description,
      score: req.body.score
    }, { new: true })

    return res.json({ updatedTeam })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

export const destroy: RequestHandler = async (req, res) => {
  try {
    await Team.findByIdAndRemove(req.params.id)
    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ error })
  }
}
