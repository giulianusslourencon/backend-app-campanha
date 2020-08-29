import { Typegoose, prop, plugin, InstanceType } from '@hasezoey/typegoose'
import passportLocalMongoose from 'passport-local-mongoose'

import { Image } from './image'
import { Team } from './team'

interface INewMember {
  name: string
  realName: string
  email: string
  wpp: string
  team: string
  image: string | null
  course: string
  hasCar: number
  coord: boolean
}

@plugin(passportLocalMongoose, {
  usernameField: 'email',
  errorMessages: {
    MissingPasswordError: 'Nenhuma senha passada',
    MissingUsernameError: 'Nenhum usuário passado',
    IncorrectPasswordError: 'Usuário ou senha incorretos',
    IncorrectUsernameError: 'Usuário ou senha incorretos'
  }
})

export class Member extends Typegoose {
  @prop({ required: true })
  name!: string

  @prop({ required: true })
  realName!: string

  @prop({ required: true })
  email!: string

  @prop({ required: true, select: false })
  salt!: string

  @prop({ required: true, select: false })
  hash!: string

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
  coord!: boolean

  setPassword: ((newPassword: string) =>
    Promise<InstanceType<Member>>) | undefined

  changePassword: ((curPassword: string, newPassword: string) =>
    Promise<InstanceType<Member>>) | undefined

  static authenticate: () => any
  static serializeUser: () => any
  static deserializeUser: () => any
  static register: (member: INewMember, password: string) =>
    Promise<InstanceType<Member>>
}

const memberModel = new Member().getModelForClass(Member)

export default memberModel
