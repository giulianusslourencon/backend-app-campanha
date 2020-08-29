import { Typegoose, prop } from '@hasezoey/typegoose'

export class Team extends Typegoose {
  @prop({ required: true })
  _id!: string

  @prop({ required: true })
  name!: string

  @prop({ required: true })
  shortName!: string

  @prop({ required: true })
  description!: string

  @prop({ required: true })
  score!: number
}

const teamModel = new Team().getModelForClass(Team)

export default teamModel
