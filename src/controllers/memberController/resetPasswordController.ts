import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'

import ResetPassword from '../../database/models/resetPassword'
import Member from '../../database/models/member'

import * as mailController from '../services/mailController'

export const generateToken: RequestHandler = async (req, res) => {
  try {
    const email = req.body.email as string

    const member = await Member.findOne({ email })
    if (!member)
      throw new Error('Não existe membro registrado com esse e-mail')

    const memberId = member._id

    const registeredRequest = await ResetPassword.findOne({
      member: memberId,
      status: true
    })

    if (registeredRequest) {
      return res.json({
        message: 'Já existe um token válido para esse e-mail, cheque sua caixa de entrada',
        id: memberId
      })
    }

    const token = crypto.randomBytes(32).toString('hex')
    await mailController.sendResetPasswordEmail(email, token)

    const saltRounds = 10
    const hash = await bcrypt.hash(token, saltRounds)

    await ResetPassword.create({
      member: memberId,
      token: hash,
      status: true
    })

    return res.json({
      message: 'E-mail enviado com sucesso, cheque sua caixa de entrada',
      id: memberId
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
}
