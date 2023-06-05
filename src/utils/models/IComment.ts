export interface IComment {
  owner: { _id: string, name: string, username: string, surname: string }
  likes: {userId: string}[]
  title: string
  body: string
}
