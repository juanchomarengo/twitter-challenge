import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from '../dto'
import { PostRepository } from '../repository'
import { PostService } from '.'
import { validate } from 'class-validator'
import { ForbiddenException, NotFoundException } from '@utils'
import { CursorPagination } from '@types'
import { FollowService } from '@domains/follow/service'
import { UserService } from '@domains/user/service'
import { ReactionRepository } from '@domains/reaction/repository'

export class PostServiceImpl implements PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly followService: FollowService,
    private readonly userService: UserService,
    private readonly reactionRepository: ReactionRepository
  ) {}

  async createPost(userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
    await validate(data)
    const post = await this.repository.createPost(userId, data)
    return post
  }

  async createComment(userId: string, parentId: string, data: CreatePostInputDTO): Promise<PostDTO> {
    await validate(data)

    const getParent = await this.repository.getById(parentId)

    if (!getParent) throw new NotFoundException('post')

    const post = await this.repository.createComment(userId, parentId, data)

    await this.reactionRepository.create({
      postId: post.id,
      userId,
      actionType: 'COMMENT'
    })
    await this.repository.incrementQty(parentId, 'qtyComments')

    return post
  }

  async deletePost(userId: string, postId: string): Promise<void> {
    const post = await this.repository.getById(postId)
    if (!post) throw new NotFoundException('post')
    if (post.authorId !== userId) throw new ForbiddenException()
    await this.repository.delete(postId)
  }

  async getPost(userId: string, postId: string): Promise<ExtendedPostDTO> {
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

  async getLatestPosts(userId: string, options: CursorPagination): Promise<ExtendedPostDTO[]> {
    return await this.repository.getAllByDatePaginated(userId, options)
  }

  async getPostsByAuthor(userId: any, authorId: string): Promise<ExtendedPostDTO[]> {
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

  async getCommentsByPostId(userId: string, postId: string): Promise<ExtendedPostDTO[]> {
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

      // If the user can view the author's private profile, return all posts
      const comments = await this.repository.getCommentsByPostId(postId)
      return comments
    }

    // If the author's profile is public, return all posts
    const comments = await this.repository.getCommentsByPostId(postId)
    return comments
  }
}
