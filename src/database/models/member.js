const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const memberSchema = new mongoose.Schema({
  name: String,
  realName: String,
  email: String,
  salt: { // Used for password encryptation
    type: String,
    select: false
  },
  hash: { // Used for password encryptation
    type: String,
    select: false
  },
  wpp: String,
  team: {
    type: String,
    ref: 'Team'
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  course: String,
  hasCar: Number,
  coord: Boolean
})

memberSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  errorMessages: {
    MissingPasswordError: 'Nenhuma senha passada',
    MissingUsernameError: 'Nenhum usuário passado',
    IncorrectPasswordError: 'Senha incorreta',
    IncorrectUsernameError: 'Não existe usuário com esse email'
  }
})

module.exports = mongoose.model('Member', memberSchema)
