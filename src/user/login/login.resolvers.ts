import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return {
          ok: false,
          error: "incorrect password.",
        };
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
export default resolvers;