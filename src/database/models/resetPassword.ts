import { Typegoose, prop, Ref } from '@hasezoey/typegoose'

import { Member } from './member'

export class ResetPassword extends Typegoose {
  @prop({ required: true, ref: Member })
  member!: Ref<Member>

  @prop({ required: true })
  token!: string

  @prop({ required: true })
  status!: boolean
}

const resetPasswordModel = new ResetPassword().getModelForClass(ResetPassword)

export default resetPasswordModel
