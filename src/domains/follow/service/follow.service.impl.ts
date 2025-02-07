import { FollowService } from './follow.service'
import { FollowDTO } from '../dto'
import { FollowRepository } from '../repository'
import { ForbiddenException } from '@utils'

export class FollowServiceImpl implements FollowService {
  constructor (private readonly repository: FollowRepository) {}

  async followByUserId ({ followedId, followerId }: { followedId: string, followerId: string }): Promise<FollowDTO> {
    if (followedId === followerId) {
      // You can't follow yourself
      throw new ForbiddenException()
    }

    // TODO: Check if the user exists

    const result = await this.repository.upsert({ followedId, followerId })
    return result
  }

  async unfollowByUserId ({ followedId, followerId }: { followedId: string, followerId: string }): Promise<FollowDTO> {
    if (followedId === followerId) {
      // You can't follow yourself
      throw new ForbiddenException()
    }

    const follow = await this.repository.getFollow({ followedId, followerId })

    if (!follow) {
      // You can't unfollow someone you don't follow
      throw new Error('You can\'t unfollow someone you don\'t follow')
    }

    const result = await this.repository.delete({ followedId, followerId })
    return result
  }

  async canViewPrivateProfile ({ followedId, followerId }: { followedId: string, followerId: string }): Promise<boolean> {
    if (followedId === followerId) {
      return true
    }

    const result = await this.repository.getFollow({ followedId, followerId })
    return !!result
  }
}
