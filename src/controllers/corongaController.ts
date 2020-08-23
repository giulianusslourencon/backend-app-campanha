import { RequestHandler } from 'express'

import Team from '../database/models/team'
import Member from '../database/models/member'

export const teams: RequestHandler = async (_req, res) => {
  try {
    await Team.deleteMany({})
    return res.status(204).send()
  } catch (error) {
    return res.status(400).send()
  }
}

export const members: RequestHandler = async (_req, res) => {
  try {
    await Member.deleteMany({})
    return res.status(204).send()
  } catch (error) {
    return res.status(400).send()
  }
}
