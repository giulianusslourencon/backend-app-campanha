const mongoose = require('mongoose')

const resetPasswordSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  },
  token: String,
  status: Boolean
})

module.exports = mongoose.model('Reset-Password', resetPasswordSchema)
