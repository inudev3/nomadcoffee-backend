import { Resolvers } from "../../types";
import * as fs from "fs";
import { processCategory, processSlug } from "../coffeeshop.utils";
import { protectedResolver } from "../../user/user.utils";

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
        { client, loggedInUser }
      ) => {
        const exists = await client.coffeeShop.findUnique({ where: { name } });
        if (exists) {
          return {
            ok: false,
            error: "the shop name already exists",
          };
        }
        let photosUrl = [];
        if (photos) {
          for (const photo of photos) {
            const { filename, createReadStream } = await photo;
            const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
            const readStream = createReadStream();
            const writeStream = fs.createWriteStream(
              process.cwd() + "/uploads/" + newFilename
            );
            readStream.pipe(writeStream);
            photosUrl.push({
              url: `http://localhost:4000/static/${newFilename}`,
            });
          }
        }
        let categoryNames = [];
        if (categories) {
          categoryNames = processCategory(categories);
        }
        const newShop = await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: { connect: { id: loggedInUser.id } },
            ...(categoryNames?.length > 0 && {
              categories: {
                connectOrCreate: categoryNames,
              },
            }),
            ...(photosUrl?.length > 0 && {
              photos: {
                create: photosUrl,
              },
            }),
          },
        });
        return {
          ok: true,
          id: newShop.id,
        };
      }
    ),
  },
};
export default resolvers;
