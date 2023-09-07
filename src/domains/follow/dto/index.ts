import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class FollowInputDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(240)
    userId!: string
}

export class FollowDTO {
  constructor (post: FollowDTO) {
    this.id = post.id
    this.followerId = post.followerId
    this.followedId = post.followedId
  }

  id: string
  followerId: string
  followedId: string
}
