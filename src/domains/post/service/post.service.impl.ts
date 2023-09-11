import { CreatePostInputDTO, PostDTO } from '../dto'
import { PostRepository } from '../repository'
import { PostService } from '.'
import { validate } from 'class-validator'
import { ForbiddenException, NotFoundException } from '@utils'
import { CursorPagination } from '@types'
import { FollowService } from '@domains/follow/service'
import { UserService } from '@domains/user/service'

export class PostServiceImpl implements PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly followService: FollowService,
    private readonly userService: UserService
  ) {}

  async createPost(userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
    await validate(data)
    return await this.repository.create(userId, data)
  }

  async deletePost(userId: string, postId: string): Promise<void> {
    const post = await this.repository.getById(postId)
    if (!post) throw new NotFoundException('post')
    if (post.authorId !== userId) throw new ForbiddenException()
    await this.repository.delete(postId)
  }

  async getPost(userId: string, postId: string): Promise<any> {
    const post = await this.repository.getById(postId)
    if (!post) throw new NotFoundException('post')

    if (post.author.privateProfile) {
      const canViewThisPost = await this.followService.canViewPrivateProfile({
        followedId: post.authorId,
        followerId: userId
      })

      if (!canViewThisPost) {
        throw new ForbiddenException()
      }

      return post
    }
    return post
  }

  async getLatestPosts(userId: string, options: CursorPagination): Promise<PostDTO[]> {
    // TODO: filter post search to return posts from authors that the user follows
    return await this.repository.getAllByDatePaginated(userId, options)
  }

  async getPostsByAuthor(userId: any, authorId: string): Promise<PostDTO[]> {
    const author = await this.userService.getUser(authorId)

    if (author.privateProfile) {
      const canViewThisPost = await this.followService.canViewPrivateProfile({
        followedId: authorId,
        followerId: userId
      })

      if (!canViewThisPost) {
        throw new ForbiddenException()
      }

      // If the user can view the author's private profile, return all posts
      const posts = await this.repository.getByAuthorId(authorId)
      return posts
    }

    // If the author's profile is public, return all posts
    const posts = await this.repository.getByAuthorId(authorId)
    return posts
  }
}
