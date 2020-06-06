const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: String,
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  description: String,
  summary: String,
  isActive: Boolean
})

module.exports = mongoose.model('Event', eventSchema)
