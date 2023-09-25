import { SignupInputDTO } from '@domains/auth/dto'
import { PrismaClient } from '@prisma/client'
import { OffsetPagination } from '@types'
import { ExtendedUserDTO, UserDTO, UserViewDTO } from '../dto'
import { UserRepository } from './user.repository'

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: SignupInputDTO): Promise<UserDTO> {
    return await this.db.user
      .create({
        data
      })
      .then((user) => new UserDTO(user))
  }

  async getById(userId: string): Promise<UserViewDTO | null> {
    const user = await this.db.user.findUnique({
      where: {
        id: userId
      }
    })
    return user ? new UserViewDTO(user) : null
  }

  async delete(userId: string): Promise<void> {
    await this.db.user.delete({
      where: {
        id: userId
      }
    })
  }

  async getRecommendedUsersPaginated(options: OffsetPagination): Promise<UserViewDTO[]> {
    const users = await this.db.user.findMany({
      take: options.limit ? options.limit : undefined,
      skip: options.skip ? options.skip : undefined,
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })
    return users.map((user) => new UserViewDTO(user))
  }

  async getByEmailOrUsername(email?: string, username?: string): Promise<ExtendedUserDTO | null> {
    const user = await this.db.user.findFirst({
      where: {
        OR: [
          {
            email
          },
          {
            username
          }
        ]
      }
    })
    return user ? new ExtendedUserDTO(user) : null
  }

  async partialUpdate(userId: string, data: Partial<UserDTO>): Promise<UserDTO> {
    const user = await this.db.user.update({
      where: {
        id: userId
      },
      data
    })
    return new UserDTO(user)
  }

  async getUserByUsername(username: string, options: OffsetPagination): Promise<UserViewDTO[]> {
    const users = await this.db.user.findMany({
      where: {
        username: {
          startsWith: username
        }
      },
      take: options.limit ? options.limit : undefined,
      skip: options.skip ? options.skip : undefined
    })
    return users.map((user) => new UserViewDTO(user))
  }

  async getConversationsAndPotentialUsers(userId: string): Promise<any> {
    // Consulta para obtener todas las conversaciones del usuario actual
    const conversations = await this.db.converations.findMany({
      where: {
        OR: [{ userOneId: userId }, { userTwoId: userId }]
      }
    })

    // TODO: Do this query in PRISMA ORM
    const potentialUsers = await this.db.$queryRaw<Array<{ followedId: string }>>`
    SELECT DISTINCT A."followedId"
    FROM "Follow" A
    INNER JOIN "Follow" B ON A."followerId" = B."followedId" AND A."followedId" = B."followerId"
    WHERE A."followerId" = '30a91154-a8e9-4011-81b8-525fa35fcf2a';
    `

    const potential = potentialUsers.map((user: { followedId: string }) => user.followedId)

    return { conversations, potential }
  }
}
