const { ApolloServer } = require("apollo-server");
require("dotenv").config();

// types query / mutation / subscription
const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`;
// resolvers
const resolvers = {
  Query: {
    totalPosts: () => 42,
  },
};
// graphql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
// port
const port = process.env.PORT;
apolloServer.listen(port, function () {
  console.log(`graphql server running on port ${port}`);
});
