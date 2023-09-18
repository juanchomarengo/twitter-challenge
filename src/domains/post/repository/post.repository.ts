import { CursorPagination } from '@types'
import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from '../dto'

export interface PostRepository {
  createPost: (userId: string, data: CreatePostInputDTO) => Promise<PostDTO>
  createComment: (userId: string, parentId: string, data: CreatePostInputDTO) => Promise<PostDTO>
  getAllByDatePaginated: (userId: string, options: CursorPagination) => Promise<ExtendedPostDTO[]>
  delete: (postId: string) => Promise<void>
  getById: (postId: string) => Promise<ExtendedPostDTO | null>
  getByAuthorId: (authorId: string) => Promise<ExtendedPostDTO[]>
  getCommentsByPostId: (postId: string) => Promise<ExtendedPostDTO[]>
  incrementQty: (postId: string, qty: 'qtyLikes' | 'qtyComments' | 'qtyRetweets') => Promise<PostDTO>
  decrementQty: (postId: string, qty: 'qtyLikes' | 'qtyComments' | 'qtyRetweets') => Promise<PostDTO>
}
