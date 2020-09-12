import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'

import Member from '../../database/models/member'
import ResetPassword from '../../database/models/resetPassword'
import { Ref } from '@hasezoey/typegoose'

export const storePassword: RequestHandler = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)
    if (!member) throw new Error('Não existe membro com esse id')

    const resetPassword = await ResetPassword.findOne({
      member: req.params.id as unknown as Ref<typeof Member>,
      status: true
    })

    if (!resetPassword)
      throw new Error('Não existe um token válido cadastrado para esse e-mail')

    const validToken = await bcrypt.compare(
      req.params.token,
      resetPassword.token
    )

    if (!validToken)
      throw new Error('Token inválido')

    resetPassword.status = false
    await resetPassword.updateOne(resetPassword)

    const updatedMember = member.setPassword(req.body.password)

    await updatedMember.save()
    return res.json({ message: 'Senha alterada com sucesso' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

export const changePassword: RequestHandler = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)

    if (!member) throw new Error('Não existe membro com esse id')

    const updatedMember = member.changePassword(
      req.body.currentPassword,
      req.body.newPassword
    )

    await updatedMember.save()
    return res.json({ message: 'Senha alterada com sucesso' })
  } catch (error) {
    return res.status(400).json({ error })
  }
}
