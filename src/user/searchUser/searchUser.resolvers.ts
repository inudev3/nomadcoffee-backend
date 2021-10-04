import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUser: async (_, { keyword, lastId }, { client, loggedInUser }) => {
      return await client.user.findMany({
        where: {
          username: {
            startsWith: keyword,
            mode: "insensitive",
          },
        },
        take: 9,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
    },
  },
};

export default resolvers;
