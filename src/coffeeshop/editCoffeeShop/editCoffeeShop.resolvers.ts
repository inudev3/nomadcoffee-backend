import { Resolvers } from "../../types";
import { protectedResolver } from "../../user/user.utils";
import { processCategory, processSlug } from "../coffeeshop.utils";
import * as process from "process";

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        {
          id,
          name,
          latitude,
          longitude,
          photos: newPhotos,
          categories: newCategories,
        },
        { client, loggedInUser }
      ) => {
        const oldShop = await client.coffeeShop.findFirst({
          where: { id, userId: loggedInUser.id },
          include: { categories: { select: { slug: true } } },
        });
        if (!oldShop) {
          return {
            ok: false,
            error: "Coffeeshop not found.",
          };
        }
        if (name) {
          const exists = await client.coffeeShop.findUnique({
            where: { name },
          });
          if (exists) {
            return {
              ok: false,
              error: "the name of the shop is already taken.",
            };
          }
        }
        await client.coffeeShop.update({
          where: { id },
          data: {
            name,
            longitude,
            latitude,
            ...(newCategories && {
              categories: {
                disconnect: oldShop.categories,
                connectOrCreate: processCategory(newCategories),
              },
            }),
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
export default resolvers;
