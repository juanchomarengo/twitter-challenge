import { ExtendedPostDTO, PostDTO } from '@domains/post/dto'
import { PostInteractionType } from '@prisma/client'
import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsEnum, IsNotEmpty } from 'class-validator'

export class RequestPostsByReactionTypeDTO {
  @IsArray()
  @IsNotEmpty()
  @IsEnum(PostInteractionType, { each: true })
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
    type: PostInteractionType[]

  constructor(type: PostInteractionType[]) {
    this.type = type
  }
}

export class ReactionDTO {
  constructor(reaction: ReactionDTO) {
    this.id = reaction.id
    this.userId = reaction.userId
    this.postId = reaction.postId
    this.actionType = reaction.actionType
  }

  id: string
  userId: string
  postId: string
  actionType: string
}

export class ExtendedReactionDto extends ReactionDTO {
  constructor(reaction: ExtendedReactionDto) {
    super(reaction)
    this.post = reaction.post
  }

  post: PostDTO
}
