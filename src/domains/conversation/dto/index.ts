export class ConversationDTO {
  constructor (post: ConversationDTO) {
    this.id = post.id
    this.userOneId = post.userOneId
    this.userTwoId = post.userTwoId
    this.createdAt = post.createdAt
    this.updatedAt = post.updatedAt
  }

  id: string
  userOneId: string
  userTwoId: string
  createdAt: Date
  updatedAt: Date
}
