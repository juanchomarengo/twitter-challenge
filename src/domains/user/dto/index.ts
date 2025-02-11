export class UserDTO {
  constructor (user: UserDTO) {
    this.id = user.id
    this.name = user.name
    this.createdAt = user.createdAt
    this.privateProfile = user.privateProfile
  }

  id: string
  name: string | null
  createdAt: Date
  privateProfile: boolean
}

export class ExtendedUserDTO extends UserDTO {
  constructor (user: ExtendedUserDTO) {
    super(user)
    this.email = user.email
    this.name = user.name
    this.password = user.password
  }

  email!: string
  username!: string
  password!: string
}
export class UserViewDTO {
  constructor (user: UserViewDTO) {
    this.id = user.id
    this.name = user.name
    this.username = user.username
    this.privateProfile = user.privateProfile
    this.profilePicture = user.profilePicture
  }

  id: string
  name: string | null
  username: string
  privateProfile: boolean
  profilePicture: string | null
}
