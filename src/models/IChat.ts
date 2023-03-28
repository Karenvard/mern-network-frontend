import { IMessage } from "./IMessage"

export interface IChat {
  "_id": string
  persons: {userId: string, _id: string}[]
  messages: IMessage[]
}