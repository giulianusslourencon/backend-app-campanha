const nodemailer = require('nodemailer')

async function startTransporter () {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL
    }
  })

  return transporter
}

module.exports = startTransporter
