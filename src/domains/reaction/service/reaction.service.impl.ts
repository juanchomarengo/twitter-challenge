import { PostInteractionType } from '@prisma/client'
import { ExtendedReactionDto, ReactionDTO } from '../dto'
import { ReactionRepository } from '../repository'
import { ReactionService } from './reaction.service'
import { PostRepository } from '@domains/post/repository'
import { ForbiddenException, NotFoundException } from '@utils'
import { FollowService } from '@domains/follow/service'

export class ReactionServiceImpl implements ReactionService {
  constructor(
    private readonly repository: ReactionRepository,
    private readonly postRepository: PostRepository,
    private readonly followService: FollowService
  ) {}

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

    const getParent = await this.postRepository.getById(postId)

    if (!getParent) throw new NotFoundException('post')

    if (getParent.author.privateProfile) {
      const canViewThisPost = await this.followService.canViewPrivateProfile({
        followedId: getParent.authorId,
        followerId: userId
      })

      if (!canViewThisPost) {
        throw new ForbiddenException()
      }
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

    if (!reaction) {
      throw new NotFoundException('reaction')
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

  async getPostsByReactionType(type: PostInteractionType[], userId: string): Promise<ExtendedReactionDto[]> {
    const post = await this.repository.getPostsByReactionsType(type, userId)
    return post
  }
}
