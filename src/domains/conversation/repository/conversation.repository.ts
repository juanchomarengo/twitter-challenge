import { ConversationDTO } from '../dto'

export interface ConversationRepository {
  get: (userId: string, conversationId: string) => Promise<ConversationDTO | null>
  upsert: (userOne: string, userTwo: string) => Promise<ConversationDTO>
  getConversationsAndPotentialUsers: (userId: string) => Promise<any>
  canCreateConversation: (userId: string, userTwo: string) => Promise<boolean>
}
