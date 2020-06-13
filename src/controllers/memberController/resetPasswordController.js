const crypto = require('crypto')
const bcrypt = require('bcrypt')

const ResetPassword = require('../../database/models/resetPassword')
const Member = require('../../database/models/member')

const mailController = require('../services/mailController')

module.exports = {
  generateToken (req, res) {
    const email = req.body.email
    Member.findOne({ email: email }, (err, member) => {
      if (err) {
        return res.status(400).json({ err })
      }

      // Verifica se existe um membro cadastrado com o e-mail dado
      if (!member) {
        return res.status(400).json({
          err: 'Não existe membro registrado com esse e-mail'
        })
      }

      const memberId = member._id

      // Verifica se já existe um token gerado para o e-mail dado
      ResetPassword.findOne({
        member: memberId,
        status: true
      }, (err, resetPassword) => {
        if (err) {
          return res.status(400).json({ err })
        }

        if (resetPassword) {
          return res.json({
            message: 'Já existe um token válido para esse e-mail, cheque sua caixa de entrada',
            id: memberId
          })
          // resetPassword.remove()
        }

        // Gera o token e envia para o e-mail dado
        const token = crypto.randomBytes(32).toString('hex')

        mailController.sendResetPasswordEmail({
          id: memberId,
          email
        }, token, err => {
          if (err) {
            console.log(err)
            return res.status(400).json({ err })
          }

          // Criptografa o token e salva no banco de dados
          const saltRounds = 10
          bcrypt.hash(token, saltRounds, (err, hash) => {
            if (err) {
              return res.status(400).json({ err })
            }

            ResetPassword.create({
              member: member._id,
              token: hash,
              status: true
            }, err => {
              if (err) {
                return res.status(400).json({ err })
              }

              return res.json({
                message: 'E-mail enviado com sucesso, cheque sua caixa de entrada',
                id: memberId
              })
            })
          })
        })
      })
    })
  }
}
