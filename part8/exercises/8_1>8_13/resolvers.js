require('dotenv').config()
const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = process.env.JWT_SECRET

const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
          let booksQ = await Book.find({}).populate('author')
          if(args.author){
              const booksBy = booksQ.filter(b => b.author === args.author)
              args.genre 
                  ? booksQ = booksBy.filter(b => b.genres.includes(args.genre))
                  : booksQ = booksBy
          } else if (args.genre){
              const booksIn = booksQ.filter(b => b.genres.includes(args.genre))
              booksQ = booksIn
          }
          return booksQ
      },
      allAuthors: async () => {
          return await Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Mutation: {
      addBook: async (root, args, {currentUser}) => {
          if(!currentUser){
            throw new AuthenticationError("not authenticated")
          }

          try {
            const testAuthor = await Author.find({ name: args.author })
            if(!testAuthor[0]){
              const author = new Author({ name: args.author, bookCount: 1 })
              const book = new Book({...args, author: author.id})

              await author.save()
              await book.save()
            } else {
              console.log(testAuthor)
              testAuthor[0].bookCount += 1
              await testAuthor[0].save()
              const book = new Book({...args, author: testAuthor[0]._id})
              await book.save()
            }
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }

          const book = await Book.find({title: args.title}).populate('author').exec()
          console.log(book[0])

          pubsub.publish('BOOK_ADDED', { bookAdded: book[0]} )
          
          return book[0]
          // const author = authors.find(a => a.name === args.author)
          // if(!author){
          //     authors = authors.concat({
          //         name: args.author,
          //         born: null,
          //         id: uuid()
          //     })
          // }
          // const newBook = {...args, id: uuid()}
          // books = books.concat(newBook)
          // return newBook
      },
      editAuthor: async (root, args, {currentUser}) => {
          if(!currentUser){
            throw new AuthenticationError("not authenticated")
          }
          const author = await Author.findOne({ name: args.name})
          author.born = args.born
          try {
            author.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          return author
          // const author = authors.find(a => a.name === args.name)
          // if(!author){
          //     return null
          // } else {
          //     const authorNew = {
          //         ...author,
          //         born: args.born
          //     }
          //     authors = authors.map(a => a.id !== authorNew.id ? a: authorNew)
          //     return authorNew
          // }
      },
      createUser: async (root ,args) => {
          const user = new User({ ...args})
  
          return user.save()
            .catch((error) => {
              throw new UserInputError(error.message, {
                invalidArgs: args
            })
          })
      },
      login: async(root, args) => {
          const user = await User.findOne({ username: args.username})
          if (!user || args.password !== 'secret'){
                    throw new UserInputError('wrong credentials')
          }
          
          const userForToken = {
              username: user.username,
              id: user._id,
          }
  
          return { value: jwt.sign(userForToken, JWT_SECRET)}
      }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers