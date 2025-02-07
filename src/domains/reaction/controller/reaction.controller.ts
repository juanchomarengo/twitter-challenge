import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
import 'express-async-errors'
import { ReactionService, ReactionServiceImpl } from '../service'
import { ReactionRepositoryImpl } from '../repository'
import { BodyValidation, db } from '@utils'
import { PostRepositoryImpl } from '@domains/post/repository'
import { RequestPostsByReactionTypeDTO } from '../dto'
import { FollowServiceImpl } from '@domains/follow/service'
import { FollowRepositoryImpl } from '@domains/follow/repository'

export const reactionRouter = Router()

const service: ReactionService = new ReactionServiceImpl(new ReactionRepositoryImpl(db), new PostRepositoryImpl(db), new FollowServiceImpl(new FollowRepositoryImpl(db)))

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

reactionRouter.post(
  '/get/postByReactionType/:userId?',
  BodyValidation(RequestPostsByReactionTypeDTO),
  async (req: Request, res: Response) => {
    const { type } = req.body
    const { userId } = req.params
    const { userId: userLogged } = res.locals.context

    // If the userId param is not provided, the userId will be the user logged
    const post = await service.getPostsByReactionType(type, userId || userLogged)

    return res.status(HttpStatus.OK).json(post)
  }
)
