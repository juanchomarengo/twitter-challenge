import { UserServiceImpl } from '@domains/user/service'
import { AlwaysEmptyUserRepository } from './dummies/user.repository.dummy'

const service = new UserServiceImpl(new AlwaysEmptyUserRepository())

describe('UserService', () => {
  describe('GetById => ERROR: user not found', () => {
    it('should throw NotFoundException', async () => {
      await expect(service.getUser('NOTAUUID')).rejects.toThrow('user')
    })
  })
  describe('GetById => SUCCESS', () => {
    it('should return a user', async () => {
      const user = await service.getUser('30a91154-a8e9-4011-81b8-525fa35fcf2a')
      expect(user).toBeDefined()
    })
  })
  describe('GetByUsername => ERROR: user not found', () => {
    it('should throw NotFoundException', async () => {
      await expect(service.getUserRecommendations('NOTAUUID', { limit: 10, skip: 0 })).rejects.toThrow('user')
    })
  })
  describe('GetByUsername => SUCCESS', () => {
    it('should return a user', async () => {
      const users = await service.getUserRecommendations('30a91154-a8e9-4011-81b8-525fa35fcf2a', { limit: 10, skip: 0 })
      expect(users).toBeDefined()
    })
  })
  describe('PartialUpdate => ERROR: user not found', () => {
    it('should throw NotFoundException', async () => {
      await expect(service.partialUpdate('NOTAUUID', {})).rejects.toThrow('user')
    })
  })
  describe('PartialUpdate => SUCCESS', () => {
    it('should return a user', async () => {
      const user = await service.partialUpdate('30a91154-a8e9-4011-81b8-525fa35fcf2a', {})
      expect(user).toBeDefined()
    })
  })
  describe('Delete => ERROR: user not found', () => {
    it('should throw NotFoundException', async () => {
      await expect(service.deleteUser('NOTAUUID')).rejects.toThrow('user')
    })
  })
  describe('Delete => SUCCESS', () => {
    it('should return a user', async () => {
      await expect(service.deleteUser('30a91154-a8e9-4011-81b8-525fa35fcf2a')).resolves.toBeUndefined()
    })
  })
  describe('GetByUsername => SUCCESS', () => {
    it('should return a user', async () => {
      const users = await service.getUserByUsername('username', { limit: 10, skip: 0 })
      expect(users).toBeDefined()
    })
  })
})
