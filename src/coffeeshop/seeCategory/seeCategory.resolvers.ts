import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCategory: (_, { name }, { client, loggedInUser }) =>
      client.coffeeShop.findMany({ where: { categories: { some: { name } } } }),
  },
};
export default resolvers;
