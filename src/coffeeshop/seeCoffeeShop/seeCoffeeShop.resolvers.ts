import { Resolvers } from "../../types";

const resolver: Resolvers = {
  Query: {
    seeCoffeeShop: async (_, { id }, { client, loggedInUser }) =>
      client.coffeeShop.findUnique({ where: { id } }),
  },
};
export default resolver;
