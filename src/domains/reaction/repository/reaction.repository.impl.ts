import { PostInteractionType, PrismaClient } from '@prisma/client'
import { ReactionDTO } from '../dto'
import { ReactionRepository } from './reaction.repository'

export class ReactionRepositoryImpl implements ReactionRepository {
  constructor(private readonly db: PrismaClient) {}

  async getOne({ postId, userId }: { postId: string; userId: string }): Promise<ReactionDTO | null> {
    const reaction = await this.db.postInteractions.findUnique({
      where: {
        userId_postId_actionType: {
          postId,
          userId,
          actionType: PostInteractionType.LIKE
        }
      }
    })

    return reaction ? new ReactionDTO(reaction) : null
  }

  async create({
    postId,
    userId,
    actionType
  }: {
    postId: string
    userId: string
    actionType: PostInteractionType
  }): Promise<ReactionDTO> {
    const newReaction = await this.db.postInteractions.create({
      data: {
        postId,
        userId,
        actionType
      }
    })
    return newReaction
  }

  async delete({ postId, userId }: { postId: string; userId: string }): Promise<void> {
    await this.db.postInteractions.delete({
      where: {
        userId_postId_actionType: {
          postId,
          userId,
          actionType: PostInteractionType.LIKE
        }
      }
    })
  }
}
