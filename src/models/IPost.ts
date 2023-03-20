import {IComment} from "./IComment";

export interface IPost {
    Title: string
    Description: string
    Photo: string
    Likes: number
    Liked: boolean
    Comments: IComment[]
}