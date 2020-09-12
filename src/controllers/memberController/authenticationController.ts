import { RequestHandler } from 'express'
import * as permissions from '../../utils/permissions'
import Member from '../../database/models/member'

export const login: RequestHandler = async (req, res) => {
  try {
    const member = await Member.findOne({ email: req.body.email })
    if (!member) throw new Error('Email ou senha incorretos')

    if (!member.matchPassword(req.body.password))
      throw new Error('Email ou senha incorretos')

    const token = permissions.generateJWTToken({
      _id: member.id,
      role: member.role
    })
    return res.json({ token, auth: true })
  } catch (error) {
    return res.status(403).json({ error })
  }
}

export const autoLogin: RequestHandler = async (req: permissions.AuthRequest, res) => {
  try {
    const member = await Member.findById(req.user!._id)
    if (!member) throw new Error('Member not found')
    return res.send()
  } catch (error) {
    return res.status(403).json({ error })
  }
}
