import { PrismaClient } from '@prisma/client'
import { ConversationRepository } from './conversation.repository'
import { ConversationDTO } from '../dto'

export class ConversationRepositoryImpl implements ConversationRepository {
  constructor(private readonly db: PrismaClient) {}

  async get(userId: string, conversationId: string): Promise<ConversationDTO | null> {
    const conversation = await this.db.converations.findFirst({
      where: {
        id: conversationId,
        OR: [{ userOneId: userId }, { userTwoId: userId }]
      },
      include: {
        messages: true
      }
    })
    return conversation
  }

  async upsert(userOne: string, userTwo: string): Promise<ConversationDTO> {
    const conversation = await this.db.converations.upsert({
      where: {
        userOneId_userTwoId: {
          userOneId: userOne,
          userTwoId: userTwo
        }
      },
      update: {},
      create: {
        userOneId: userOne,
        userTwoId: userTwo
      }
    })
    return conversation
  }

  async getConversationsAndPotentialUsers(userId: string): Promise<any> {
    // Consulta para obtener todas las conversaciones del usuario actual
    const conversations = await this.db.converations.findMany({
      where: {
        OR: [{ userOneId: userId }, { userTwoId: userId }]
      },
      include: {
        messages: true
      }
    })

    // TODO: Do this query in PRISMA ORM
    const potentialUsers = await this.db.$queryRaw<Array<{ followedId: string }>>`
    SELECT DISTINCT A."followedId"
    FROM "Follow" A
    INNER JOIN "Follow" B ON A."followerId" = B."followedId" AND A."followedId" = B."followerId"
    LEFT JOIN "Converations" C ON (A."followerId" = C."userOneId" AND A."followedId" = C."userTwoId")
    OR (A."followerId" = C."userTwoId" AND A."followedId" = C."userOneId")
    WHERE A."followerId" = ${userId}::uuid AND C."id" IS NULL
    `

    const potential = potentialUsers.map((user: { followedId: string }) => user.followedId)

    return {
      conversations,
      potential
    }
  }

  async canCreateConversation(userOne: string, userTwo: string): Promise<boolean> {
    const followEachOther = await this.db.$queryRaw<Array<{ followedId: string }>>`
    SELECT DISTINCT A."followedId"
    FROM "Follow" A
    INNER JOIN "Follow" B ON A."followerId" = B."followedId" AND A."followedId" = B."followerId"
    WHERE A."followerId" = ${userOne}::uuid
  `

    let canCreate = false

    followEachOther.forEach((user) => {
      if (user.followedId === userTwo) {
        canCreate = true
      }
    })

    return canCreate
  }
}
