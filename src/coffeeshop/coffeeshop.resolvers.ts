import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Category: {
    totalShops: ({ id }, { lastId }, { client, loggedInUser }) =>
      client.coffeeShop.count({ where: { categories: { some: { id } } } }),
  },
};
export default resolvers;
