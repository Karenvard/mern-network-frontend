import {IComment} from "./IComment";

export interface IPost {
    title: string
    body: string
    photo: string
    likes: number
    comments: IComment[]
}
