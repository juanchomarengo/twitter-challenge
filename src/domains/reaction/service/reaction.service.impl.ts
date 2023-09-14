import { PostInteractionType } from '@prisma/client'
import { ReactionDTO } from '../dto'
import { ReactionRepository } from '../repository'
import { ReactionService } from './reaction.service'
import { PostRepository } from '@domains/post/repository'

export class ReactionServiceImpl implements ReactionService {
  constructor(private readonly repository: ReactionRepository, private readonly postRepository: PostRepository) {}

  async create({
    postId,
    actionType,
    userId
  }: {
    postId: string
    actionType: PostInteractionType
    userId: string
  }): Promise<ReactionDTO> {
    const reaction = await this.repository.getOne({ postId, userId })

    if (reaction) {
      return reaction
    }

    const newReaction = await this.repository.create({ postId, actionType, userId })

    switch (actionType) {
      case PostInteractionType.LIKE:
        await this.postRepository.incrementQty(postId, 'qtyLikes')
        break
      case PostInteractionType.RETWEET:
        await this.postRepository.incrementQty(postId, 'qtyRetweets')
        break
      default:
        break
    }

    return newReaction
  }

  async delete({
    postId,
    actionType,
    userId
  }: {
    postId: string
    actionType: PostInteractionType
    userId: string
  }): Promise<string> {
    const reaction = await this.repository.getOne({ postId, userId })

    // TODO: Thow the correct exeption
    if (!reaction) {
      return 'Not found'
    }

    await this.repository.delete({ postId, actionType, userId })

    switch (actionType) {
      case PostInteractionType.LIKE:
        await this.postRepository.decrementQty(postId, 'qtyLikes')
        break
      case PostInteractionType.RETWEET:
        await this.postRepository.decrementQty(postId, 'qtyRetweets')
        break
      default:
        break
    }

    return 'Deleted'
  }
}
