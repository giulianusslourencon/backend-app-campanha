const mailer = require('../config/nodemailer')

module.exports = {
  sendResetPasswordEmail (member, token) {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: member.email,
      subject: 'Troca de Senha: Aplicativo Campanha',
      html: `<h1>Troca de Senha</h1><p><a href="http://localhost:3333/members/${member.id}/password/reset/${token}">Clique aqui para trocar sua senha</a></p>`
    }

    mailer.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err)

      console.log('E-mail enviado: ' + info.response)
    })
  }
}
