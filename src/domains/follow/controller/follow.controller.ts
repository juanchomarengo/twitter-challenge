import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
import { db } from '@utils'
import { FollowService, FollowServiceImpl } from '../service'
import { FollowRepositoryImpl } from '../repository/follow.repository.impl'

export const followRouter = Router()

const service: FollowService = new FollowServiceImpl(new FollowRepositoryImpl(db))

followRouter.post('/follow/:userId', async (req: Request, res: Response) => {
  const { userId: followerId } = req.params

  const { userId } = res.locals.context

  const user = await service.followByUserId({ followedId: userId, followerId })

  return res.status(HttpStatus.OK).json({
    message: 'Followed',
    data: user
  })
})

followRouter.post('/unfollow/:userId', async (req: Request, res: Response) => {
  const { userId: followerId } = req.params

  const { userId } = res.locals.context

  const user = await service.unfollowByUserId({ followedId: userId, followerId })

  return res.status(HttpStatus.OK).json({
    message: 'Unfollow',
    data: user
  })
})
