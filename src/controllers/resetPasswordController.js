const crypto = require('crypto')
const bcrypt = require('bcrypt')

const ResetPassword = require('../database/models/resetPassword')
const Member = require('../database/models/member')

const mailController = require('./mailController')

module.exports = {
  generateToken (req, res) {
    const email = req.body.email
    Member.findOne({ email: email }, (err, member) => {
      if (err) {
        return res.status(400).json(err)
      }

      if (!member) {
        return res.status(400).json({
          err: 'Não existe membro registrado com esse e-mail'
        })
      }

      ResetPassword.findOne({
        member: member._id,
        status: false
      }, (err, resetPassword) => {
        if (err) {
          return res.status(400).json(err)
        }

        if (resetPassword) {
          resetPassword.remove()
        }

        const token = crypto.randomBytes(32).toString('hex')
        bcrypt.hash(token, null, null, (err, hash) => {
          if (err) {
            return res.status(400).json(err)
          }

          ResetPassword.create({
            member: member._id,
            token: hash,
            status: true
          }, (err, item) => {
            if (err) {
              return res.status(400).json(err)
            }

            mailController.sendResetPasswordEmail({
              id: member._id,
              email: member.email
            }, token)
          })
        })
      })
    })
  }
}
