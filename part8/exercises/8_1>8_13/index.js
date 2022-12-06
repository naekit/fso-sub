require('dotenv').config()
const { execute, subscribe } = require('graphql')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { ApolloServer } = require('apollo-server-express')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGODB_URI

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

console.log('connecting to', MONGO_URI)

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((error) => {
    console.error('connection to DB failed', error.message);
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    context: async ({req}) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
          const decodedToken = jwt.verify(
              auth.substring(7), JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id).populate('favoriteGenre')
          return { currentUser }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()
  
  server.applyMiddleware({
    app,
    path: '/',
  })


  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
  })

}

start()