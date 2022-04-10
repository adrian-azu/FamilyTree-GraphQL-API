'use strict';

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const graphqlSchema = require('./src/graphql/schema');
const graphqlResolvers = require('./src/graphql/resolvers');
const dotenv = require('dotenv');
const logger = require('morgan');
dotenv.config();

const app = express();
app.use(logger('dev'));
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

const URL = process.env.MONGO_URL 
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const PORT = process.env.PORT || 3000;

mongoose
  .connect(URL, options)
  .then(() => app.listen(PORT, console.log(`This app listening at http://127.0.0.1:${PORT}`)))
  .catch((error) => {
    throw error;
  });
