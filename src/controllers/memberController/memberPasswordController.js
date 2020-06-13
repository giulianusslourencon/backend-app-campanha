const bcrypt = require('bcrypt')

const Member = require('../../database/models/member')
const ResetPassword = require('../../database/models/resetPassword')

module.exports = {
  storePassword (req, res) {
    ResetPassword.findOne({
      member: req.params.id,
      status: true
    }, (err, resetPassword) => {
      if (err) {
        return res.status(400).json({ err })
      }

      if (!resetPassword) {
        return res.status(400).json({
          err: 'Não existe um token válido cadastrado para esse e-mail'
        })
      }

      bcrypt.compare(req.params.token, resetPassword.token,
        (errBcrypt, resBcrypt) => {
          if (errBcrypt) {
            return res.status(400).json({ err: errBcrypt })
          }

          if (!resBcrypt) {
            return res.status(400).json({ err: 'Token inválido' })
          }

          resetPassword.status = false
          resetPassword.updateOne(resetPassword, err => {
            if (err) {
              return res.status(400).json({ err })
            }

            Member.findById(req.params.id, (err, member) => {
              if (err) {
                return res.status(400).json({ err })
              }

              member.setPassword(req.body.password, (err, updatedMember) => {
                if (err) {
                  return res.status(403).json({ err })
                }

                updatedMember.save()
                return res.json({ message: 'Senha alterada com sucesso' })
              })
            })
          })
        })
    })
  },

  changePassword (req, res) {
    Member.findById(req.params.id, (err, member) => {
      if (err) return res.status(400).json(err)
      member.changePassword(req.body.currentPassword, req.body.newPassword,
        (err, updatedMember) => {
          if (err) {
            return res.status(403).json(err)
          }

          updatedMember.save()
          return res.json({ message: 'Senha alterada com sucesso' })
        }
      )
    })
  }
}
