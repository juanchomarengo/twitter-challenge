import { PostInteractionType } from '@prisma/client'
import { ReactionDTO } from '../dto'
import { ReactionRepository } from '../repository'
import { ReactionService } from './reaction.service'

export class ReactionServiceImpl implements ReactionService {
  constructor(private readonly repository: ReactionRepository) {}
  async create({
    postId,
    actionType,
    userId
  }: {
    postId: string
    actionType: PostInteractionType
    userId: string
  }): Promise<ReactionDTO> {
    const reaction = await this.repository.create({ postId, actionType, userId })

    return reaction
  }

  async delete({
    postId,
    actionType,
    userId
  }: {
    postId: string
    actionType: PostInteractionType
    userId: string
  }): Promise<ReactionDTO> {
    const reaction = await this.repository.delete({ postId, actionType, userId })

    return reaction
  }
}
