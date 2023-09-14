import { PostInteractionType, PrismaClient } from '@prisma/client'
import { ReactionDTO } from '../dto'
import { ReactionRepository } from './reaction.repository'

export class ReactionRepositoryImpl implements ReactionRepository {
  constructor(private readonly db: PrismaClient) {}

  async create({
    postId,
    userId,
    actionType
  }: {
    postId: string
    userId: string
    actionType: PostInteractionType
  }): Promise<ReactionDTO> {
    const newReaction = await this.db.postInteractions.upsert({
      where: {
        userId_postId_actionType: {
          postId,
          userId,
          actionType
        }
      },
      create: {
        postId,
        userId,
        actionType
      },
      update: {
        deletedAt: null
      }
    })
    return newReaction
  }

  async delete({ postId, userId }: { postId: string; userId: string }): Promise<ReactionDTO> {
    const reaction = await this.db.postInteractions.update({
      where: {
        userId_postId_actionType: {
          postId,
          userId,
          actionType: PostInteractionType.LIKE
        }
      },
      data: {
        deletedAt: new Date()
      }
    })

    return reaction
  }
}
