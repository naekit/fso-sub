require('dotenv').config()
const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Person = require('./models/person')
const User = require('./models/user')

const MONGO_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log(MONGO_URI)

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log( `error connection to mongoDB:`, error.message)
    })

const typeDefs = gql`
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type User {
        username: String!
        friends: [Person!]!
        id: ID!
    }

    type Token {
        value: String!
    }

    enum YesNo {
        YES
        NO
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person!]!
        findPerson(name: String!): Person
        me: User
    }

    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
        editNumber(
            name: String!
            phone: String!
        ): Person
        createUser(
            username: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
        addAsFriend(
            name: String!
        ): User
    }
`

const resolvers = {
    Query: {
        personCount: async () => Person.collection.countDocuments(),
        allPersons: async (root, args) => {
            if (!args.phone){
                return Person.find({})
            }
            return Person.find({ phone: { $exists: args.phone === 'YES' }})
            // if(!args.phone){
            //     return persons
            // }
            // const byPhone = (person) => 
            //     args.phone === 'YES' ? person.phone : !person.phone
            // return persons.filter(byPhone)
        },
        findPerson: async (root, args) => Person.findOne({ name: args.name }),
            // persons.find(p => p.name === args.name),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    },
    Mutation: {
        addPerson: async (root, args, context) => {
            const person = new Person({...args})
            const currentUser = context.currentUser
            if(!currentUser){
                throw new AuthenticationError("not authenticated")
            }
            try {
                await person.save()
                currentUser.friends = currentUser.friends.concat(person)
                await currentUser.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return person
            // if(persons.find(p => p.name === args.name)){
            //     throw new UserInputError(`Name must be unique`, {
            //         invalidArgs: args.name
            //     })
            // }

            // const person = { ...args, id: uuid() }
            // persons = persons.concat(person)
            // return person
        }, addAsFriend: async(root, args, { currentUser }) => {
            const isFriend = (person) => 
                currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())
            if(!currentUser){
                throw new AuthenticationError("not authenticated")
            }

            const person = await Person.findOne({ name: args.name })
            if( !isFriend(person) ) {
                currentUser.friends = currentUser.friends.concat(person)
            }

            await currentUser.save()

            return currentUser
        },
        editNumber: async (root, args) => {
            const person = await Person.findOne({ name: args.name })
            person.phone = args.phone
            try {
                person.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return person
            // const person = persons.find(p => p.name === args.name)
            // if(!person){
            //     return null
            // }

            // const updatedPerson = { ...person, phone: args.phone}
            // persons = persons.map(p => p.name === args.name ? updatedPerson: p)
            // return updatedPerson
        },
        createUser: async(root, args) => {
            const user = new User({ username: args.username })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                })
        },
        login: async(root,args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret'){
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }
            
            return { value: jwt.sign(userForToken, JWT_SECRET)}
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')){
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id).populate('friends')
            return { currentUser }
        }
    }
})

server.listen().then(({url}) => {
    console.log(`server ready at ${url}`)
})
