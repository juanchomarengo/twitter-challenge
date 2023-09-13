/* eslint-disable  */
import { FollowRepository } from '../../domains/follow/repository/follow.repository'

export class FollowRepositoryDummy implements FollowRepository {
  async upsert({ followedId, followerId }: { followedId: string; followerId: string }): Promise<any> {
    return {
      followedId,
      followerId
    }
  }

  async delete({ followedId, followerId }: { followedId: string; followerId: string }): Promise<any> {
    return {
      followedId,
      followerId
    }
  }

  async getFollow({ followedId, followerId }: { followedId: string; followerId: string }): Promise<any> {
    return 'asdafssas'
  }
}
