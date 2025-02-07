import { PostInteractionType } from '@prisma/client'
import { ExtendedReactionDto, ReactionDTO } from '../dto'

export interface ReactionService {
  create: ({ postId, actionType, userId }: { postId: string; actionType: PostInteractionType; userId: string }) => Promise<ReactionDTO>
  delete: ({ postId, actionType, userId }: { postId: string; actionType: PostInteractionType; userId: string }) => Promise<string>
  getPostsByReactionType: (type: PostInteractionType[], userId: string) => Promise<ExtendedReactionDto[]>
}
