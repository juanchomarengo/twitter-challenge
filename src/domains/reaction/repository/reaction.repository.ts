import { PostInteractionType } from '@prisma/client'
import { ReactionDTO } from '../dto'

export interface ReactionRepository {
  getOne: ({ postId, userId }: { postId: string; userId: string }) => Promise<ReactionDTO | null>
  create: ({ postId, actionType, userId }: { postId: string; actionType: PostInteractionType; userId: string }) => Promise<ReactionDTO>
  delete: ({ postId, actionType, userId }: { postId: string; actionType: PostInteractionType; userId: string }) => Promise<void>
}
