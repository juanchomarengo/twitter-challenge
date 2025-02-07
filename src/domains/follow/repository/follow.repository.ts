import { FollowDTO } from '../dto'

export interface FollowRepository {
  upsert: ({ followedId, followerId }: { followedId: string, followerId: string }) => Promise<FollowDTO>
  delete: ({ followedId, followerId }: { followedId: string, followerId: string }) => Promise<FollowDTO>
  getFollow: ({ followedId, followerId }: { followedId: string, followerId: string }) => Promise<FollowDTO | null>
}
