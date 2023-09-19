import { OffsetPagination } from '@types'
import { UserDTO, UserViewDTO } from '../dto'

export interface UserService {
  deleteUser: (userId: string) => Promise<void>
  getUser: (userId: string) => Promise<UserViewDTO>
  getUserRecommendations: (userId: string, options: OffsetPagination) => Promise<UserViewDTO[]>
  partialUpdate: (userId: string, data: Partial<UserDTO>) => Promise<UserDTO>
  getUserByUsername: (username: string, options: OffsetPagination) => Promise<UserViewDTO[]>
}
