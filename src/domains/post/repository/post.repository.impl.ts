import { PrismaClient } from '@prisma/client'

import { CursorPagination } from '@types'

import { PostRepository } from '.'
import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from '../dto'

export class PostRepositoryImpl implements PostRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
    const post = await this.db.post.create({
      data: {
        authorId: userId,
        ...data
      }
    })
    return new PostDTO(post)
  }

  async getAllByDatePaginated(userId: string, options: CursorPagination): Promise<ExtendedPostDTO[]> {
    const posts = await this.db.post.findMany({
      where: {
        author: {
          OR: [
            {
              privateProfile: false
            },
            {
              AND: [
                {
                  privateProfile: true
                },
                {
                  followers: {
                    some: {
                      followerId: userId
                    }
                  }
                }
              ]
            }
          ]
        }
      },
      include: {
        author: true
      },
      cursor: options.after ? { id: options.after } : options.before ? { id: options.before } : undefined,
      skip: options.after ?? options.before ? 1 : undefined,
      take: options.limit ? (options.before ? -options.limit : options.limit) : undefined,
      orderBy: [
        {
          createdAt: 'desc'
        },
        {
          id: 'asc'
        }
      ]
    })
    return posts.map((post) => new ExtendedPostDTO(post))
  }

  async delete(postId: string): Promise<void> {
    await this.db.post.delete({
      where: {
        id: postId
      }
    })
  }

  async getById(postId: string): Promise<ExtendedPostDTO | null> {
    const post = await this.db.post.findUnique({
      where: {
        id: postId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            privateProfile: true
          }
        }
      }
    })
    return post != null ? new ExtendedPostDTO(post) : null
  }

  async getByAuthorId(authorId: string): Promise<ExtendedPostDTO[]> {
    const posts = await this.db.post.findMany({
      where: {
        authorId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            privateProfile: true
          }
        }
      }
    })
    return posts.map((post) => new ExtendedPostDTO(post))
  }
}
