const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const path = require("path");

const { ApolloServer } = require("apollo-server-express");
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require("merge-graphql-schemas");

require("dotenv").config();

const app = express();

const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("mongo connected");
  } catch (err) {
    console.log(err);
  }
};

// execute database connection
db();

// typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./typeDefs")));
// resolvers
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);
// graphql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// applyMiddleware method conencts ApolloServer to a sepcifi HTTP framework ie: express
apolloServer.applyMiddleware({
  app,
});

// server
const httpserver = http.createServer(app);

app.get("/rest", function (req, res) {
  res.json({
    data: "you hit the rest endpoint",
  });
});

const port = process.env.PORT;

app.listen(port, function () {
  console.log(
    `graphql server running on port ${port}${apolloServer.graphqlPath}`
  );
});
