import { Typegoose, prop, Ref } from 'typegoose'

import { Member } from './member'
import { Event } from './event'

export class Frequency extends Typegoose {
  @prop({ required: true, ref: Member })
  member!: Ref<Member>

  @prop({ required: true, ref: Event })
  event!: Ref<Event>
}

const frequencyModel = new Frequency().getModelForClass(Frequency)

export default frequencyModel
