import { FollowService, FollowServiceImpl } from '../../domains/follow/service'
import { describe, expect, test } from '@jest/globals'
import { FollowRepositoryDummy } from './follow.respository.dummy'

const service: FollowService = new FollowServiceImpl(new FollowRepositoryDummy())

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', async () => {
    const followerId = '1'
    const followedId = '2'
    const follow = await service.canViewPrivateProfile({
      followerId,
      followedId
    })

    expect(follow).toBe('asd')
  })
})
