import { FollowService } from './follow.service'
import { FollowDTO } from '../dto'
import { FollowRepository } from '../repository'

export class FollowServiceImpl implements FollowService {
  constructor (private readonly repository: FollowRepository) {}

  async followByUserId ({ followedId, followerId }: { followedId: string, followerId: string }): Promise<FollowDTO> {
    // TODO: change this error, isnot a internal server error
    if (followedId === followerId) {
      throw new Error('You cannot follow yourself')
    }

    // TODO: Check if the user exists

    const result = await this.repository.upsert({ followedId, followerId })
    return result
  }

  async unfollowByUserId ({ followedId, followerId }: { followedId: string, followerId: string }): Promise<FollowDTO> {
    // TODO: change this error, isnot a internal server error
    if (followedId === followerId) {
      throw new Error('You cannot follow yourself')
    }

    const follow = await this.repository.getFollow({ followedId, followerId })

    // TODO: change this error, isnot a internal server error
    if (!follow) {
      throw new Error('You are not following this user')
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
