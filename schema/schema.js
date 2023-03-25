const graphql = require('graphql')
const _ = require('lodash')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql

var books = [
  { name: 'Name of the Wind', genre: 'Fastasy', id: '1', authorId: '1'},
  { name: 'The Final Empire', genre: 'Fastasy', id: '2', authorId: '3' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '2' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
  { name: 'The Color of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
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
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // console.log("🚀 ~ file: schema.js:33 ~ resolve ~ parent:", parent)
        return _.find(authors, {id: parent.authorId})
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // console.log("🚀 ~ file: schema.js:53 ~ resolve ~ parent:", parent)
        return _.filter(books, {authorId: parent.id})
      }
    }
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
        
        return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // // console.log("🚀 ~ file: schema.js:58 ~ resolve ~ args:", typeof(args.id))
        
        return _.find(authors, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
