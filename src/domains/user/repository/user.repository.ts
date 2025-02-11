import { SignupInputDTO } from '@domains/auth/dto'
import { OffsetPagination } from '@types'
import { ExtendedUserDTO, UserDTO, UserViewDTO } from '../dto'

export interface UserRepository {
  create: (data: SignupInputDTO) => Promise<UserDTO>
  delete: (userId: string) => Promise<void>
  getRecommendedUsersPaginated: (options: OffsetPagination) => Promise<UserViewDTO[]>
  getById: (userId: string) => Promise<UserViewDTO | null>
  getByEmailOrUsername: (email?: string, username?: string) => Promise<ExtendedUserDTO | null>
  partialUpdate: (userId: string, data: Partial<UserDTO>) => Promise<UserDTO>
  getUserByUsername: (username: string, options: OffsetPagination) => Promise<UserViewDTO[]>
  getConversationsAndPotentialUsers: (userId: string) => Promise<any>
}
