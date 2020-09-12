import {
  Typegoose, prop, staticMethod,
  InstanceType, ModelType, instanceMethod
} from '@hasezoey/typegoose'
import { PERMISSION } from '../../utils/permissions'

import { Image } from './image'

interface INewMember {
  name: string
  realName: string
  email: string
  wpp: string
  team: string
  image: string | null
  course: string
  hasCar: number
  role: PERMISSION
}

export class Member extends Typegoose {
  @prop({ required: true })
  name!: string

  @prop({ required: true })
  realName!: string

  @prop({ required: true, unique: true })
  email!: string

  @prop({ required: true })
  pwd!: string

  @prop({ required: true })
  wpp!: string

  @prop({ required: true })
  team!: string

  @prop({ required: true, ref: Image })
  image!: string | null

  @prop({ required: true })
  course!: string

  @prop({ required: true })
  hasCar!: number

  @prop({ required: true })
  role!: PERMISSION

  @instanceMethod
  setPassword(this: InstanceType<Member>, newPassword: string) {
    const hashedPassword = newPassword
    this.pwd = hashedPassword
    return this
  }

  @instanceMethod
  changePassword(this: InstanceType<Member>,
    curPassword: string, newPassword: string
  ) {
    if (!this.matchPassword(curPassword)) throw new Error('Wrong password')
    return this.setPassword(newPassword)
  }

  @instanceMethod
  matchPassword(this: InstanceType<Member>, password: string) {
    return password === this.pwd
  }

  @staticMethod
  static async register(this: ModelType<Member> & typeof Member,
    member: INewMember, password: string
  ) {
    const hashedPassword = password
    return await this.create({ ...member, pwd: hashedPassword })
  }
}

const memberModel = new Member().getModelForClass(Member)

export default memberModel
