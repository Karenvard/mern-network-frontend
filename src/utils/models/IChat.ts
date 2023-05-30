export interface IChat {
  persons: {userId: string}[]
  messages: {SenderID: string, text: string}[]
};
