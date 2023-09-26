/* eslint-disable quote-props */
export const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sirius twitter challenge',
      termsOfService:
        'https://gitlab.com/siriussystem/training/backend-training/-/tree/main/node/express-prisma-typescript?ref_type=heads',
      contact: {
        email: 'juanmarengo@sirius.com.ar'
      },
      license: {
        name: 'MIT',
        url: 'https://es.wikipedia.org/wiki/Licencia_MIT'
      },
      version: '1.0.0'
    },
    servers: [
      {
        url: '/api'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      {
        name: 'Auth'
      },
      {
        name: 'User'
      },
      {
        name: 'Follower'
      },
      {
        name: 'Post'
      },
      {
        name: 'Reaction'
      }
    ],
    paths: {
      '/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Logs user into the system',
          description: '',
          security: [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RequestLogin'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation'
            },
            '400': {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ValidationError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        }
      },
      '/auth/signup': {
        post: {
          tags: ['Auth'],
          summary: 'Create new user',
          description: '',
          security: [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RequestSignup'
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ResponseSignup'
                  }
                }
              }
            },
            '400': {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ValidationError'
                  }
                }
              }
            },
            '409': {
              description: 'Conflict error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ConflictError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        }
      },
      '/user/': {
        get: {
          tags: ['User'],
          summary: 'Get all users',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ResponseUserGetAll'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        },
        patch: {
          tags: ['User'],
          summary: 'Update current user',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RequestUserPatch'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserDto'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['User'],
          summary: 'Delete current user',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'User deleted successfully'
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '404': {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/NotfoundUserError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        }
      },
      '/user/me': {
        get: {
          tags: ['User'],
          summary: 'Get current user',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserDto'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        }
      },
      '/user/{id}': {
        get: {
          tags: ['User'],
          summary: 'Get user by id',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'id of user to return',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserDto'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '404': {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/NotfoundUserError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        }
      },
      '/follower/follow/{id}': {
        post: {
          tags: ['Follower'],
          summary: 'Follow user by id',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'id of user to follow',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ResponseFollow'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '404': {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/NotfoundUserError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        }
      },
      '/follower/unfollow/{id}': {
        post: {
          tags: ['Follower'],
          summary: 'Unfollow user by id',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'id of user to unfollow',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ResponseFollow'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '404': {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/NotfoundUserError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        }
      },
      '/post/': {
        get: {
          tags: ['Post'],
          summary: 'Get all posts',
          description: 'Get all posts from user that have a public profile or from users that current user follows',
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ResponseGetAllPosts'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Post'],
          summary: 'Create new post',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    content: {
                      type: 'string',
                      example: 'Hello world'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PostDto'
                  }
                }
              }
            },
            '400': {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ValidationError'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        }
      },
      '/post/{id}': {
        get: {
          tags: ['Post'],
          summary: 'Get post by id',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'id of post to return',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PostDto'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '404': {
              description: 'Post not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/NotfoundUserError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Post'],
          summary: 'Create comment to post by id',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'id where comment will be created',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    content: {
                      type: 'string',
                      example: 'Hi Juan, nice post!'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PostDto'
                  }
                }
              }
            },
            '400': {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ValidationError'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '404': {
              description: 'Post not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/NotfoundUserError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Post'],
          summary: 'Delete post by id',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'id of post to delete',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Post deleted successfully'
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '404': {
              description: 'Post not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/NotfoundUserError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        }
      },
      '/post/by_user/{id}': {
        get: {
          tags: ['Post'],
          summary: 'Get all posts from user by id',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'id of user to return posts',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ResponseGetAllPosts'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '404': {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/NotfoundUserError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        }
      },
      '/reaction/{id}': {
        post: {
          tags: ['Reaction'],
          summary: 'React to post by id',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'id of post to react',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RequestReaction'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ResponseReaction'
                  }
                }
              }
            },
            '400': {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ValidationError'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '404': {
              description: 'Post not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/NotfoundUserError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Reaction'],
          summary: 'Delete reaction by id',
          description: '',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'id of reaction to delete',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Reaction deleted successfully'
            },
            '401': {
              description: 'Unauthorized error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UnauthorizedError'
                  }
                }
              }
            },
            '404': {
              description: 'Reaction not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/NotfoundUserError'
                  }
                }
              }
            },
            '500': {
              description: 'Internal error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/InternalError'
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '3bf709f0-3f5a-4782-98a5-73fc0c0f55bb'
            },
            username: {
              type: 'string',
              example: 'juanchomarengo'
            },
            name: {
              type: 'string',
              example: 'Juan'
            },
            email: {
              type: 'string',
              example: 'user99@gmail.com'
            },
            password: {
              type: 'string',
              example: '010203Soccer..'
            },
            privateProfile: {
              type: 'boolean',
              example: false
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2021-08-31T15:00:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2021-08-31T15:00:00.000Z'
            }
          }
        },
        UserDto: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '30a91154-a8e9-4011-81b8-525fa35fcf2a'
            },
            name: {
              type: 'string',
              example: 'juanchomarengo'
            },
            createdAt: {
              type: 'string',
              example: '2023-09-07T16:42:57.420Z'
            },
            privateProfile: {
              type: 'boolean',
              example: false
            }
          }
        },
        FollowDto: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '2c4f6e53-9d8e-42ee-af67-d7fca3dba6ea'
            },
            followerId: {
              type: 'string',
              example: '3bf709f0-3f5a-4782-98a5-73fc0c0f55bb'
            },
            followedId: {
              type: 'string',
              example: '30a91154-a8e9-4011-81b8-525fa35fcf2a'
            }
          }
        },
        PostDto: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '2c4f6e53-9d8e-42ee-af67-d7fca3dba6ea'
            },
            authorId: {
              type: 'string',
              example: '3bf709f0-3f5a-4782-98a5-73fc0c0f55bb'
            },
            content: {
              type: 'string',
              example: 'Hello world'
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
                example: 'https://picsum.photos/200/300'
              }
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2021-08-31T15:00:00.000Z'
            }
          }
        },
        ExtendedPostDto: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '2c4f6e53-9d8e-42ee-af67-d7fca3dba6ea'
            },
            authorId: {
              type: 'string',
              example: '3bf709f0-3f5a-4782-98a5-73fc0c0f55bb'
            },
            content: {
              type: 'string',
              example: 'Hello world'
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
                example: 'https://picsum.photos/200/300'
              }
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-09-13T17:41:30.991Z'
            },
            author: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '9b1a4317-4118-4979-9ffd-7f5f50bba5a8'
                },
                name: {
                  type: 'string',
                  example: 'juanchomarengo'
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2023-09-12T17:41:30.991Z'
                },
                privateProfile: {
                  type: 'boolean',
                  example: false
                }
              }
            }
          }
        },
        ReactionDto: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '2c4f6e53-9d8e-42ee-af67-d7fca3dba6ea'
            },
            userId: {
              type: 'string',
              example: '3bf709f0-3f5a-4782-98a5-73fc0c0f55bb'
            },
            postId: {
              type: 'string',
              example: '30a91154-a8e9-4011-81b8-525fa35fcf2a'
            },
            actionType: {
              type: 'string',
              example: 'LIKE'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-09-13T17:41:30.991Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-09-13T17:41:30.991Z'
            },
            deletedAt: {
              type: 'string',
              example: null
            }
          }
        },
        RequestLogin: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              example: 'juanchomarengo'
            },
            password: {
              type: 'string',
              example: '010203Soccer..'
            }
          }
        },
        ResponseLogin: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMGE5MTE1NC1hOGU5LTQwMTEtODFiOC01MjVmYTM1ZmNmMmEiLCJpYXQiOjE2OTQ1MjA4MzEsImV4cCI6MTY5NDYwNzIzMX0.c2davCPuI24HkE2fPxCsDMrqK4TcryvBg0DkAKKqkF8'
            }
          }
        },
        RequestSignup: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'user99@gmail.com'
            },
            username: {
              type: 'string',
              example: 'juanchomarengo'
            },
            password: {
              type: 'string',
              example: '010203Soccer..'
            }
          }
        },
        ResponseSignup: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMGE5MTE1NC1hOGU5LTQwMTEtODFiOC01MjVmYTM1ZmNmMmEiLCJpYXQiOjE2OTQ1MjA4MzEsImV4cCI6MTY5NDYwNzIzMX0.c2davCPuI24HkE2fPxCsDMrqK4TcryvBg0DkAKKqkF8'
            }
          }
        },
        ResponseUserGetAll: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/UserDto'
          }
        },
        RequestUserPatch: {
          type: 'object',
          properties: {
            privateProfile: {
              type: 'boolean',
              example: true
            }
          }
        },
        ResponseFollow: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Followed'
            },
            data: {
              $ref: '#/components/schemas/FollowDto'
            }
          }
        },
        ResponseUnfollow: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Unfollowed'
            },
            data: {
              $ref: '#/components/schemas/FollowDto'
            }
          }
        },
        ResponseGetAllPosts: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/PostDto'
          }
        },
        RequestReaction: {
          type: 'object',
          properties: {
            actionType: {
              type: 'string',
              example: 'LIKE'
            }
          }
        },
        ResponseReaction: {
          type: 'object',
          properties: {
            schema: {
              $ref: '#/components/schemas/ReactionDto'
            }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Validation Error'
            },
            code: {
              type: 'number',
              example: 400
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  property: {
                    type: 'string',
                    example: 'password'
                  },
                  children: {
                    type: 'array',
                    example: []
                  },
                  constrains: {
                    type: 'object',
                    properties: {
                      isStrongPassword: {
                        type: 'string',
                        example: 'password is not strong enough'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        ConflictError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Conflict'
            },
            code: {
              type: 'number',
              example: 409
            },
            errors: {
              type: 'object',
              properties: {
                errors: {
                  type: 'object',
                  properties: {
                    error_code: {
                      type: 'string',
                      example: 'USER_ALREADY_EXISTS'
                    }
                  }
                }
              }
            }
          }
        },
        InternalError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Unexpected string in JSON at position 1'
            },
            code: {
              type: 'number',
              example: 500
            }
          }
        },
        UnauthorizedError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Unauthorized. You must login to access this content.'
            },
            code: {
              type: 'number',
              example: 401
            },
            error: {
              type: 'object',
              properties: {
                error_code: {
                  type: 'string',
                  example: 'INVALID_TOKEN'
                }
              }
            }
          }
        },
        NotfoundUserError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: "Not found could'nt find user"
            },
            code: {
              type: 'number',
              example: 404
            }
          }
        }
      }
    }
  },
  apis: ['src/server.ts']
}
