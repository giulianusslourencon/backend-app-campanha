import { Typegoose, prop, pre } from 'typegoose'
import aws from 'aws-sdk'
const s3 = new aws.S3()

@pre<Image>('remove', function () {
  return s3.deleteObject({
    Bucket: process.env.AWS_BUCKET!,
    Key: this.key
  }).promise()
})

export class Image extends Typegoose {
  @prop({ required: true })
  key!: string

  @prop({ required: true })
  url!: string
}

const imageModel = new Image().getModelForClass(Image)

export default imageModel
