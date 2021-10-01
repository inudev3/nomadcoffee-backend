import client from "./client";

require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import schema, { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./user/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    };
  },
});

const PORT = process.env.POPT;
server
  .listen(PORT)
  .then(() => console.log("Server is running on http://localhost:4000/"));
