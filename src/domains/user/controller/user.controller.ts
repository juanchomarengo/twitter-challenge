import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'

import { db } from '@utils'

import { UserRepositoryImpl } from '../repository'
import { UserService, UserServiceImpl } from '../service'
import { createPresignedUrlWithClient } from '@aws/s3'
import { randomUUID } from 'crypto'

export const userRouter = Router()

// Use dependency injection
const service: UserService = new UserServiceImpl(new UserRepositoryImpl(db))

userRouter.get('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { limit, skip } = req.query as Record<string, string>

  const users = await service.getUserRecommendations(userId, { limit: Number(limit), skip: Number(skip) })

  return res.status(HttpStatus.OK).json(users)
})

userRouter.get('/me', async (req: Request, res: Response) => {
  const { userId } = res.locals.context

  const user = await service.getUser(userId)

  return res.status(HttpStatus.OK).json(user)
})

userRouter.get('/by_username/:username', async (req: Request, res: Response) => {
  const { username } = req.params
  const { limit, skip } = req.query as Record<string, string>

  const users = await service.getUserByUsername(username, { limit: Number(limit), skip: Number(skip) })

  return res.status(HttpStatus.OK).json(users)
})

userRouter.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params

  const user = await service.getUser(userId)

  return res.status(HttpStatus.OK).json(user)
})

userRouter.post('/pre-sign', async (req: Request, res: Response) => {
  const { userId } = res.locals.context

  const id = randomUUID()

  const key = `${userId as string}/${id}`

  // TODO: set the bucket name in the .env
  const pre = await createPresignedUrlWithClient({ bucket: 'challenge-twitter', key })

  return res.status(HttpStatus.OK).json(pre)
})

userRouter.patch('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { privateProfile } = req.body

  const user = await service.partialUpdate(userId, { privateProfile })

  return res.status(HttpStatus.OK).json(user)
})

userRouter.delete('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context

  await service.deleteUser(userId)

  return res.status(HttpStatus.OK).json('User deleted successfully')
})
