import { MessageDTO } from '../dto'

export interface MessageRepository {
  create: (conversationId: string, senderId: string, content: string) => Promise<MessageDTO>
  getAllByConversationId: (conversationId: string) => Promise<MessageDTO[]>
}
