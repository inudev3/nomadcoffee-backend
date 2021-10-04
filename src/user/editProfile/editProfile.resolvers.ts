import {Resolvers} from "../../types";
import client from "../../client";
import bcrypt from "bcrypt";
import {GraphQLUpload} from "graphql-upload";
import {protectedResolver} from "../user.utils";
import * as fs from "fs";

const resolvers: Resolvers = {

  Mutation: {
    editProfile: protectedResolver(
        async (
            _,
            {email, username, password, name, avatar, location},
            {client, loggedInUser}
        ) => {
          let avatarUrl = null;
          if (avatar) {
            const {filename, createReadStream} = await avatar;
            const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
            const readStream = createReadStream();
            const writeStream = fs.createWriteStream(
                process.cwd() + "/uploads/" + newFilename
            );
            readStream.pipe(writeStream);
            avatarUrl = `http://localhost:4000/static/${newFilename}`;
          }
          let uglyPassword = null;
          if (password) {
            uglyPassword = await bcrypt.hash(password, 10);
          }
          const updateUser = await client.user.update({
            where: {id: loggedInUser.id},
            data: {
              email,
              username,
              ...(uglyPassword && {password: uglyPassword}),
              name,
              location,
              ...(avatarUrl && {avatar: avatarUrl}),
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
