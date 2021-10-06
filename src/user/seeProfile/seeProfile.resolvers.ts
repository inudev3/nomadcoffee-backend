import { Resolvers } from "../../types";
import { protectedResolver } from "../user.utils";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }, { client, loggedInUser }) => {
      try {
        const user = await client.user.findUnique({ where: { username } });
        if (!user) {
          throw new Error("There is no such user.");
        }
        return user;
      } catch (error) {
        return error;
      }
    },
  },
};
export default resolvers;