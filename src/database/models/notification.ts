import { Typegoose, prop, Ref } from '@hasezoey/typegoose'

import { Image } from './image'

export class Notification extends Typegoose {
  @prop({ required: true })
  title!: string

  @prop({ required: true, ref: Image })
  image!: Ref<Image>

  @prop({ required: true })
  description!: string

  @prop({ required: true })
  summary!: string

  @prop({ required: true })
  isActive!: boolean
}

const notificationModel = new Notification().getModelForClass(Notification)

export default notificationModel
