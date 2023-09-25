import { Constants, UnauthorizedException, db } from '@utils'
import { Server, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import { ConversationRepositoryImpl } from '@domains/conversation/repository/conversation.repository.impl'
import { isUUID } from '@utils/functions'
import { MessageRepositoryImpl } from './domains/message/repository/message.repository.impl'
import { ConversationDTO } from '@domains/conversation/dto'

const conversationRepo = new ConversationRepositoryImpl(db)
const messageRepo = new MessageRepositoryImpl(db)

interface ExtendedSocket extends Socket {
  userId?: string
}

function socketIo(server: any): any {
  const io = new Server(server, {
    cors: {
      origin: Constants.CORS_WHITELIST,
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

  io.use((socket: ExtendedSocket, next: any) => {
    const bearer = socket.handshake.headers.authorization
    if (bearer) {
      const token = bearer.split(' ')[1]

      jwt.verify(token, Constants.TOKEN_SECRET, (err: any, context: any) => {
        if (err) {
          throw new UnauthorizedException('INVALID_TOKEN')
        }
        socket.userId = context.userId
      })
    } else {
      throw new UnauthorizedException('MISSING_TOKEN')
    }
    next()
  })
  io.on('connection', async function (socket: ExtendedSocket) {
    await socket.join(socket.id)

    const conectedUsers: any[] = []
    const usersAndConversations = await conversationRepo.getConversationsAndPotentialUsers(socket.userId ?? '')
    io.to(socket.id).emit('users', usersAndConversations)

    const conversationsIds = usersAndConversations.conversations.map((conversation: ConversationDTO) => conversation.id)
    await socket.join(conversationsIds)

    socket.on('createConversation', async ({ userTwo }) => {
      if (userTwo && isUUID(userTwo)) {
        const canCreate = await conversationRepo.canCreateConversation(socket.userId ?? '', userTwo)

        if (!canCreate) {
          io.sockets.in(socket.id).emit('error', 'Error creating conversation, You can not create a conversation with this user')
          return
        }

        const newConversation = await conversationRepo.upsert(socket.userId ?? '', userTwo)
        await socket.join(newConversation.id)
        io.sockets.in(socket.id).emit('confirmation', newConversation)
      } else {
        io.sockets.in(socket.id).emit('error', 'Error creating conversation, userTwo is not valid')
      }
    })

    socket.on('sendMessage', async ({ conversationId, message }) => {
      if (!conversationId && isUUID(conversationId)) {
        io.sockets.in(socket.id).emit('error', 'Error sending message, conversationId is empty')
        return
      }

      if (!message) {
        io.sockets.in(socket.id).emit('error', 'Error sending message, message is empty')
      }

      // validate if the conversation exists and if the user is part of the conversation
      const conversation = await conversationRepo.get(socket.userId ?? '', conversationId)

      if (!conversation) {
        io.sockets.in(socket.id).emit('error', 'Error sending message, conversation not found')
      } else {
        const newMessage = await messageRepo.create(conversationId, socket.userId ?? '', message)
        io.sockets.in(conversationId).emit('newMessage', {
          conversationId,
          from: socket.userId,
          message: newMessage.content
        })
      }
    })

    socket.on('disconnect', function () {
      console.log('user disconnected')
      const updatedCnectedUsers = conectedUsers.filter((user) => user !== socket.userId)
      io.sockets.in(socket.id).emit('users', updatedCnectedUsers)
    })
  })
}

export { socketIo }
