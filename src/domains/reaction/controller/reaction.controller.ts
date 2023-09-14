import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
import { ReactionService, ReactionServiceImpl } from '../service'
import { ReactionRepositoryImpl } from '../repository'
import { db } from '@utils'
import { PostRepositoryImpl } from '@domains/post/repository'

export const reactionRouter = Router()

const service: ReactionService = new ReactionServiceImpl(new ReactionRepositoryImpl(db), new PostRepositoryImpl(db))

reactionRouter.post('/:postId', async (req: Request, res: Response) => {
  const { postId } = req.params
  const { actionType } = req.body
  const { userId } = res.locals.context

  // TODO: validate the body
  const newReaction = await service.create({ postId, actionType, userId })

  return res.status(HttpStatus.OK).json(newReaction)
})

reactionRouter.delete('/:postId', async (req: Request, res: Response) => {
  const { postId } = req.params
  const { userId } = res.locals.context
  const { actionType } = req.body

  const reaction = await service.delete({ postId, actionType, userId })

  return res.status(HttpStatus.OK).json(reaction)
})
