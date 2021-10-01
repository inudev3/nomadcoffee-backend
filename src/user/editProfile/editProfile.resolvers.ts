import { Resolvers } from "../../types";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { email, username, password, name, avatarURL, location },
        { client, loggedInUser }
      ) => {
        let uglyPassword = null;
        if (password) {
          uglyPassword = await bcrypt.hash(password, 10);
        }
        const updateUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            email,
            username,
            ...(uglyPassword && { password: uglyPassword }),
            name,
            location,
            avatarURL,
          },
        });
        if (updateUser.id) {
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
export default resolvers;
