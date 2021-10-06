import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: (_, { keyword, lastId }, { client, loggedInUser }) => {
      return client.coffeeShop.findMany({
        where: {
          name: {
            startsWith: keyword,
            mode: "insensitive",
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
    },
  },
};
export default resolvers;
