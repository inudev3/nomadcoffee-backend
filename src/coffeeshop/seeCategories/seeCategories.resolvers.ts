import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCategories: (_, { shopId, lastId }, { client, loggedInUser }) =>
      client.category.findMany({
        where: { shops: { some: { id: shopId } } },
        take: 9,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
export default resolvers;
