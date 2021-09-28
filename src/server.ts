require("dotenv").config();
import {ApolloServer,gql} from "apollo-server";
import schema, {typeDefs,resolvers} from "./schema";


const server = new ApolloServer({
    schema,
});

const PORT = process.env.POPT;
server
    .listen(PORT)
    .then(() => console.log("Server is running on http://localhost:4000/"));





