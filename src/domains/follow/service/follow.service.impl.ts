import { FollowService } from './follow.service'
import { FollowDTO } from '../dto'
import { FollowRepository } from '../repository'

export class FollowServiceImpl implements FollowService {
  constructor (private readonly repository: FollowRepository) {}

  async followByUserId ({ followedId, followerId }: { followedId: string, followerId: string }): Promise<FollowDTO> {
    if (followedId === followerId) {
      throw new Error('You cannot follow yourself')
    }

    const result = await this.repository.upsert({ followedId, followerId })
    return result
  }

  async unfollowByUserId ({ followedId, followerId }: { followedId: string, followerId: string }): Promise<FollowDTO> {
    if (followedId === followerId) {
      throw new Error('You cannot follow yourself')
    }

    const result = await this.repository.delete({ followedId, followerId })
    return result
  }
}
