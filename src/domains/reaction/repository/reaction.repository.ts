import { PostInteractionType } from '@prisma/client'
import { ReactionDTO } from '../dto'

export interface ReactionRepository {
  create: ({ postId, actionType, userId }: { postId: string; actionType: PostInteractionType; userId: string }) => Promise<ReactionDTO>
  delete: ({ postId, actionType, userId }: { postId: string; actionType: PostInteractionType; userId: string }) => Promise<ReactionDTO>
}
