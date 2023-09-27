import { UserDTO } from '@domains/user/dto'
import { UserRepository } from '@domains/user/repository'

export class AlwaysEmptyUserRepository implements UserRepository {
  async create(data: any): Promise<UserDTO> {
    return new UserDTO({
      id: 'a',
      name: 'a',
      createdAt: new Date(),
      privateProfile: false
    })
  }

  async delete(userId: string): Promise<void> {}

  async getRecommendedUsersPaginated(options: any): Promise<any[]> {
    return []
  }

  async getById(userId: string): Promise<any> {
    return new UserDTO({
      id: userId,
      name: 'a',
      createdAt: new Date(),
      privateProfile: false
    })
  }

  async getByEmailOrUsername(email?: string, username?: string): Promise<any> {
    return new UserDTO({
      id: 'a',
      name: 'a',
      createdAt: new Date(),
      privateProfile: false
    })
  }

  async partialUpdate(userId: string, data: Partial<any>): Promise<UserDTO> {
    return new UserDTO({
      id: 'a',
      name: 'a',
      createdAt: new Date(),
      privateProfile: false
    })
  }

  async getUserByUsername(username: string, options: any): Promise<any[]> {
    return []
  }

  async getConversationsAndPotentialUsers(userId: string): Promise<any> {
    return []
  }
}
