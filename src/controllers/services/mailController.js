const mailer = require('../../config/nodemailer')
const transporterPromise = mailer()

module.exports = {
  sendResetPasswordEmail (member, token, callback) {
    const mailOptions = {
      from: `"Campanha USP do Agasalho" <${process.env.USER_EMAIL}>`,
      to: member.email,
      subject: 'Troca de Senha: Aplicativo Campanha',
      html: '<h1>Troca de Senha</h1>' +
            `<p>Seu token para o e-mail ${member.email} é o seguinte:</p>` +
            `<div><h3>${token}</h3></div>`
    }

    transporterPromise.then(transporter => {
      transporter.sendMail(mailOptions, (err, info) => {
        callback(err, info)
      })
    })
  }
}
