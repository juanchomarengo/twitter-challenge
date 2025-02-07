import { PrismaClient } from '@prisma/client'
import { FollowRepository } from './follow.repository'
import { FollowDTO } from '../dto'

export class FollowRepositoryImpl implements FollowRepository {
  constructor(private readonly db: PrismaClient) {}
  async upsert({ followedId, followerId }: { followedId: string; followerId: string }): Promise<FollowDTO> {
    const newFollow = await this.db.follow.upsert({
      where: {
        followerId_followedId: {
          followedId,
          followerId
        }
      },
      update: {
        deletedAt: null
      },
      create: {
        followedId,
        followerId
      }
    })

    return new FollowDTO(newFollow)
  }

  async delete({ followedId, followerId }: { followedId: string; followerId: string }): Promise<FollowDTO> {
    const deletedFollow = await this.db.follow.delete({
      where: {
        followerId_followedId: {
          followedId,
          followerId
        }
      }
    })
    return new FollowDTO(deletedFollow)
  }

  async getFollow({ followedId, followerId }: { followedId: string; followerId: string }): Promise<FollowDTO | null> {
    const follow = await this.db.follow.findUnique({
      where: {
        followerId_followedId: {
          followedId,
          followerId
        }
      }
    })

    return follow ? new FollowDTO(follow) : null
  }
}
