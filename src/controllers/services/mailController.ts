import mailer from '../../config/nodemailer'
import Member from '../../database/models/member'

const transporterPromise = mailer()

export const sendResetPasswordEmail =
async (email: string, token: string) => {
  const mailOptions = {
    from: `"Campanha USP do Agasalho" <${process.env.USER_EMAIL}>`,
    to: email,
    subject: 'Troca de Senha: Aplicativo Campanha',
    html: '<h1>Troca de Senha</h1>' +
          `<p>Seu token para o e-mail ${email} é o seguinte:</p>` +
          `<div><h3>${token}</h3></div>`
  }

  const transporter = await transporterPromise
  const info = await transporter.sendMail(mailOptions)
  return info
}
