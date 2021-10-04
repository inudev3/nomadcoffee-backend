require("dotenv").config();
import client from "./client";

import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServer, gql } from "apollo-server-express";
import schema, { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./user/user.utils";
import express from "express";
import logger from "morgan";

const startServer = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client,
      };
    },
  });

  await server.start();
  const app = express();
  app.use(logger("tiny"));
  app.use(graphqlUploadExpress());
  app.use("/static", express.static("uploads"));
  server.applyMiddleware({ app });

  const PORT = process.env.POPT;

  await new Promise(() => app.listen({ port: PORT }));
  console.log(
    `Server is running on http://localhost:4000/${server.graphqlPath}`
  );
};
startServer();
