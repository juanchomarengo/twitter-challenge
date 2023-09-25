import { PrismaClient } from '@prisma/client'
import { MessageRepository } from './message.repository'
import { MessageDTO } from '../dto'

export class MessageRepositoryImpl implements MessageRepository {
  constructor(private readonly db: PrismaClient) {}
  async getAllByConversationId(conversationId: string): Promise<MessageDTO[]> {
    const messages = await this.db.message.findMany({
      where: {
        conversationId
      }
    })
    return messages
  }

  async create(conversationId: string, senderId: string, content: string): Promise<MessageDTO> {
    const message = await this.db.message.create({
      data: {
        conversationId,
        senderId,
        content
      }
    })
    return message
  }
}
