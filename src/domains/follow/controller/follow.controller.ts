import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
import 'express-async-errors'
import { db } from '@utils'
import { FollowService, FollowServiceImpl } from '../service'
import { FollowRepositoryImpl } from '../repository/follow.repository.impl'

export const followRouter = Router()

const service: FollowService = new FollowServiceImpl(new FollowRepositoryImpl(db))

followRouter.post('/follow/:userId', async (req: Request, res: Response) => {
  const { userId: followedId } = req.params

  const { userId } = res.locals.context

  const user = await service.followByUserId({ followedId, followerId: userId })

  return res.status(HttpStatus.OK).json({
    message: 'Followed',
    data: user
  })
})

followRouter.post('/unfollow/:userId', async (req: Request, res: Response) => {
  const { userId: userToUnfollow } = req.params

  const { userId } = res.locals.context

  const user = await service.unfollowByUserId({ followerId: userId, followedId: userToUnfollow })

  return res.status(HttpStatus.OK).json({
    message: 'Unfollow',
    data: user
  })
})
