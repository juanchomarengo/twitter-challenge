import { FollowDTO } from '../dto'

export interface FollowService {
  followByUserId: ({ followedId, followerId }: { followedId: string, followerId: string }) => Promise<FollowDTO>
  unfollowByUserId: ({ followedId, followerId }: { followedId: string, followerId: string }) => Promise<FollowDTO>
}
