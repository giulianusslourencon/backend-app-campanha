import mongoose from 'mongoose' // Interface to MongoDB

const databaseURL = process.env.ACDATABASEURL || 'mongodb://localhost'
mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to DB')
}).catch(err => {
  console.log('ERROR: ', err.message)
})

export default mongoose
