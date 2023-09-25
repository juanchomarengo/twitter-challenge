export class MessageDTO {
  constructor (post: MessageDTO) {
    this.id = post.id
    this.conversationId = post.conversationId
    this.senderId = post.senderId
    this.content = post.content
    this.createdAt = post.createdAt
    this.updatedAt = post.updatedAt
  }

  id: string
  conversationId: string
  senderId: string
  content: string
  createdAt: Date
  updatedAt: Date
}
