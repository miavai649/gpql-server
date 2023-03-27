const express = require('express')
const { graphqlHTTP } = require('express-graphql')
require('dotenv').config()
const schema = require('./schema/schema')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o9jnfig.mongodb.net/glqServer?retryWrites=true&w=majority`;

try {
  mongoose.connect(uri)
} catch (error) {
  console.log("🚀 ~ file: index.js:18 ~ error:", error)
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.listen(5000, () => console.log('now listening for request on port 5000'))
