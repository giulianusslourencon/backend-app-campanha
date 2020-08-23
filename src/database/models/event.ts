import { Typegoose, prop, Ref } from 'typegoose'

import { Image } from './image'
import { Team } from './team'

export class Event extends Typegoose {
  @prop({ required: true })
  title!: string

  @prop({ required: true })
  description!: string

  @prop({ required: true, ref: Image })
  image!: Ref<Image>

  @prop({ required: true })
  summary!: string

  @prop({ required: true, ref: Team })
  team!: Ref<Team>

  @prop({ required: true })
  eventGroup!: string

  @prop({ required: true })
  date!: Date

  @prop({ required: true })
  location!: string

  @prop({ required: true })
  conclusion!: string
}

const eventModel = new Event().getModelForClass(Event)

export default eventModel
