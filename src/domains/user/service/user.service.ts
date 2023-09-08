import { OffsetPagination } from '@types'
import { UserDTO } from '../dto'

export interface UserService {
  deleteUser: (userId: string) => Promise<void>
  getUser: (userId: string) => Promise<UserDTO>
  getUserRecommendations: (userId: string, options: OffsetPagination) => Promise<UserDTO[]>
  partialUpdate: (userId: string, data: Partial<UserDTO>) => Promise<UserDTO>
}
