const mongoose = require('mongoose')
const aws = require('aws-sdk')
const s3 = new aws.S3()

const imageSchema = new mongoose.Schema({
  key: String,
  url: String
})

imageSchema.pre('remove', function () {
  return s3.deleteObject({
    Bucket: process.env.AWS_BUCKET,
    Key: this.key
  }).promise()
})

module.exports = mongoose.model('Image', imageSchema)
