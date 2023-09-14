export class ReactionDTO {
  constructor(reaction: ReactionDTO) {
    this.id = reaction.id
    this.userId = reaction.userId
    this.postId = reaction.postId
    this.actionType = reaction.actionType
  }

  id: string
  userId: string
  postId: string
  actionType: string
}
