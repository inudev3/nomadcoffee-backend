import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowing: async ({ id }, _, { client }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    totalFollowers: async ({ id }, _, { client }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    isFollowing: async ({ id }, _, { client, loggedInUser }) => {
      const user = await client.user.findFirst({
        where: { id, followers: { some: { id: loggedInUser.id } } },
      });
      if (!user) {
        return {};
      }
    },
  },
};
export default resolvers;
