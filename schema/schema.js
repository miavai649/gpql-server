const graphql = require('graphql')
const _ = require('lodash')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql

var books = [
  { name: 'Name of the Wind', genre: 'Fastasy', id: '1' },
  { name: 'The Final Empire', genre: 'Fastasy', id: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' }
]

var authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const AuthoType = new GraphQLObjectType({
  name: 'Autho',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data form db/other source
        console.log(typeof args.id)
        return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(args)
        return _.find(authors, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
