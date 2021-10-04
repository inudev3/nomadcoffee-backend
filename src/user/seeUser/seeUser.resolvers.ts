import { Resolvers } from "../../types";
import { protectedResolver } from "../user.utils";

const resolvers: Resolvers = {
  User: {
    followers: async ({ id }, { lastId }, { client, loggedInUser }) =>
      await client.user.findMany({
        where: {
          following: {
            some: { id },
          },
        },
        take: 9,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        select: { username: true },
      }),
    following: async ({ id }, { lastId }, { client, loggedInUser }) =>
      await client.user.findMany({
        where: {
          followers: {
            some: { id },
          },
        },
        take: 9,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
