import { NotFoundException } from '@utils/errors'
import { OffsetPagination } from 'types'
import { UserDTO, UserViewDTO } from '../dto'
import { UserRepository } from '../repository'
import { UserService } from './user.service'
import { isUUID } from '@utils/functions'

export class UserServiceImpl implements UserService {
  constructor (private readonly repository: UserRepository) {}

  async getUser (userId: string): Promise<UserViewDTO> {
    if (!userId || !isUUID(userId)) throw new NotFoundException('user')
    const user = await this.repository.getById(userId)
    if (!user) throw new NotFoundException('user')
    return user
  }

  async getUserRecommendations (userId: string, options: OffsetPagination): Promise<UserViewDTO[]> {
    // TODO: make this return only users followed by users the original user follows
    return await this.repository.getRecommendedUsersPaginated(options)
  }

  async partialUpdate (userId: string, data: Partial<UserDTO>): Promise<UserDTO> {
    if (!userId || !isUUID(userId)) throw new NotFoundException('user')
    const user = await this.repository.getById(userId)
    if (!user) throw new NotFoundException('user')
    const userUpdated = await this.repository.partialUpdate(userId, data)
    return userUpdated
  }

  async deleteUser (userId: string): Promise<void> {
    if (!userId || !isUUID(userId)) throw new NotFoundException('user')
    const user = await this.repository.getById(userId)
    if (!user) throw new NotFoundException('user')
    await this.repository.delete(userId)
  }

  async getUserByUsername (username: string, options: OffsetPagination): Promise<UserViewDTO[]> {
    if (!username) return []

    return await this.repository.getUserByUsername(username, options)
  }
}
